// ============================================================
// AUDIT EVENT TYPES
// Private Intelligence & Investigations Platform
// ============================================================
// Defines the complete catalogue of auditable events.
// Audit records are append-only — no update/delete.

export type AuditEventType =
  // ── Authentication ────────────────────────────────────────
  | "AUTH_LOGIN_SUCCESS"
  | "AUTH_LOGIN_FAILED"
  | "AUTH_LOGOUT"
  | "AUTH_MFA_CHALLENGE_ISSUED"
  | "AUTH_MFA_VERIFIED"
  | "AUTH_MFA_FAILED"
  | "AUTH_MFA_ENABLED"
  | "AUTH_MFA_DISABLED"
  | "AUTH_PASSWORD_RESET_REQUESTED"
  | "AUTH_PASSWORD_RESET_COMPLETED"
  | "AUTH_PASSWORD_CHANGED"
  | "AUTH_SESSION_EXPIRED"
  | "AUTH_SESSION_REVOKED"
  | "AUTH_ALL_SESSIONS_REVOKED"
  | "AUTH_ACCOUNT_LOCKED"
  | "AUTH_ACCOUNT_UNLOCKED"
  | "AUTH_SUSPICIOUS_LOGIN"
  // ── Record Lifecycle ─────────────────────────────────────
  | "RECORD_VIEWED"
  | "RECORD_CREATED"
  | "RECORD_EDITED"
  | "RECORD_DELETED"
  | "RECORD_ARCHIVED"
  | "RECORD_RESTORED"
  // ── Cases ────────────────────────────────────────────────
  | "CASE_ACCESSED"
  | "CASE_CREATED"
  | "CASE_STATUS_CHANGED"
  | "CASE_PRIORITY_CHANGED"
  | "CASE_ASSIGNED"
  | "CASE_CLOSED"
  | "CASE_ARCHIVED"
  | "CASE_RETENTION_UPDATED"
  | "CASE_LEGAL_HOLD_APPLIED"
  | "CASE_LEGAL_HOLD_REMOVED"
  // ── Evidence ─────────────────────────────────────────────
  | "EVIDENCE_UPLOADED"
  | "EVIDENCE_VIEWED"
  | "EVIDENCE_DOWNLOADED"
  | "EVIDENCE_DELETED"
  | "EVIDENCE_HASH_VERIFIED"
  | "EVIDENCE_HASH_FAILED"
  | "EVIDENCE_CUSTODY_TRANSFERRED"
  | "EVIDENCE_ANNOTATED"
  // ── Documents ────────────────────────────────────────────
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_DOWNLOADED"
  | "DOCUMENT_DELETED"
  | "DOCUMENT_VERSION_CREATED"
  // ── Subjects ─────────────────────────────────────────────
  | "SUBJECT_ACCESSED"
  | "SUBJECT_CREATED"
  | "SUBJECT_EDITED"
  | "SUBJECT_DELETED"
  | "SUBJECT_MERGED"
  // ── Reports ──────────────────────────────────────────────
  | "REPORT_CREATED"
  | "REPORT_EDITED"
  | "REPORT_SUBMITTED_FOR_REVIEW"
  | "REPORT_APPROVED"
  | "REPORT_ISSUED"
  | "REPORT_ACCESSED"
  | "REPORT_SUPERSEDED"
  // ── Leads / Enquiries ────────────────────────────────────
  | "LEAD_RECEIVED"
  | "LEAD_ASSIGNED"
  | "LEAD_STATUS_CHANGED"
  | "LEAD_CONVERTED_TO_CASE"
  | "LEAD_CLOSED"
  // ── Intelligence ─────────────────────────────────────────
  | "INTELLIGENCE_CREATED"
  | "INTELLIGENCE_EDITED"
  | "INTELLIGENCE_DELETED"
  // ── Data Exports ─────────────────────────────────────────
  | "EXPORT_PDF"
  | "EXPORT_CSV"
  | "EXPORT_ZIP_EVIDENCE"
  | "EXPORT_BULK"
  // ── Users & Permissions ──────────────────────────────────
  | "USER_CREATED"
  | "USER_EDITED"
  | "USER_DISABLED"
  | "USER_ENABLED"
  | "USER_DELETED"
  | "USER_ROLE_CHANGED"
  | "USER_INVITED"
  | "USER_MFA_RESET"
  | "PERMISSION_CHANGED"
  // ── Security & System ────────────────────────────────────
  | "SECURITY_SETTING_CHANGED"
  | "INTEGRATION_ACCESSED"
  | "INTEGRATION_CONFIGURED"
  | "EXTERNAL_TOOL_OPENED"
  // ── Retention ────────────────────────────────────────────
  | "RETENTION_POLICY_APPLIED"
  | "RETENTION_REVIEW_DUE"
  | "RETENTION_DESTRUCTION_APPROVED"
  | "RETENTION_DESTRUCTION_COMPLETED"
  | "RETENTION_LEGAL_HOLD_APPLIED"
  | "RETENTION_LEGAL_HOLD_REMOVED";

/** Severity level for display and alerting. */
export type AuditSeverity = "INFO" | "NOTICE" | "WARNING" | "CRITICAL";

/** A single immutable audit log entry. */
export interface AuditEvent {
  id: string;
  eventType: AuditEventType;
  severity: AuditSeverity;
  actorUserId?: string;       // Internal user — undefined for system events
  actorName?: string;         // Denormalised for display after user deletion
  actorIp?: string;           // IPv4/IPv6 — only where operationally justified
  actorUserAgent?: string;    // Browser/device — for session management
  entityType?: string;        // e.g. "CASE", "EVIDENCE", "USER"
  entityId?: string;          // Opaque internal ID
  entityReference?: string;   // Human-readable reference (e.g. MAT-2501-001)
  matterId?: string;          // Case linkage
  clientOrganisationId?: string;
  description: string;        // Human-readable event description
  previousState?: Record<string, unknown>; // State before change
  newState?: Record<string, unknown>;      // State after change
  metadata?: Record<string, unknown>;      // Additional context
  occurredAt: Date;
}

/** Severity mapping for event types */
export const EVENT_SEVERITY: Partial<Record<AuditEventType, AuditSeverity>> = {
  AUTH_LOGIN_FAILED:         "NOTICE",
  AUTH_MFA_FAILED:           "NOTICE",
  AUTH_ACCOUNT_LOCKED:       "WARNING",
  AUTH_SUSPICIOUS_LOGIN:     "CRITICAL",
  AUTH_ALL_SESSIONS_REVOKED: "WARNING",
  EVIDENCE_HASH_FAILED:      "CRITICAL",
  EVIDENCE_DELETED:          "WARNING",
  RETENTION_DESTRUCTION_COMPLETED: "WARNING",
  SECURITY_SETTING_CHANGED:  "WARNING",
  USER_ROLE_CHANGED:         "NOTICE",
  PERMISSION_CHANGED:        "WARNING",
  EXPORT_ZIP_EVIDENCE:       "NOTICE",
  EXPORT_BULK:               "NOTICE",
  CASE_LEGAL_HOLD_APPLIED:   "NOTICE",
};

/** Get severity for a given event type, defaulting to INFO. */
export function getEventSeverity(eventType: AuditEventType): AuditSeverity {
  return EVENT_SEVERITY[eventType] ?? "INFO";
}
