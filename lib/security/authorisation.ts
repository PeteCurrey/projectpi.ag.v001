// ============================================================================
// SERVER-SIDE AUTHORISATION & ACCESS CONTROL ENGINE
// Object-Level & Row-Level Authorization Rules
// ============================================================================

import { UserRole, Visibility } from "@/lib/db/types";
import { logAuditEvent } from "./audit";

export interface AuthContext {
  userId: string;
  role: UserRole;
  clientOrganisationId?: string;
  assignedMatterIds?: string[];
}

export type AccessDecision = {
  authorized: boolean;
  reason?: string;
};

/**
 * Authorize access to a specific Matter.
 * Enforces Client Organisation Isolation and Investigator Assignment.
 */
export async function authorizeMatterAccess(
  context: AuthContext,
  matter: {
    id: string;
    clientOrganisationId: string;
  }
): Promise<AccessDecision> {
  // 1. Super Admins and Admins have full administrative oversight
  if (context.role === "SUPER_ADMIN" || context.role === "ADMIN") {
    return { authorized: true };
  }

  // 2. Client Users & Client Admins: MUST match clientOrganisationId
  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (!context.clientOrganisationId) {
      await logAuditEvent({
        actorUserId: context.userId,
        actorRole: context.role,
        action: "PERMISSION_DENIED",
        matterId: matter.id,
        notes: "Client user has no active organisation membership",
      });
      return { authorized: false, reason: "No active client organisation membership" };
    }

    if (context.clientOrganisationId !== matter.clientOrganisationId) {
      // Cross-tenant access attempt (IDOR attack)
      await logAuditEvent({
        actorUserId: context.userId,
        actorRole: context.role,
        action: "PERMISSION_DENIED",
        matterId: matter.id,
        clientOrganisationId: context.clientOrganisationId,
        notes: "Cross-tenant matter access rejected: Client Org A attempted to access Client Org B",
      });
      return {
        authorized: false,
        reason: "Access denied: matter does not belong to your organisation",
      };
    }

    return { authorized: true };
  }

  // 3. Investigators: MUST be assigned to the matter
  if (context.role === "INVESTIGATOR") {
    const isAssigned = context.assignedMatterIds?.includes(matter.id);
    if (!isAssigned) {
      await logAuditEvent({
        actorUserId: context.userId,
        actorRole: context.role,
        action: "PERMISSION_DENIED",
        matterId: matter.id,
        notes: "Investigator attempted to access unassigned matter",
      });
      return {
        authorized: false,
        reason: "Access denied: investigator is not assigned to this matter",
      };
    }
    return { authorized: true };
  }

  // 4. Case Manager: Authorized across assigned portfolio
  if (context.role === "CASE_MANAGER") {
    return { authorized: true };
  }

  return { authorized: false, reason: "Unauthorized role" };
}

/**
 * Authorize access to a specific Matter Document or Evidence Item.
 * Enforces Document Visibility & Client Organisation Isolation.
 */
export async function authorizeDocumentAccess(
  context: AuthContext,
  document: {
    id: string;
    matterId: string;
    clientOrganisationId: string;
    visibility: Visibility;
  }
): Promise<AccessDecision> {
  // First verify matter-level access
  const matterAuth = await authorizeMatterAccess(context, {
    id: document.matterId,
    clientOrganisationId: document.clientOrganisationId,
  });

  if (!matterAuth.authorized) {
    return matterAuth;
  }

  // If user is Client, the document MUST be explicitly marked 'CLIENT_VISIBLE'
  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (document.visibility !== "CLIENT_VISIBLE") {
      await logAuditEvent({
        actorUserId: context.userId,
        actorRole: context.role,
        action: "PERMISSION_DENIED",
        entityType: "DOCUMENT",
        entityId: document.id,
        matterId: document.matterId,
        notes: `Client attempted to access internal document with visibility: ${document.visibility}`,
      });
      return {
        authorized: false,
        reason: "Access denied: document is restricted to internal staff",
      };
    }
  }

  return { authorized: true };
}

/**
 * Authorize access to a Matter Report.
 * Enforces Status === 'DELIVERED' for clients.
 */
export async function authorizeReportAccess(
  context: AuthContext,
  report: {
    id: string;
    matterId: string;
    clientOrganisationId: string;
    status: string; // 'DRAFT' | 'INTERNAL_REVIEW' | 'APPROVED' | 'DELIVERED'
  }
): Promise<AccessDecision> {
  const matterAuth = await authorizeMatterAccess(context, {
    id: report.matterId,
    clientOrganisationId: report.clientOrganisationId,
  });

  if (!matterAuth.authorized) {
    return matterAuth;
  }

  // If Client, report MUST be DELIVERED. Drafts are internal only.
  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (report.status !== "DELIVERED") {
      await logAuditEvent({
        actorUserId: context.userId,
        actorRole: context.role,
        action: "PERMISSION_DENIED",
        entityType: "REPORT",
        entityId: report.id,
        matterId: report.matterId,
        notes: `Client attempted to access non-delivered report status: ${report.status}`,
      });
      return {
        authorized: false,
        reason: "Access denied: report is not in delivered status",
      };
    }
  }

  return { authorized: true };
}

/**
 * Authorize Admin / Directorate access.
 */
export function authorizeAdminAccess(context: AuthContext): AccessDecision {
  if (context.role === "ADMIN" || context.role === "SUPER_ADMIN") {
    return { authorized: true };
  }

  return {
    authorized: false,
    reason: "Access denied: administrative privileges required",
  };
}
