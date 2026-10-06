// ============================================================
// CASE (MATTER) FIXTURES
// ============================================================

import type { Matter, MatterEvent } from "@/lib/db/types";

export const FIXTURE_CASES: Matter[] = [
  {
    id: "mat-001",
    reference: "MAT-2501-001",
    client_organisation_id: "cli-001",
    title: "Corporate Fraud — Internal Procurement Review",
    matter_type: "FRAUD",
    description: "Suspected procurement officer collusion with overseas vendor. Forensic investigation and lifestyle surveillance required prior to HR disciplinary process.",
    status: "IN_PROGRESS",
    priority: "URGENT",
    opened_at: "2025-09-15T09:00:00.000Z",
    target_date: "2025-11-01T09:00:00.000Z",
    lead_investigator_id: "usr-002",
    case_manager_id: "usr-004",
    created_from_enquiry_id: "enq-002",
    retention_status: "ACTIVE",
    created_at: "2025-09-15T09:00:00.000Z",
    updated_at: "2025-10-06T08:30:00.000Z",
  },
  {
    id: "mat-002",
    reference: "MAT-2501-002",
    client_organisation_id: "cli-002",
    title: "Process Serving — High Court Winding-Up Petition",
    matter_type: "PROCESS_SERVING",
    description: "Personal service of High Court winding-up petition and associated statutory demand on company director. Subject known to be evading service at registered address.",
    status: "FIELDWORK",
    priority: "URGENT",
    opened_at: "2025-10-01T09:00:00.000Z",
    target_date: "2025-10-10T09:00:00.000Z",
    lead_investigator_id: "usr-005",
    case_manager_id: "usr-004",
    created_from_enquiry_id: "enq-001",
    retention_status: "ACTIVE",
    created_at: "2025-10-01T09:00:00.000Z",
    updated_at: "2025-10-06T07:45:00.000Z",
  },
  {
    id: "mat-003",
    reference: "MAT-2501-003",
    client_organisation_id: "cli-001",
    title: "Offshore Asset Tracing — Judgment Enforcement",
    matter_type: "ASSET_TRACING",
    description: "Trace and verify assets held offshore following High Court judgment. Subject believed to have transferred significant assets to overseas entities prior to judgment.",
    status: "REPORTING",
    priority: "HIGH",
    opened_at: "2025-08-20T09:00:00.000Z",
    target_date: "2025-10-15T09:00:00.000Z",
    lead_investigator_id: "usr-002",
    case_manager_id: "usr-004",
    retention_status: "ACTIVE",
    created_at: "2025-08-20T09:00:00.000Z",
    updated_at: "2025-10-05T16:00:00.000Z",
  },
  {
    id: "mat-004",
    reference: "MAT-2501-004",
    client_organisation_id: "cli-004",
    title: "Pre-Acquisition Due Diligence — Target Entity",
    matter_type: "DUE_DILIGENCE",
    description: "Enhanced due diligence on acquisition target entity and key principals. Includes reputational, financial, and litigation background.",
    status: "OPEN",
    priority: "STANDARD",
    opened_at: "2025-10-03T09:00:00.000Z",
    target_date: "2025-10-24T09:00:00.000Z",
    lead_investigator_id: "usr-003",
    case_manager_id: "usr-004",
    retention_status: "ACTIVE",
    created_at: "2025-10-03T09:00:00.000Z",
    updated_at: "2025-10-06T09:00:00.000Z",
  },
  {
    id: "mat-005",
    reference: "MAT-2501-005",
    client_organisation_id: "cli-003",
    title: "Covert Surveillance — Insurance Fraud Assessment",
    matter_type: "SURVEILLANCE",
    description: "Covert surveillance of claimant alleging permanent disability following road traffic accident. Assess claimed limitations against observed activity.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    opened_at: "2025-09-28T09:00:00.000Z",
    target_date: "2025-10-20T09:00:00.000Z",
    lead_investigator_id: "usr-003",
    case_manager_id: "usr-004",
    retention_status: "ACTIVE",
    created_at: "2025-09-28T09:00:00.000Z",
    updated_at: "2025-10-05T18:00:00.000Z",
  },
  {
    id: "mat-006",
    reference: "MAT-2501-006",
    client_organisation_id: "cli-005",
    title: "Director Background — OSINT & Public Record Search",
    matter_type: "OSINT",
    description: "OSINT and public record investigation into proposed company director for client due diligence purposes.",
    status: "COMPLETED",
    priority: "STANDARD",
    opened_at: "2025-09-10T09:00:00.000Z",
    closed_at: "2025-10-02T14:00:00.000Z",
    lead_investigator_id: "usr-002",
    case_manager_id: "usr-004",
    retention_status: "ACTIVE",
    created_at: "2025-09-10T09:00:00.000Z",
    updated_at: "2025-10-02T14:00:00.000Z",
  },
  {
    id: "mat-007",
    reference: "MAT-2501-007",
    client_organisation_id: "cli-001",
    title: "Debtor Location — Evasive Judgment Debtor",
    matter_type: "TRACING",
    description: "Locate current residential and employment address of judgment debtor who has vacated last known address. Required for enforcement proceedings.",
    status: "NEW",
    priority: "STANDARD",
    opened_at: "2025-10-06T09:00:00.000Z",
    lead_investigator_id: undefined,
    case_manager_id: "usr-004",
    created_from_enquiry_id: "enq-004",
    retention_status: "ACTIVE",
    created_at: "2025-10-06T09:00:00.000Z",
    updated_at: "2025-10-06T09:00:00.000Z",
  },
];

export const FIXTURE_CASE_EVENTS: MatterEvent[] = [
  {
    id: "evt-001",
    matter_id: "mat-002",
    event_type: "SERVICE_ATTEMPT",
    title: "Service Attempt 01 — Residential Address",
    description: "Attended registered residential address at 07:30. No response; lights observed in property. Letterbox confirmed, further attempt scheduled.",
    actor_user_id: "usr-005",
    occurred_at: "2025-10-06T07:45:00.000Z",
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-06T07:50:00.000Z",
  },
  {
    id: "evt-002",
    matter_id: "mat-001",
    event_type: "SURVEILLANCE_LOG",
    title: "Surveillance — Day 3 Activity Observed",
    description: "Subject observed attending gym and subsequently meeting unknown male at coffee shop for approximately 40 minutes. Full report in evidence bundle.",
    actor_user_id: "usr-002",
    occurred_at: "2025-10-05T18:30:00.000Z",
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T19:00:00.000Z",
  },
  {
    id: "evt-003",
    matter_id: "mat-003",
    event_type: "REPORT_DRAFTED",
    title: "Asset Tracing Report — Draft Completed",
    description: "Interim report drafted covering identified assets in three jurisdictions. Awaiting partner review before issue.",
    actor_user_id: "usr-002",
    occurred_at: "2025-10-05T16:00:00.000Z",
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T16:05:00.000Z",
  },
  {
    id: "evt-004",
    matter_id: "mat-004",
    event_type: "CASE_OPENED",
    title: "Due Diligence Matter Opened",
    description: "Client instruction received. Research parameters agreed. Assigned to James Whitfield.",
    actor_user_id: "usr-004",
    occurred_at: "2025-10-03T09:00:00.000Z",
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-03T09:05:00.000Z",
  },
];

export function getCaseById(id: string): Matter | undefined {
  return FIXTURE_CASES.find((c) => c.id === id);
}

export function getCaseByReference(ref: string): Matter | undefined {
  return FIXTURE_CASES.find((c) => c.reference === ref);
}

export function getCasesByClient(clientId: string): Matter[] {
  return FIXTURE_CASES.filter((c) => c.client_organisation_id === clientId);
}

export function getActiveCases(): Matter[] {
  return FIXTURE_CASES.filter((c) =>
    ["NEW", "OPEN", "IN_PROGRESS", "FIELDWORK", "AWAITING_CLIENT", "AWAITING_INFORMATION"].includes(c.status)
  );
}
