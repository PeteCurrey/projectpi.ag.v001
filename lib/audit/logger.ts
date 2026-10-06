// ============================================================
// AUDIT LOGGER
// Private Intelligence & Investigations Platform
// ============================================================
// Append-only audit event creation.
// NO update/delete methods — intentional.
// Server-side only.

import type { AuditEvent, AuditEventType } from "./events";
import { getEventSeverity } from "./events";
import { randomBytes } from "crypto";

function generateAuditId(): string {
  return `aud_${randomBytes(12).toString("hex")}`;
}

export interface LogAuditEventParams {
  eventType: AuditEventType;
  actorUserId?: string;
  actorName?: string;
  actorIp?: string;
  actorUserAgent?: string;
  entityType?: string;
  entityId?: string;
  entityReference?: string;
  matterId?: string;
  clientOrganisationId?: string;
  description: string;
  previousState?: Record<string, unknown>;
  newState?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

/**
 * Creates and persists an immutable audit log entry.
 *
 * TODO: Replace the console.debug stub with a real DB insert.
 * The insert must be:
 *   - Append-only (no UPDATE/DELETE on audit_log table)
 *   - Outside any transaction that might roll back on error
 *   - Written to a separate audit schema if using RLS
 *
 * The function is intentionally non-throwing — audit failures
 * must not interrupt the primary operation.
 */
export async function logAuditEvent(params: LogAuditEventParams): Promise<void> {
  const event: AuditEvent = {
    id: generateAuditId(),
    eventType: params.eventType,
    severity: getEventSeverity(params.eventType),
    actorUserId: params.actorUserId,
    actorName: params.actorName,
    actorIp: params.actorIp,
    actorUserAgent: params.actorUserAgent,
    entityType: params.entityType,
    entityId: params.entityId,
    entityReference: params.entityReference,
    matterId: params.matterId,
    clientOrganisationId: params.clientOrganisationId,
    description: params.description,
    previousState: params.previousState,
    newState: params.newState,
    metadata: params.metadata,
    occurredAt: new Date(),
  };

  try {
    // TODO: await db.auditLog.create({ data: event });
    // Stub: log to server console in development only
    if (process.env.NODE_ENV !== "production") {
      console.debug(
        `[AUDIT] ${event.severity} | ${event.eventType} | ${event.actorName ?? "SYSTEM"} | ${event.description}`
      );
    }
  } catch (err) {
    // Log audit failures to server error log but do NOT propagate
    console.error("[AUDIT] Failed to write audit event:", event.eventType, err);
  }
}

/**
 * Convenience: Log an authentication event.
 */
export async function logAuthEvent(
  eventType: AuditEventType,
  opts: {
    actorUserId?: string;
    actorName?: string;
    email?: string;
    ipAddress?: string;
    userAgent?: string;
    description: string;
  }
): Promise<void> {
  return logAuditEvent({
    eventType,
    actorUserId: opts.actorUserId,
    actorName: opts.actorName ?? opts.email,
    actorIp: opts.ipAddress,
    actorUserAgent: opts.userAgent,
    entityType: "USER",
    description: opts.description,
    metadata: opts.email ? { email: opts.email } : undefined,
  });
}

/**
 * Convenience: Log a case access event.
 */
export async function logCaseAccess(
  session: { userId: string; name: string },
  caseId: string,
  caseReference: string
): Promise<void> {
  return logAuditEvent({
    eventType: "CASE_ACCESSED",
    actorUserId: session.userId,
    actorName: session.name,
    entityType: "CASE",
    entityId: caseId,
    entityReference: caseReference,
    matterId: caseId,
    description: `Case ${caseReference} accessed by ${session.name}`,
  });
}

/**
 * Convenience: Log an evidence download event.
 */
export async function logEvidenceDownload(
  session: { userId: string; name: string },
  evidenceId: string,
  evidenceTitle: string,
  caseId: string
): Promise<void> {
  return logAuditEvent({
    eventType: "EVIDENCE_DOWNLOADED",
    actorUserId: session.userId,
    actorName: session.name,
    entityType: "EVIDENCE",
    entityId: evidenceId,
    entityReference: evidenceTitle,
    matterId: caseId,
    description: `Evidence "${evidenceTitle}" downloaded by ${session.name}`,
  });
}

/**
 * Convenience: Log a data export event.
 */
export async function logExport(
  session: { userId: string; name: string },
  exportType: "EXPORT_PDF" | "EXPORT_CSV" | "EXPORT_ZIP_EVIDENCE" | "EXPORT_BULK",
  entityReference: string,
  entityType?: string
): Promise<void> {
  return logAuditEvent({
    eventType: exportType,
    actorUserId: session.userId,
    actorName: session.name,
    entityType,
    entityReference,
    description: `${exportType.replace("EXPORT_", "")} export of "${entityReference}" by ${session.name}`,
  });
}
