// ============================================================
// RBAC PERMISSIONS
// Private Intelligence & Investigations Platform
// ============================================================
// All permission constants used throughout the application.
// Server-side only — never expose to client without authorisation check.

export const PERMISSIONS = {
  // ── Cases ───────────────────────────────────────────────
  CASES_VIEW:    "cases.view",
  CASES_CREATE:  "cases.create",
  CASES_EDIT:    "cases.edit",
  CASES_CLOSE:   "cases.close",
  CASES_DELETE:  "cases.delete",
  CASES_EXPORT:  "cases.export",

  // ── Subjects ────────────────────────────────────────────
  SUBJECTS_VIEW:   "subjects.view",
  SUBJECTS_CREATE: "subjects.create",
  SUBJECTS_EDIT:   "subjects.edit",
  SUBJECTS_DELETE: "subjects.delete",

  // ── Leads / Enquiries ───────────────────────────────────
  LEADS_VIEW:    "leads.view",
  LEADS_CREATE:  "leads.create",
  LEADS_EDIT:    "leads.edit",
  LEADS_ASSIGN:  "leads.assign",
  LEADS_CONVERT: "leads.convert",
  LEADS_DELETE:  "leads.delete",

  // ── Clients ─────────────────────────────────────────────
  CLIENTS_VIEW:   "clients.view",
  CLIENTS_CREATE: "clients.create",
  CLIENTS_EDIT:   "clients.edit",
  CLIENTS_DELETE: "clients.delete",

  // ── Evidence ────────────────────────────────────────────
  EVIDENCE_VIEW:     "evidence.view",
  EVIDENCE_UPLOAD:   "evidence.upload",
  EVIDENCE_DOWNLOAD: "evidence.download",
  EVIDENCE_DELETE:   "evidence.delete",
  EVIDENCE_EXPORT:   "evidence.export",

  // ── Documents ───────────────────────────────────────────
  DOCUMENTS_VIEW:     "documents.view",
  DOCUMENTS_UPLOAD:   "documents.upload",
  DOCUMENTS_DOWNLOAD: "documents.download",
  DOCUMENTS_DELETE:   "documents.delete",

  // ── Reports ─────────────────────────────────────────────
  REPORTS_VIEW:    "reports.view",
  REPORTS_CREATE:  "reports.create",
  REPORTS_APPROVE: "reports.approve",
  REPORTS_ISSUE:   "reports.issue",
  REPORTS_EXPORT:  "reports.export",

  // ── Intelligence / Research ─────────────────────────────
  INTELLIGENCE_VIEW:   "intelligence.view",
  INTELLIGENCE_CREATE: "intelligence.create",
  INTELLIGENCE_EDIT:   "intelligence.edit",
  INTELLIGENCE_DELETE: "intelligence.delete",

  // ── Tasks ───────────────────────────────────────────────
  TASKS_VIEW:   "tasks.view",
  TASKS_CREATE: "tasks.create",
  TASKS_EDIT:   "tasks.edit",
  TASKS_DELETE: "tasks.delete",

  // ── Finance / Commercial ────────────────────────────────
  FINANCE_VIEW:   "finance.view",
  FINANCE_EDIT:   "finance.edit",
  FINANCE_EXPORT: "finance.export",

  // ── CMS / Content ───────────────────────────────────────
  CMS_VIEW:    "cms.view",
  CMS_EDIT:    "cms.edit",
  CMS_PUBLISH: "cms.publish",

  // ── Operations ──────────────────────────────────────────
  OPERATIONS_VIEW:   "operations.view",
  OPERATIONS_ASSIGN: "operations.assign",
  OPERATIONS_EDIT:   "operations.edit",

  // ── System ──────────────────────────────────────────────
  AUDIT_VIEW:          "audit.view",
  USERS_VIEW:          "users.view",
  USERS_MANAGE:        "users.manage",
  ROLES_VIEW:          "roles.view",
  ROLES_MANAGE:        "roles.manage",
  SECURITY_VIEW:       "security.view",
  SECURITY_MANAGE:     "security.manage",
  SETTINGS_VIEW:       "settings.view",
  SETTINGS_EDIT:       "settings.edit",
  RETENTION_VIEW:      "retention.view",
  RETENTION_MANAGE:    "retention.manage",
  INTEGRATIONS_VIEW:   "integrations.view",
  INTEGRATIONS_MANAGE: "integrations.manage",
  NOTIFICATIONS_VIEW:  "notifications.view",
  NOTIFICATIONS_MANAGE:"notifications.manage",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// All permissions — useful for SUPER_ADMIN
export const ALL_PERMISSIONS: Permission[] = Object.values(PERMISSIONS);
