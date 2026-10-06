// ============================================================
// AUDIT LOG FIXTURES
// ============================================================

import type { AuditLog } from "@/lib/db/types";

export const FIXTURE_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-001",
    actor_user_id: "usr-005",
    action: "AUTH_LOGIN_SUCCESS",
    entity_type: "USER",
    entity_id: "usr-005",
    notes: "Successful login — MFA verified",
    occurred_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aud-002",
    actor_user_id: "usr-005",
    action: "EVIDENCE_UPLOADED",
    entity_type: "EVIDENCE",
    entity_id: "evi-001",
    matter_id: "mat-002",
    notes: "Service Attempt 01 field log uploaded",
    occurred_at: "2025-10-06T07:50:00.000Z",
  },
  {
    id: "aud-003",
    actor_user_id: "usr-002",
    action: "EVIDENCE_UPLOADED",
    entity_type: "EVIDENCE",
    entity_id: "evi-002",
    matter_id: "mat-001",
    notes: "Day 3 surveillance photographs uploaded",
    occurred_at: "2025-10-05T18:30:00.000Z",
  },
  {
    id: "aud-004",
    actor_user_id: "usr-004",
    action: "CASE_STATUS_CHANGED",
    entity_type: "CASE",
    entity_id: "mat-003",
    matter_id: "mat-003",
    previous_state: { status: "IN_PROGRESS" },
    new_state: { status: "REPORTING" },
    notes: "Status updated to REPORTING",
    occurred_at: "2025-10-05T16:00:00.000Z",
  },
  {
    id: "aud-005",
    action: "AUTH_LOGIN_FAILED",
    actor_ip: "185.220.101.47",
    notes: "Failed login attempt — unrecognised IP",
    occurred_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "aud-006",
    actor_user_id: "usr-002",
    action: "CASE_ACCESSED",
    entity_type: "CASE",
    entity_id: "mat-001",
    matter_id: "mat-001",
    notes: "Case file accessed",
    occurred_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
  },
  {
    id: "aud-007",
    actor_user_id: "usr-001",
    action: "USER_ROLE_CHANGED",
    entity_type: "USER",
    entity_id: "usr-005",
    previous_state: { role: "FIELD_OPERATIVE" },
    new_state: { role: "INVESTIGATOR" },
    notes: "Role updated following probation review",
    occurred_at: "2025-10-04T14:00:00.000Z",
  },
  {
    id: "aud-008",
    actor_user_id: "usr-003",
    action: "EVIDENCE_DOWNLOADED",
    entity_type: "EVIDENCE",
    entity_id: "evi-005",
    matter_id: "mat-005",
    notes: "Day 2 surveillance video reviewed",
    occurred_at: "2025-10-05T09:00:00.000Z",
  },
  {
    id: "aud-009",
    actor_user_id: "usr-004",
    action: "LEAD_CONVERTED_TO_CASE",
    entity_type: "ENQUIRY",
    entity_id: "enq-004",
    notes: "ENQ-2510-004 converted to MAT-2501-007",
    occurred_at: "2025-10-06T09:00:00.000Z",
  },
  {
    id: "aud-010",
    actor_user_id: "usr-002",
    action: "REPORT_SUBMITTED_FOR_REVIEW",
    entity_type: "REPORT",
    entity_id: "rpt-001",
    matter_id: "mat-003",
    notes: "Asset tracing interim report submitted for director review",
    occurred_at: "2025-10-05T16:05:00.000Z",
  },
];

export function getRecentAuditEvents(limit = 20): AuditLog[] {
  return [...FIXTURE_AUDIT_LOGS]
    .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime())
    .slice(0, limit);
}

export function getAuditEventsByCase(matterId: string): AuditLog[] {
  return FIXTURE_AUDIT_LOGS.filter((e) => e.matter_id === matterId);
}

export function getFailedLoginEvents(): AuditLog[] {
  return FIXTURE_AUDIT_LOGS.filter((e) => e.action === "AUTH_LOGIN_FAILED");
}
