// ============================================================
// RBAC ROLE DEFINITIONS
// Private Intelligence & Investigations Platform
// ============================================================
// Maps each of the 11 platform roles to its permission set.
// Server-side only. Permissions are enforced via guard.ts.

import { ALL_PERMISSIONS, Permission, PERMISSIONS as P } from "./permissions";
import type { UserRole } from "@/lib/db/types";

// Extended roles beyond the base UserRole type (for admin OS)
export type AdminRole =
  | "SUPER_ADMIN"
  | "DIRECTOR"
  | "SENIOR_INVESTIGATOR"
  | "INVESTIGATOR"
  | "RESEARCHER"
  | "CASE_MANAGER"
  | "PROCESS_SERVER"
  | "FIELD_OPERATIVE"
  | "FINANCE"
  | "CONTENT_MANAGER"
  | "READ_ONLY";

export interface RoleDefinition {
  role: AdminRole;
  label: string;
  description: string;
  permissions: Permission[];
}

const DIRECTOR_PERMISSIONS: Permission[] = [
  // Cases — full
  P.CASES_VIEW, P.CASES_CREATE, P.CASES_EDIT, P.CASES_CLOSE, P.CASES_DELETE, P.CASES_EXPORT,
  // Subjects — full
  P.SUBJECTS_VIEW, P.SUBJECTS_CREATE, P.SUBJECTS_EDIT, P.SUBJECTS_DELETE,
  // Leads — full
  P.LEADS_VIEW, P.LEADS_CREATE, P.LEADS_EDIT, P.LEADS_ASSIGN, P.LEADS_CONVERT, P.LEADS_DELETE,
  // Clients — full
  P.CLIENTS_VIEW, P.CLIENTS_CREATE, P.CLIENTS_EDIT, P.CLIENTS_DELETE,
  // Evidence — full
  P.EVIDENCE_VIEW, P.EVIDENCE_UPLOAD, P.EVIDENCE_DOWNLOAD, P.EVIDENCE_DELETE, P.EVIDENCE_EXPORT,
  // Documents — full
  P.DOCUMENTS_VIEW, P.DOCUMENTS_UPLOAD, P.DOCUMENTS_DOWNLOAD, P.DOCUMENTS_DELETE,
  // Reports — full
  P.REPORTS_VIEW, P.REPORTS_CREATE, P.REPORTS_APPROVE, P.REPORTS_ISSUE, P.REPORTS_EXPORT,
  // Intelligence — full
  P.INTELLIGENCE_VIEW, P.INTELLIGENCE_CREATE, P.INTELLIGENCE_EDIT, P.INTELLIGENCE_DELETE,
  // Tasks — full
  P.TASKS_VIEW, P.TASKS_CREATE, P.TASKS_EDIT, P.TASKS_DELETE,
  // Finance — full
  P.FINANCE_VIEW, P.FINANCE_EDIT, P.FINANCE_EXPORT,
  // CMS — full
  P.CMS_VIEW, P.CMS_EDIT, P.CMS_PUBLISH,
  // Operations — full
  P.OPERATIONS_VIEW, P.OPERATIONS_ASSIGN, P.OPERATIONS_EDIT,
  // System — view audit, view users, manage security settings
  P.AUDIT_VIEW, P.USERS_VIEW, P.ROLES_VIEW, P.SECURITY_VIEW,
  P.SETTINGS_VIEW, P.SETTINGS_EDIT, P.RETENTION_VIEW, P.RETENTION_MANAGE,
  P.INTEGRATIONS_VIEW, P.NOTIFICATIONS_VIEW,
];

const SENIOR_INVESTIGATOR_PERMISSIONS: Permission[] = [
  P.CASES_VIEW, P.CASES_CREATE, P.CASES_EDIT, P.CASES_CLOSE, P.CASES_EXPORT,
  P.SUBJECTS_VIEW, P.SUBJECTS_CREATE, P.SUBJECTS_EDIT,
  P.LEADS_VIEW, P.LEADS_EDIT, P.LEADS_ASSIGN, P.LEADS_CONVERT,
  P.CLIENTS_VIEW,
  P.EVIDENCE_VIEW, P.EVIDENCE_UPLOAD, P.EVIDENCE_DOWNLOAD, P.EVIDENCE_EXPORT,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_UPLOAD, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW, P.REPORTS_CREATE, P.REPORTS_APPROVE, P.REPORTS_ISSUE, P.REPORTS_EXPORT,
  P.INTELLIGENCE_VIEW, P.INTELLIGENCE_CREATE, P.INTELLIGENCE_EDIT,
  P.TASKS_VIEW, P.TASKS_CREATE, P.TASKS_EDIT,
  P.OPERATIONS_VIEW, P.OPERATIONS_EDIT,
  P.AUDIT_VIEW,
  P.NOTIFICATIONS_VIEW,
];

const INVESTIGATOR_PERMISSIONS: Permission[] = [
  P.CASES_VIEW, P.CASES_EDIT,
  P.SUBJECTS_VIEW, P.SUBJECTS_EDIT,
  P.LEADS_VIEW,
  P.CLIENTS_VIEW,
  P.EVIDENCE_VIEW, P.EVIDENCE_UPLOAD, P.EVIDENCE_DOWNLOAD,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_UPLOAD, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW, P.REPORTS_CREATE,
  P.INTELLIGENCE_VIEW, P.INTELLIGENCE_CREATE, P.INTELLIGENCE_EDIT,
  P.TASKS_VIEW, P.TASKS_CREATE, P.TASKS_EDIT,
  P.OPERATIONS_VIEW,
  P.NOTIFICATIONS_VIEW,
];

const RESEARCHER_PERMISSIONS: Permission[] = [
  P.CASES_VIEW,
  P.SUBJECTS_VIEW,
  P.LEADS_VIEW,
  P.CLIENTS_VIEW,
  P.EVIDENCE_VIEW,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW,
  P.INTELLIGENCE_VIEW, P.INTELLIGENCE_CREATE, P.INTELLIGENCE_EDIT,
  P.TASKS_VIEW, P.TASKS_CREATE,
  P.NOTIFICATIONS_VIEW,
];

const CASE_MANAGER_PERMISSIONS: Permission[] = [
  P.CASES_VIEW, P.CASES_CREATE, P.CASES_EDIT, P.CASES_CLOSE,
  P.SUBJECTS_VIEW, P.SUBJECTS_CREATE, P.SUBJECTS_EDIT,
  P.LEADS_VIEW, P.LEADS_CREATE, P.LEADS_EDIT, P.LEADS_ASSIGN, P.LEADS_CONVERT,
  P.CLIENTS_VIEW, P.CLIENTS_CREATE, P.CLIENTS_EDIT,
  P.EVIDENCE_VIEW, P.EVIDENCE_DOWNLOAD,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_UPLOAD, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW,
  P.INTELLIGENCE_VIEW,
  P.TASKS_VIEW, P.TASKS_CREATE, P.TASKS_EDIT,
  P.OPERATIONS_VIEW, P.OPERATIONS_ASSIGN,
  P.NOTIFICATIONS_VIEW,
];

const PROCESS_SERVER_PERMISSIONS: Permission[] = [
  P.CASES_VIEW,
  P.SUBJECTS_VIEW,
  P.EVIDENCE_VIEW, P.EVIDENCE_UPLOAD, P.EVIDENCE_DOWNLOAD,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_UPLOAD, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW,
  P.TASKS_VIEW, P.TASKS_EDIT,
  P.OPERATIONS_VIEW, P.OPERATIONS_EDIT,
  P.NOTIFICATIONS_VIEW,
];

const FIELD_OPERATIVE_PERMISSIONS: Permission[] = [
  P.CASES_VIEW,
  P.SUBJECTS_VIEW,
  P.EVIDENCE_VIEW, P.EVIDENCE_UPLOAD,
  P.TASKS_VIEW, P.TASKS_EDIT,
  P.OPERATIONS_VIEW,
  P.NOTIFICATIONS_VIEW,
];

const FINANCE_PERMISSIONS: Permission[] = [
  P.CASES_VIEW,
  P.CLIENTS_VIEW,
  P.DOCUMENTS_VIEW, P.DOCUMENTS_DOWNLOAD,
  P.REPORTS_VIEW,
  P.FINANCE_VIEW, P.FINANCE_EDIT, P.FINANCE_EXPORT,
  P.NOTIFICATIONS_VIEW,
];

const CONTENT_MANAGER_PERMISSIONS: Permission[] = [
  P.CMS_VIEW, P.CMS_EDIT, P.CMS_PUBLISH,
  P.NOTIFICATIONS_VIEW,
];

const READ_ONLY_PERMISSIONS: Permission[] = [
  P.CASES_VIEW,
  P.CLIENTS_VIEW,
  P.LEADS_VIEW,
  P.DOCUMENTS_VIEW,
  P.REPORTS_VIEW,
  P.NOTIFICATIONS_VIEW,
];

export const ROLE_DEFINITIONS: Record<AdminRole, RoleDefinition> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Administrator",
    description: "Unrestricted system access. Full control over all data, security, users, and configuration.",
    permissions: ALL_PERMISSIONS,
  },
  DIRECTOR: {
    role: "DIRECTOR",
    label: "Director",
    description: "Full operational access. Cannot manage user accounts or security settings directly.",
    permissions: DIRECTOR_PERMISSIONS,
  },
  SENIOR_INVESTIGATOR: {
    role: "SENIOR_INVESTIGATOR",
    label: "Senior Investigator",
    description: "Full case, evidence, and report access. Can approve and issue reports.",
    permissions: SENIOR_INVESTIGATOR_PERMISSIONS,
  },
  INVESTIGATOR: {
    role: "INVESTIGATOR",
    label: "Investigator",
    description: "Case work, evidence upload, intelligence gathering. Cannot issue reports without approval.",
    permissions: INVESTIGATOR_PERMISSIONS,
  },
  RESEARCHER: {
    role: "RESEARCHER",
    label: "Researcher",
    description: "Intelligence and OSINT work. Read-only on cases and evidence.",
    permissions: RESEARCHER_PERMISSIONS,
  },
  CASE_MANAGER: {
    role: "CASE_MANAGER",
    label: "Case Manager",
    description: "Lead conversion, case lifecycle management, task coordination. No evidence upload.",
    permissions: CASE_MANAGER_PERMISSIONS,
  },
  PROCESS_SERVER: {
    role: "PROCESS_SERVER",
    label: "Process Server",
    description: "Process serving operations, evidence upload for service records, field reports.",
    permissions: PROCESS_SERVER_PERMISSIONS,
  },
  FIELD_OPERATIVE: {
    role: "FIELD_OPERATIVE",
    label: "Field Operative",
    description: "Assigned case access, evidence upload, task completion. No case editing.",
    permissions: FIELD_OPERATIVE_PERMISSIONS,
  },
  FINANCE: {
    role: "FINANCE",
    label: "Finance",
    description: "Invoicing, payments, and financial reporting. No access to investigation details.",
    permissions: FINANCE_PERMISSIONS,
  },
  CONTENT_MANAGER: {
    role: "CONTENT_MANAGER",
    label: "Content Manager",
    description: "CMS access only. No access to investigation, client, or financial data.",
    permissions: CONTENT_MANAGER_PERMISSIONS,
  },
  READ_ONLY: {
    role: "READ_ONLY",
    label: "Read Only",
    description: "View-only access to cases and clients. No edit, upload, or export permissions.",
    permissions: READ_ONLY_PERMISSIONS,
  },
};

/** Map base UserRole to AdminRole */
export function userRoleToAdminRole(role: UserRole): AdminRole {
  const map: Record<UserRole, AdminRole> = {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "DIRECTOR",
    CASE_MANAGER: "CASE_MANAGER",
    INVESTIGATOR: "INVESTIGATOR",
    CLIENT: "READ_ONLY",
    CLIENT_ADMIN: "READ_ONLY",
  };
  return map[role] ?? "READ_ONLY";
}
