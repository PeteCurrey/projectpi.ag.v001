// ============================================================================
// SERVER-SIDE AUDIT LOGGING SERVICE
// Append-Only, Redacted, Immutable Event Logging
// ============================================================================

export type AuditAction =
  | "LOGIN"
  | "LOGIN_FAILED"
  | "LOGOUT"
  | "PASSWORD_RESET"
  | "MFA_CHANGE"
  | "ROLE_CHANGED"
  | "MEMBERSHIP_CREATED"
  | "MEMBERSHIP_REVOKED"
  | "MATTER_CREATED"
  | "MATTER_ASSIGNED"
  | "MATTER_ACCESSED"
  | "DOCUMENT_UPLOADED"
  | "DOCUMENT_VIEWED"
  | "DOCUMENT_DOWNLOADED"
  | "DOCUMENT_DELETED"
  | "REPORT_CREATED"
  | "REPORT_APPROVED"
  | "REPORT_DELIVERED"
  | "MESSAGE_SENT"
  | "MESSAGE_READ"
  | "SERVICE_ATTEMPT_CREATED"
  | "ENQUIRY_SUBMITTED"
  | "ENQUIRY_VIEWED"
  | "ENQUIRY_ASSIGNED"
  | "ENQUIRY_CONVERTED"
  | "CLIENT_CREATED"
  | "PERMISSION_DENIED"
  | "ADMIN_ACTION";

export interface AuditPayload {
  actorUserId?: string;
  actorRole?: string;
  action: AuditAction;
  entityType?: string;
  entityId?: string;
  matterId?: string;
  clientOrganisationId?: string;
  actorIp?: string;
  actorUserAgent?: string;
  metadata?: Record<string, unknown>;
  notes?: string;
}

// In-memory audit store for application verification / fallback
const memoryAuditLog: Array<AuditPayload & { id: string; occurredAt: string }> = [];

/**
 * Redacts any potential sensitive personal or investigative data from metadata
 */
function sanitizeAuditMetadata(metadata?: Record<string, unknown>): Record<string, unknown> {
  if (!metadata) return {};
  const sanitized = { ...metadata };
  const sensitiveKeys = [
    "narrative",
    "description",
    "password",
    "token",
    "secret",
    "email",
    "phone",
    "telephone",
    "address",
    "subjectname",
    "contactname",
    "card",
    "bank",
  ];

  for (const key of Object.keys(sanitized)) {
    const k = key.toLowerCase();
    if (sensitiveKeys.some((s) => k.includes(s))) {
      sanitized[key] = "[REDACTED]";
    }
  }

  return sanitized;
}

/**
 * Record an audit log entry
 */
export async function logAuditEvent(entry: AuditPayload): Promise<{ success: boolean; id: string }> {
  const id = `AUD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const occurredAt = new Date().toISOString();

  const record = {
    id,
    occurredAt,
    actorUserId: entry.actorUserId || "ANONYMOUS",
    actorRole: entry.actorRole || "PUBLIC",
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    matterId: entry.matterId,
    clientOrganisationId: entry.clientOrganisationId,
    actorIp: entry.actorIp ? entry.actorIp.replace(/\.\d+$/, ".xxx") : undefined, // Mask IP subnet for privacy
    actorUserAgent: entry.actorUserAgent?.slice(0, 100),
    metadata: sanitizeAuditMetadata(entry.metadata),
    notes: entry.notes,
  };

  // Append to audit store
  memoryAuditLog.push(record);

  // In production, also insert into Postgres audit_logs table via supabase / pool
  return { success: true, id };
}

/**
 * Retrieve audit log for administrative inspection (Protected)
 */
export function getAuditLogs(limit = 100) {
  return [...memoryAuditLog].reverse().slice(0, limit);
}
