// ============================================================
// CASE QUERY UTILITIES
// ============================================================

import {
  FIXTURE_CASES,
  FIXTURE_CASE_EVENTS,
  FIXTURE_TASKS,
  FIXTURE_EVIDENCE,
} from "@/lib/admin/fixtures";
import { getUserById, getClientById } from "@/lib/admin/fixtures";
import type { Matter, MatterEvent, MatterTask, EvidenceItem } from "@/lib/db/types";

export interface CaseDetail {
  matter: Matter;
  clientName: string;
  leadInvestigatorName: string;
  caseManagerName: string;
  events: MatterEvent[];
  tasks: MatterTask[];
  evidence: EvidenceItem[];
}

/**
 * Returns full case detail by reference (e.g. "MAT-2501-001").
 * TODO: Replace with DB query.
 */
export function getCaseDetail(reference: string): CaseDetail | null {
  const matter = FIXTURE_CASES.find((c) => c.reference === reference);
  if (!matter) return null;

  const client = getClientById(matter.client_organisation_id);
  const leadInvestigator = matter.lead_investigator_id
    ? getUserById(matter.lead_investigator_id)
    : null;
  const caseManager = matter.case_manager_id
    ? getUserById(matter.case_manager_id)
    : null;

  const events = FIXTURE_CASE_EVENTS.filter(
    (e) => e.matter_id === matter.id
  ).sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime());

  const tasks = FIXTURE_TASKS.filter(
    (t) => t.matter_id === matter.id
  ).sort((a, b) => {
    if (!a.due_at) return 1;
    if (!b.due_at) return -1;
    return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
  });

  const evidence = FIXTURE_EVIDENCE.filter((e) => e.matter_id === matter.id);

  return {
    matter,
    clientName: client?.trading_name ?? client?.legal_name ?? "Unknown",
    leadInvestigatorName: leadInvestigator?.name ?? "Unassigned",
    caseManagerName: caseManager?.name ?? "Unassigned",
    events,
    tasks,
    evidence,
  };
}

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
