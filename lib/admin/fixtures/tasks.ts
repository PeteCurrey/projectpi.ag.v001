// ============================================================
// TASK FIXTURES
// ============================================================

import type { MatterTask } from "@/lib/db/types";

const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date(now);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);

export const FIXTURE_TASKS: MatterTask[] = [
  {
    id: "tsk-001",
    matter_id: "mat-002",
    title: "Attempt 02 — Early morning attendance",
    description: "Second service attempt at residential address. Attempt 05:30–08:00 window.",
    assigned_to: "usr-005",
    status: "TODO",
    priority: "CRITICAL",
    due_at: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 30, 0).toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-06T07:50:00.000Z",
    updated_at: "2025-10-06T07:50:00.000Z",
  },
  {
    id: "tsk-002",
    matter_id: "mat-003",
    title: "Submit interim asset report for director review",
    description: "Asset tracing interim report — submit to D. Mercer for review and approval before client issue.",
    assigned_to: "usr-002",
    status: "IN_PROGRESS",
    priority: "HIGH",
    due_at: now.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T16:00:00.000Z",
    updated_at: "2025-10-06T08:00:00.000Z",
  },
  {
    id: "tsk-003",
    matter_id: "mat-001",
    title: "Compile surveillance log — Days 1–3",
    description: "Consolidate surveillance notes and photographs into evidence bundle. Redact operationally sensitive information before client-visible version.",
    assigned_to: "usr-002",
    status: "IN_PROGRESS",
    priority: "HIGH",
    due_at: tomorrow.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-04T09:00:00.000Z",
    updated_at: "2025-10-06T08:30:00.000Z",
  },
  {
    id: "tsk-004",
    matter_id: "mat-004",
    title: "Companies House records — download and review",
    description: "Obtain and review full filing history, officer records, and PSC register for target entity and all connected companies.",
    assigned_to: "usr-003",
    status: "TODO",
    priority: "STANDARD",
    due_at: tomorrow.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-03T09:00:00.000Z",
    updated_at: "2025-10-03T09:00:00.000Z",
  },
  {
    id: "tsk-005",
    matter_id: "mat-005",
    title: "Review surveillance footage — Day 2",
    description: "Review and annotate Day 2 surveillance recording. Note timestamps of significant activity for report.",
    assigned_to: "usr-003",
    status: "TODO",
    priority: "STANDARD",
    due_at: tomorrow.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-05T18:00:00.000Z",
    updated_at: "2025-10-05T18:00:00.000Z",
  },
  {
    id: "tsk-006",
    matter_id: "mat-001",
    title: "Review new enquiry ENQ-2510-003",
    description: "Insurance surveillance enquiry received. Assess, respond to client, and if appropriate prepare instruction.",
    assigned_to: "usr-004",
    status: "TODO",
    priority: "STANDARD",
    due_at: now.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "tsk-007",
    matter_id: "mat-007",
    title: "Assign investigator to MAT-2501-007",
    description: "New tracing matter requires investigator assignment. Check availability and assign.",
    assigned_to: "usr-004",
    status: "TODO",
    priority: "STANDARD",
    due_at: now.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-10-06T09:00:00.000Z",
    updated_at: "2025-10-06T09:00:00.000Z",
  },
  {
    id: "tsk-008",
    matter_id: "mat-006",
    title: "Issue OSINT report to Reynolds & Co",
    description: "Director background report approved. Issue to client via secure portal and log delivery.",
    assigned_to: "usr-002",
    status: "COMPLETED",
    priority: "STANDARD",
    due_at: "2025-10-02T14:00:00.000Z",
    completed_at: "2025-10-02T14:00:00.000Z",
    visibility: "INTERNAL_ONLY",
    created_at: "2025-09-30T09:00:00.000Z",
    updated_at: "2025-10-02T14:05:00.000Z",
  },
  // Overdue task
  {
    id: "tsk-009",
    matter_id: "mat-005",
    title: "Obtain insurance schedule from client",
    description: "Request policy schedule and claim documentation from Meridian to complete case file.",
    assigned_to: "usr-004",
    status: "TODO",
    priority: "HIGH",
    due_at: yesterday.toISOString(),
    visibility: "INTERNAL_ONLY",
    created_at: "2025-09-29T09:00:00.000Z",
    updated_at: "2025-09-29T09:00:00.000Z",
  },
];

export function getTaskById(id: string): MatterTask | undefined {
  return FIXTURE_TASKS.find((t) => t.id === id);
}

export function getTasksByCase(matterId: string): MatterTask[] {
  return FIXTURE_TASKS.filter((t) => t.matter_id === matterId);
}

export function getTasksDueToday(): MatterTask[] {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  return FIXTURE_TASKS.filter((t) => {
    if (!t.due_at || t.status === "COMPLETED" || t.status === "CANCELLED") return false;
    const due = new Date(t.due_at);
    return due >= todayStart && due <= todayEnd;
  });
}

export function getOverdueTasks(): MatterTask[] {
  const now = new Date();
  return FIXTURE_TASKS.filter((t) => {
    if (!t.due_at || t.status === "COMPLETED" || t.status === "CANCELLED") return false;
    return new Date(t.due_at) < now;
  });
}
