// ============================================================
// CASE & MATTER QUERY UTILITIES
// Canonical query layer connecting all entities to a Matter
// ============================================================

import {
  FIXTURE_CASES,
  FIXTURE_CASE_EVENTS,
  FIXTURE_TASKS,
  FIXTURE_EVIDENCE,
  FIXTURE_ASSIGNMENTS,
  FIXTURE_DOCUMENTS,
  FIXTURE_MESSAGES,
  FIXTURE_SUBJECTS,
  getUserById,
  getClientById,
} from "@/lib/admin/fixtures";
import type {
  Matter,
  MatterEvent,
  MatterTask,
  EvidenceItem,
  MatterAssignment,
  MatterDocument,
  MatterMessage,
  ClientOrganisation,
  User,
} from "@/lib/db/types";
import type { SubjectProfile } from "@/lib/admin/fixtures/subjects";

export interface CaseDetail {
  matter: Matter;
  client: ClientOrganisation | null;
  clientName: string;
  leadInvestigator: User | null;
  leadInvestigatorName: string;
  caseManager: User | null;
  caseManagerName: string;
  events: MatterEvent[];
  tasks: MatterTask[];
  evidence: EvidenceItem[];
  assignments: MatterAssignment[];
  documents: MatterDocument[];
  messages: MatterMessage[];
  subjects: SubjectProfile[];
}

export type MatterDetail = CaseDetail;

/**
 * Returns full matter detail by reference (e.g. "MAT-2501-001") or ID.
 */
export function getCaseDetail(referenceOrId: string): CaseDetail | null {
  const query = referenceOrId.toLowerCase();
  const matter = FIXTURE_CASES.find(
    (c) => c.reference.toLowerCase() === query || c.id.toLowerCase() === query
  );
  if (!matter) return null;

  const client = getClientById(matter.client_organisation_id) ?? null;
  const leadInvestigator = matter.lead_investigator_id
    ? getUserById(matter.lead_investigator_id) ?? null
    : null;
  const caseManager = matter.case_manager_id
    ? getUserById(matter.case_manager_id) ?? null
    : null;

  const events = FIXTURE_CASE_EVENTS.filter((e) => e.matter_id === matter.id).sort(
    (a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
  );

  const tasks = FIXTURE_TASKS.filter((t) => t.matter_id === matter.id).sort((a, b) => {
    if (!a.due_at) return 1;
    if (!b.due_at) return -1;
    return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
  });

  const evidence = FIXTURE_EVIDENCE.filter((e) => e.matter_id === matter.id);
  const assignments = FIXTURE_ASSIGNMENTS.filter((a) => a.matter_id === matter.id);
  const documents = FIXTURE_DOCUMENTS.filter((d) => d.matter_id === matter.id);
  const messages = FIXTURE_MESSAGES.filter((m) => m.matter_id === matter.id).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  const subjects = FIXTURE_SUBJECTS.filter((s) => s.matter_id === matter.id);

  return {
    matter,
    client,
    clientName: client?.trading_name ?? client?.legal_name ?? "Private Client",
    leadInvestigator,
    leadInvestigatorName: leadInvestigator?.name ?? "Unassigned",
    caseManager,
    caseManagerName: caseManager?.name ?? "Unassigned",
    events,
    tasks,
    evidence,
    assignments,
    documents,
    messages,
    subjects,
  };
}

export const getMatterDetail = getCaseDetail;

/**
 * Returns all unique matter types in the fixture data.
 */
export function getMatterTypes(): string[] {
  return [...new Set(FIXTURE_CASES.map((c) => c.matter_type))];
}

/**
 * Filters cases by status.
 */
export function getCasesByStatus(status: string): Matter[] {
  return FIXTURE_CASES.filter((c) => c.status === status);
}
