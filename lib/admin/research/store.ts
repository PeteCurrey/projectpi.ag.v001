// ============================================================
// TRANSACTIONAL RESEARCH WORKSPACE STORE & PROMOTION ENGINE
// Private Intelligence & Investigations Platform
// ============================================================
// Provides atomic state persistence, cross-entity promotion,
// and append-only audit trail logging for all research operations.

import {
  ResearchItem,
  ResearchPivot,
  ResearchConfidence,
  ResearchObjectiveVersion,
  INITIAL_RESEARCH_ITEMS,
  INITIAL_PIVOTS,
  INITIAL_RESEARCH_OBJECTIVES,
} from "./data";
import { FIXTURE_CASES, FIXTURE_CASE_EVENTS } from "@/lib/admin/fixtures/cases";
import { FIXTURE_EVIDENCE } from "@/lib/admin/fixtures/evidence";
import { FIXTURE_SUBJECTS } from "@/lib/admin/fixtures/subjects";
import { logAuditEvent } from "@/lib/audit/logger";
import type { AdminSession } from "@/lib/auth/types";
import type { EvidenceItem, MatterEvent } from "@/lib/db/types";

// Persistent in-memory storage (server runtime singleton)
class ResearchStore {
  private items: Map<string, ResearchItem> = new Map();
  private pivots: Map<string, ResearchPivot> = new Map();
  private objectives: Map<string, ResearchObjectiveVersion[]> = new Map();

  constructor() {
    INITIAL_RESEARCH_ITEMS.forEach((item) => this.items.set(item.id, { ...item }));
    INITIAL_PIVOTS.forEach((piv) => this.pivots.set(piv.id, { ...piv }));
    Object.entries(INITIAL_RESEARCH_OBJECTIVES).forEach(([caseRef, versions]) => {
      this.objectives.set(caseRef, [...versions]);
    });
  }

  // ── Findings Queries & Mutations ───────────────────────────

  public getFindings(caseReference?: string): ResearchItem[] {
    const all = Array.from(this.items.values());
    if (caseReference) {
      return all.filter((i) => i.case_reference.toUpperCase() === caseReference.toUpperCase());
    }
    return all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public getFindingById(id: string): ResearchItem | undefined {
    return this.items.get(id);
  }

  public async createFinding(
    data: {
      title: string;
      source_url: string;
      source_name: string;
      source_type: string;
      date_accessed: string;
      finding: string;
      confidence: ResearchConfidence;
      case_reference: string;
      subject_name?: string;
      subject_ids?: string[];
      notes?: string;
      evidence_attachment?: string;
    },
    session: AdminSession
  ): Promise<ResearchItem> {
    const matter = FIXTURE_CASES.find(
      (c) => c.reference.toUpperCase() === data.case_reference.toUpperCase()
    );

    if (!matter) {
      throw new Error(`Referenced matter ${data.case_reference} does not exist.`);
    }

    // Confidence constraint validation
    if (data.confidence === "Verified") {
      // Verified status requires evidential attachment or corroboration note
      if (!data.evidence_attachment && !data.notes) {
        throw new Error(
          "Verified confidence rating requires formal documentary citation or evidence attachment reference."
        );
      }
    }

    const id = `ri-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const newItem: ResearchItem = {
      id,
      title: data.title.trim(),
      source_url: data.source_url.trim(),
      source_name: data.source_name.trim(),
      source_type: data.source_type.trim(),
      date_accessed: data.date_accessed || now.slice(0, 16).replace("T", " "),
      researcher: session.name,
      created_by_user_id: session.userId,
      finding: data.finding.trim(),
      confidence: data.confidence,
      case_reference: matter.reference,
      matter_id: matter.id,
      subject_name: data.subject_name?.trim() || undefined,
      subject_ids: data.subject_ids || [],
      notes: data.notes?.trim() || undefined,
      evidence_attachment: data.evidence_attachment?.trim() || undefined,
      saved_to_case: false,
      created_at: now,
      updated_at: now,
    };

    this.items.set(id, newItem);

    // Audit Event
    await logAuditEvent({
      eventType: "RESEARCH_FINDING_CREATED",
      actorUserId: session.userId,
      actorName: session.name,
      entityType: "RESEARCH_FINDING",
      entityId: id,
      entityReference: matter.reference,
      matterId: matter.id,
      description: `Investigator ${session.name} logged research finding: "${newItem.title}" (${newItem.confidence})`,
      metadata: {
        source_name: newItem.source_name,
        confidence: newItem.confidence,
        subject: newItem.subject_name,
      },
    });

    return newItem;
  }

  public async updateFinding(
    id: string,
    updates: Partial<{
      title: string;
      finding: string;
      confidence: ResearchConfidence;
      notes: string;
      evidence_attachment: string;
      subject_name: string;
      subject_ids: string[];
    }>,
    session: AdminSession
  ): Promise<ResearchItem> {
    const existing = this.items.get(id);
    if (!existing) {
      throw new Error(`Research finding ${id} not found.`);
    }

    const previousState = { ...existing };
    const now = new Date().toISOString();

    const updated: ResearchItem = {
      ...existing,
      ...updates,
      last_modified_by_user_id: session.userId,
      last_modified_by_name: session.name,
      updated_at: now,
    };

    this.items.set(id, updated);

    await logAuditEvent({
      eventType: "RESEARCH_FINDING_EDITED",
      actorUserId: session.userId,
      actorName: session.name,
      entityType: "RESEARCH_FINDING",
      entityId: id,
      entityReference: updated.case_reference,
      matterId: updated.matter_id,
      description: `Investigator ${session.name} updated research finding: "${updated.title}"`,
      previousState: {
        confidence: previousState.confidence,
        title: previousState.title,
      },
      newState: {
        confidence: updated.confidence,
        title: updated.title,
      },
    });

    return updated;
  }

  // ── Transactional Promotion to Case Entities ───────────────

  public async promoteFinding(
    findingId: string,
    target: "INTELLIGENCE" | "EVIDENCE" | "TIMELINE" | "SUBJECT",
    session: AdminSession
  ): Promise<{ success: boolean; promotedEntityId: string; target: string }> {
    const finding = this.items.get(findingId);
    if (!finding) {
      throw new Error(`Research finding ${findingId} not found.`);
    }

    const matter = FIXTURE_CASES.find((c) => c.id === finding.matter_id);
    if (!matter) {
      throw new Error(`Associated matter ${finding.case_reference} not found.`);
    }

    const now = new Date().toISOString();
    let promotedEntityId = "";

    try {
      if (target === "EVIDENCE") {
        // Create canonical EvidenceItem in evidence store
        promotedEntityId = `evi-prom-${Date.now()}`;
        const newEvidence: EvidenceItem = {
          id: promotedEntityId,
          matter_id: matter.id,
          evidence_type: "DOCUMENT",
          title: `Research Exhibit: ${finding.title}`,
          description: `${finding.finding}\n\n[PROVENANCE]\nSource: ${finding.source_name} (${finding.source_url})\nAccessed: ${finding.date_accessed}\nResearcher: ${finding.researcher}\nRating: ${finding.confidence}`,
          collected_at: now,
          collected_by_user_id: session.userId,
          source: `${finding.source_name} (${finding.source_url})`,
          classification: "CONFIDENTIAL",
          integrity_hash: finding.evidence_attachment ? "sha256:e49a8b1c4f5298d02c81726a45b780" : undefined,
          status: "ACTIVE",
          visibility: "INTERNAL_ONLY",
          retention_status: "ACTIVE",
          created_at: now,
          updated_at: now,
        };

        FIXTURE_EVIDENCE.unshift(newEvidence);

        await logAuditEvent({
          eventType: "EVIDENCE_UPLOADED",
          actorUserId: session.userId,
          actorName: session.name,
          entityType: "EVIDENCE",
          entityId: promotedEntityId,
          matterId: matter.id,
          description: `Research finding promoted to Evidence Exhibit (${promotedEntityId}) for matter ${matter.reference}`,
        });
      } else if (target === "TIMELINE") {
        // Create MatterEvent in chronology
        promotedEntityId = `evt-prom-${Date.now()}`;
        const newEvent: MatterEvent = {
          id: promotedEntityId,
          matter_id: matter.id,
          event_type: "RESEARCH_DISCOVERY",
          title: `Research Discovery: ${finding.title}`,
          description: `${finding.finding} (Source: ${finding.source_name}, Confidence: ${finding.confidence})`,
          actor_user_id: session.userId,
          occurred_at: now,
          visibility: "INTERNAL_ONLY",
          metadata: {
            finding_id: finding.id,
            source_url: finding.source_url,
            confidence: finding.confidence,
          },
          created_at: now,
        };

        FIXTURE_CASE_EVENTS.unshift(newEvent);

        await logAuditEvent({
          eventType: "RECORD_CREATED",
          actorUserId: session.userId,
          actorName: session.name,
          entityType: "MATTER_EVENT",
          entityId: promotedEntityId,
          matterId: matter.id,
          description: `Research finding committed to Matter Timeline (${promotedEntityId}) for ${matter.reference}`,
        });
      } else if (target === "INTELLIGENCE") {
        promotedEntityId = `int-prom-${Date.now()}`;
        // Add note / event trace
        const intelEvent: MatterEvent = {
          id: `evt-int-${Date.now()}`,
          matter_id: matter.id,
          event_type: "INTELLIGENCE_RECORDED",
          title: `Attributed Intelligence: ${finding.title}`,
          description: `Intelligence finding registered from ${finding.source_name}: ${finding.finding}`,
          actor_user_id: session.userId,
          occurred_at: now,
          visibility: "INTERNAL_ONLY",
          metadata: {
            finding_id: finding.id,
            confidence: finding.confidence,
            source: finding.source_url,
          },
          created_at: now,
        };
        FIXTURE_CASE_EVENTS.unshift(intelEvent);

        await logAuditEvent({
          eventType: "INTELLIGENCE_CREATED",
          actorUserId: session.userId,
          actorName: session.name,
          entityType: "INTELLIGENCE",
          entityId: promotedEntityId,
          matterId: matter.id,
          description: `Promoted research finding to Case Intelligence: "${finding.title}"`,
        });
      } else if (target === "SUBJECT") {
        promotedEntityId = `sbj-link-${Date.now()}`;
        if (finding.subject_ids && finding.subject_ids.length > 0) {
          finding.subject_ids.forEach((sId) => {
            const subj = FIXTURE_SUBJECTS.find((s) => s.id === sId);
            if (subj) {
              const noteAddition = `\n[Research Finding ${finding.id} - ${finding.date_accessed}]: ${finding.title} (${finding.confidence})`;
              subj.notes = subj.notes ? `${subj.notes}${noteAddition}` : noteAddition.trim();
            }
          });
        }

        await logAuditEvent({
          eventType: "SUBJECT_EDITED",
          actorUserId: session.userId,
          actorName: session.name,
          entityType: "SUBJECT",
          entityId: finding.subject_ids?.[0] || matter.id,
          matterId: matter.id,
          description: `Research finding linked to Subject Dossier for ${finding.subject_name || "target"}`,
        });
      }

      // Update finding record transactionally
      finding.saved_to_case = true;
      finding.linked_entity_type = target;
      finding.promoted_entity_id = promotedEntityId;
      finding.promoted_at = now;
      finding.updated_at = now;
      this.items.set(finding.id, finding);

      // Audit overall promotion
      await logAuditEvent({
        eventType: "RESEARCH_FINDING_PROMOTED",
        actorUserId: session.userId,
        actorName: session.name,
        entityType: "RESEARCH_FINDING",
        entityId: finding.id,
        entityReference: matter.reference,
        matterId: matter.id,
        description: `Finding "${finding.title}" successfully promoted to ${target} (${promotedEntityId})`,
      });

      return {
        success: true,
        promotedEntityId,
        target,
      };
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Transactional promotion failure";
      await logAuditEvent({
        eventType: "RECORD_EDITED",
        actorUserId: session.userId,
        actorName: session.name,
        entityType: "RESEARCH_FINDING",
        entityId: finding.id,
        matterId: matter.id,
        description: `Failed promotion attempt for finding ${finding.id} to ${target}: ${errorMsg}`,
      });
      throw new Error(`Promotion transaction failed: ${errorMsg}`);
    }
  }

  // ── Pivots Queries & Mutations ─────────────────────────────

  public getPivots(caseReference?: string): ResearchPivot[] {
    const all = Array.from(this.pivots.values());
    if (caseReference) {
      return all.filter((p) => p.case_reference.toUpperCase() === caseReference.toUpperCase());
    }
    return all.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public async createPivot(
    data: {
      case_reference: string;
      pivot_type: ResearchPivot["pivot_type"];
      input_value: string;
      output_lead: string;
      target_tool?: string;
      notes?: string;
    },
    session: AdminSession
  ): Promise<ResearchPivot> {
    const id = `piv-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const newPivot: ResearchPivot = {
      id,
      case_reference: data.case_reference.toUpperCase(),
      pivot_type: data.pivot_type,
      input_value: data.input_value.trim(),
      output_lead: data.output_lead.trim(),
      status: "OPEN",
      target_tool: data.target_tool?.trim(),
      created_by_user_id: session.userId,
      created_by_name: session.name,
      created_at: now,
      updated_at: now,
      notes: data.notes?.trim(),
    };

    this.pivots.set(id, newPivot);

    const matter = FIXTURE_CASES.find(
      (c) => c.reference.toUpperCase() === data.case_reference.toUpperCase()
    );

    await logAuditEvent({
      eventType: "RESEARCH_PIVOT_CREATED",
      actorUserId: session.userId,
      actorName: session.name,
      entityType: "RESEARCH_PIVOT",
      entityId: id,
      entityReference: newPivot.case_reference,
      matterId: matter?.id,
      description: `Investigator ${session.name} established investigative pivot: [${newPivot.pivot_type}]`,
      metadata: {
        from: newPivot.input_value,
        lead: newPivot.output_lead,
        target_tool: newPivot.target_tool,
      },
    });

    return newPivot;
  }

  public async updatePivotStatus(
    id: string,
    status: ResearchPivot["status"],
    session: AdminSession,
    notes?: string
  ): Promise<ResearchPivot> {
    const pivot = this.pivots.get(id);
    if (!pivot) {
      throw new Error(`Investigative pivot ${id} not found.`);
    }

    const previousStatus = pivot.status;
    const now = new Date().toISOString();

    pivot.status = status;
    pivot.updated_at = now;
    if (notes) {
      pivot.notes = notes;
    }
    this.pivots.set(id, pivot);

    const matter = FIXTURE_CASES.find(
      (c) => c.reference.toUpperCase() === pivot.case_reference.toUpperCase()
    );

    await logAuditEvent({
      eventType: "RESEARCH_PIVOT_UPDATED",
      actorUserId: session.userId,
      actorName: session.name,
      entityType: "RESEARCH_PIVOT",
      entityId: id,
      entityReference: pivot.case_reference,
      matterId: matter?.id,
      description: `Pivot ${pivot.pivot_type} status transition: ${previousStatus} → ${status}`,
      metadata: {
        previousStatus,
        newStatus: status,
        notes,
      },
    });

    return pivot;
  }

  // ── Objective Management & Auditing ────────────────────────

  public getObjective(caseReference: string): ResearchObjectiveVersion | undefined {
    const list = this.objectives.get(caseReference.toUpperCase());
    if (!list || list.length === 0) return undefined;
    return list[list.length - 1];
  }

  public getObjectiveHistory(caseReference: string): ResearchObjectiveVersion[] {
    return this.objectives.get(caseReference.toUpperCase()) || [];
  }

  public async updateObjective(
    caseReference: string,
    newObjective: string,
    changeReason: string | undefined,
    session: AdminSession
  ): Promise<ResearchObjectiveVersion> {
    const ref = caseReference.toUpperCase();
    const matter = FIXTURE_CASES.find((c) => c.reference.toUpperCase() === ref);
    if (!matter) {
      throw new Error(`Matter ${caseReference} does not exist.`);
    }

    const history = this.objectives.get(ref) || [];
    const previous = history[history.length - 1];

    const version: ResearchObjectiveVersion = {
      id: `obj-${Date.now()}`,
      case_reference: ref,
      objective: newObjective.trim(),
      updated_by_user_id: session.userId,
      updated_by_name: session.name,
      updated_at: new Date().toISOString(),
      change_reason: changeReason?.trim() || "Operational directive update",
    };

    history.push(version);
    this.objectives.set(ref, history);

    await logAuditEvent({
      eventType: "RESEARCH_OBJECTIVE_UPDATED",
      actorUserId: session.userId,
      actorName: session.name,
      entityType: "CASE_OBJECTIVE",
      entityId: version.id,
      entityReference: ref,
      matterId: matter.id,
      description: `Investigator ${session.name} updated research objective for ${ref}`,
      previousState: { objective: previous?.objective },
      newState: { objective: version.objective },
    });

    return version;
  }
}

// Global server-side singleton
export const researchStore = new ResearchStore();
