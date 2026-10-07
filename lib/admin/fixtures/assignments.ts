// ============================================================
// MATTER ASSIGNMENT FIXTURES
// Dedicated investigator assignments for Matters
// ============================================================

import type { MatterAssignment } from "@/lib/db/types";

export const FIXTURE_ASSIGNMENTS: MatterAssignment[] = [
  {
    id: "asg-001",
    matter_id: "mat-001",
    user_id: "usr-002",
    assignment_role: "LEAD_INVESTIGATOR",
    start_date: "2025-09-15T09:00:00.000Z",
    status: "ACTIVE",
    instructions: "Lead all investigative operations, forensic data review, and vendor interviews.",
    assigned_by_user_id: "usr-004",
    created_at: "2025-09-15T09:00:00.000Z",
    updated_at: "2025-09-15T09:00:00.000Z",
  },
  {
    id: "asg-002",
    matter_id: "mat-001",
    user_id: "usr-003",
    assignment_role: "SURVEILLANCE_OPERATIVE",
    start_date: "2025-09-20T08:00:00.000Z",
    status: "ACTIVE",
    instructions: "Static and mobile surveillance on primary target during business hours.",
    assigned_by_user_id: "usr-002",
    created_at: "2025-09-20T08:00:00.000Z",
    updated_at: "2025-09-20T08:00:00.000Z",
  },
  {
    id: "asg-003",
    matter_id: "mat-002",
    user_id: "usr-005",
    assignment_role: "PROCESS_SERVER",
    start_date: "2025-10-01T09:00:00.000Z",
    status: "ACTIVE",
    instructions: "Personal service of High Court winding-up petition on evasive director.",
    assigned_by_user_id: "usr-004",
    created_at: "2025-10-01T09:00:00.000Z",
    updated_at: "2025-10-01T09:00:00.000Z",
  },
  {
    id: "asg-004",
    matter_id: "mat-003",
    user_id: "usr-002",
    assignment_role: "LEAD_INVESTIGATOR",
    start_date: "2025-08-20T09:00:00.000Z",
    status: "ACTIVE",
    instructions: "Coordinate international asset tracing and corporate intelligence queries.",
    assigned_by_user_id: "usr-004",
    created_at: "2025-08-20T09:00:00.000Z",
    updated_at: "2025-08-20T09:00:00.000Z",
  },
  {
    id: "asg-005",
    matter_id: "mat-004",
    user_id: "usr-003",
    assignment_role: "RESEARCHER",
    start_date: "2025-10-03T09:00:00.000Z",
    status: "ACTIVE",
    instructions: "Conduct OSINT, Companies House analysis, and regulatory compliance screening.",
    assigned_by_user_id: "usr-004",
    created_at: "2025-10-03T09:00:00.000Z",
    updated_at: "2025-10-03T09:00:00.000Z",
  },
  {
    id: "asg-006",
    matter_id: "mat-005",
    user_id: "usr-003",
    assignment_role: "LEAD_INVESTIGATOR",
    start_date: "2025-09-28T09:00:00.000Z",
    status: "ACTIVE",
    instructions: "Manage insurance fraud assessment and mobile surveillance operatives.",
    assigned_by_user_id: "usr-004",
    created_at: "2025-09-28T09:00:00.000Z",
    updated_at: "2025-09-28T09:00:00.000Z",
  },
];

export function getAssignmentsByMatter(matterId: string): MatterAssignment[] {
  return FIXTURE_ASSIGNMENTS.filter((a) => a.matter_id === matterId);
}
