// ============================================================
// NOTIFICATION FIXTURES
// ============================================================

import type { Notification } from "@/lib/db/types";

export const FIXTURE_NOTIFICATIONS: Notification[] = [
  {
    id: "ntf-001",
    user_id: "usr-001",
    type: "ACTION_REQUIRED",
    title: "New Urgent Enquiry",
    body: "A new urgent enquiry has been received and requires review.",
    entity_type: "ENQUIRY",
    entity_id: "enq-005",
    created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
  },
  {
    id: "ntf-002",
    user_id: "usr-001",
    type: "ACTION_REQUIRED",
    title: "New Enquiry — Surveillance",
    body: "A new surveillance enquiry has been received.",
    entity_type: "ENQUIRY",
    entity_id: "enq-003",
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "ntf-003",
    user_id: "usr-001",
    type: "DEADLINE_REMINDER",
    title: "Task Overdue",
    body: "A task is overdue and requires attention.",
    entity_type: "TASK",
    entity_id: "tsk-009",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ntf-004",
    user_id: "usr-001",
    type: "MATTER_STATUS_CHANGE",
    title: "Case Status Update",
    body: "A case has moved to Reporting stage.",
    matter_id: "mat-003",
    entity_type: "CASE",
    entity_id: "mat-003",
    read_at: "2025-10-05T16:10:00.000Z",
    created_at: "2025-10-05T16:05:00.000Z",
  },
  {
    id: "ntf-005",
    user_id: "usr-001",
    type: "NEW_DOCUMENT",
    title: "Report Draft Available",
    body: "A new report draft is available for review.",
    matter_id: "mat-003",
    entity_type: "REPORT",
    entity_id: "rpt-001",
    read_at: "2025-10-05T17:00:00.000Z",
    created_at: "2025-10-05T16:30:00.000Z",
  },
];

export function getUnreadNotifications(userId: string): Notification[] {
  return FIXTURE_NOTIFICATIONS.filter(
    (n) => n.user_id === userId && !n.read_at
  );
}

export function getAllNotificationsForUser(userId: string): Notification[] {
  return FIXTURE_NOTIFICATIONS.filter((n) => n.user_id === userId);
}
