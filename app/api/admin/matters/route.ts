import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { PERMISSIONS } from "@/lib/rbac/permissions";
import { FIXTURE_CASES, FIXTURE_CASE_EVENTS } from "@/lib/admin/fixtures/cases";
import { logAuditEvent } from "@/lib/audit/logger";
import type { Matter, MatterType, MatterPriority, MatterStatus } from "@/lib/db/types";

/**
 * Server-side immutable Matter Reference generator.
 * Format: MAT-YYMM-XXX (e.g., MAT-2501-008)
 */
function generateMatterReference(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `MAT-${yy}${mm}-`;

  // Find all existing references with matching or standard format
  const currentCount = FIXTURE_CASES.length + 1;
  const seq = String(currentCount).padStart(3, "0");
  const candidate = `${prefix}${seq}`;

  // Ensure collision-free
  if (FIXTURE_CASES.some((c) => c.reference.toLowerCase() === candidate.toLowerCase())) {
    return `${prefix}${String(currentCount + 10).padStart(3, "0")}`;
  }
  return candidate;
}

export const GET = withAdminAuth(
  { permissions: [PERMISSIONS.CASES_VIEW] },
  async (_req, _session) => {
    return NextResponse.json({
      data: FIXTURE_CASES,
      total: FIXTURE_CASES.length,
    });
  }
);

export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.CASES_CREATE] },
  async (req, session) => {
    try {
      const body = await req.json();

      if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", message: "Matter title is required." },
          { status: 400 }
        );
      }

      if (!body.client_organisation_id || typeof body.client_organisation_id !== "string") {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", message: "Client organisation is required." },
          { status: 400 }
        );
      }

      if (!body.matter_type || typeof body.matter_type !== "string") {
        return NextResponse.json(
          { error: "VALIDATION_ERROR", message: "Matter type is required." },
          { status: 400 }
        );
      }

      const reference = generateMatterReference();
      const nowIso = new Date().toISOString();
      const matterId = `mat-${String(FIXTURE_CASES.length + 1).padStart(3, "0")}`;

      const newMatter: Matter = {
        id: matterId,
        reference,
        client_organisation_id: body.client_organisation_id.trim(),
        title: body.title.trim(),
        matter_type: body.matter_type as MatterType,
        description: body.description?.trim() || undefined,
        investigation_objective: body.investigation_objective?.trim() || undefined,
        instructions: body.instructions?.trim() || undefined,
        legal_context: body.legal_context?.trim() || undefined,
        status: (body.status as MatterStatus) || "OPEN",
        priority: (body.priority as MatterPriority) || "NORMAL",
        confidentiality: body.confidentiality || "STANDARD",
        opened_at: nowIso,
        target_date: body.target_date || undefined,
        lead_investigator_id: body.lead_investigator_id || undefined,
        case_manager_id: body.case_manager_id || session.userId,
        created_from_enquiry_id: body.created_from_enquiry_id || undefined,
        created_by_user_id: session.userId,
        estimated_value: body.estimated_value ? Number(body.estimated_value) : undefined,
        quoted_value: body.quoted_value ? Number(body.quoted_value) : undefined,
        retention_status: "ACTIVE",
        created_at: nowIso,
        updated_at: nowIso,
      };

      // Atomic persistence into mutable fixtures
      FIXTURE_CASES.unshift(newMatter);

      // Record inaugural Matter Event
      FIXTURE_CASE_EVENTS.unshift({
        id: `evt-${Date.now()}`,
        matter_id: newMatter.id,
        event_type: "CASE_OPENED",
        title: `Matter ${newMatter.reference} Opened`,
        description: `Matter created by ${session.name}. Objective: ${newMatter.investigation_objective || newMatter.title}`,
        actor_user_id: session.userId,
        occurred_at: nowIso,
        visibility: "INTERNAL_ONLY",
        created_at: nowIso,
      });

      // Audit log
      await logAuditEvent({
        eventType: "CASE_CREATED",
        actorUserId: session.userId,
        actorName: session.name,
        entityType: "MATTER",
        entityId: newMatter.id,
        entityReference: newMatter.reference,
        matterId: newMatter.id,
        description: `Created matter ${newMatter.reference} - "${newMatter.title}"`,
        newState: newMatter as unknown as Record<string, unknown>,
      });

      return NextResponse.json(
        {
          success: true,
          data: newMatter,
          reference: newMatter.reference,
        },
        { status: 201 }
      );
    } catch (err) {
      console.error("[MATTER_CREATE_ERROR]", err);
      return NextResponse.json(
        { error: "INTERNAL_ERROR", message: "Failed to create matter." },
        { status: 500 }
      );
    }
  }
);
