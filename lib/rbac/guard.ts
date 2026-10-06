// ============================================================
// RBAC GUARD — Server-side Permission Enforcement
// Private Intelligence & Investigations Platform
// ============================================================
// Use these utilities in Server Actions and Route Handlers.
// NEVER use these in client components for security decisions.

import { Permission } from "./permissions";
import type { AdminSession } from "@/lib/auth/types";

/**
 * Returns true if the session has the specified permission.
 * Never throws — use hasPermission for conditional checks.
 */
export function hasPermission(
  session: AdminSession,
  permission: Permission
): boolean {
  return session.permissions.includes(permission);
}

/**
 * Returns true if the session has ANY of the specified permissions.
 */
export function hasAnyPermission(
  session: AdminSession,
  permissions: Permission[]
): boolean {
  return permissions.some((p) => session.permissions.includes(p));
}

/**
 * Returns true if the session has ALL of the specified permissions.
 */
export function hasAllPermissions(
  session: AdminSession,
  permissions: Permission[]
): boolean {
  return permissions.every((p) => session.permissions.includes(p));
}

/**
 * Throws a structured 403 error if the session lacks the permission.
 * Use in Server Actions and Route Handlers to enforce access.
 *
 * @throws { code: 403, message: string }
 */
export function requirePermission(
  session: AdminSession,
  permission: Permission
): void {
  if (!hasPermission(session, permission)) {
    throw {
      code: 403,
      message: `Access denied. Required permission: ${permission}`,
      permission,
    };
  }
}

/**
 * Throws if the session lacks any of the required permissions.
 */
export function requireAnyPermission(
  session: AdminSession,
  permissions: Permission[]
): void {
  if (!hasAnyPermission(session, permissions)) {
    throw {
      code: 403,
      message: `Access denied. Required one of: ${permissions.join(", ")}`,
      permissions,
    };
  }
}

/**
 * Case-level access check — future-ready for row-level restrictions.
 *
 * TODO: When database is connected, replace with a DB query that checks:
 * - Is the user assigned to this case (MatterUser)?
 * - Does the user have global access or only assigned-case access?
 *
 * For now, falls back to permission-level check.
 */
export async function hasCaseAccess(
  session: AdminSession,
  _caseId: string
): Promise<boolean> {
  return hasPermission(session, "cases.view" as Permission);
}

/**
 * Throws if the user does not have case-level access.
 */
export async function requireCaseAccess(
  session: AdminSession,
  caseId: string
): Promise<void> {
  const hasAccess = await hasCaseAccess(session, caseId);
  if (!hasAccess) {
    throw {
      code: 403,
      message: `Access denied to case: ${caseId}`,
      caseId,
    };
  }
}

/**
 * Returns a safe 403 response object for Route Handlers.
 */
export function forbidden(detail?: string): Response {
  return Response.json(
    {
      error: "FORBIDDEN",
      message: detail ?? "You do not have permission to perform this action.",
    },
    { status: 403 }
  );
}

/**
 * Returns a safe 401 response object for Route Handlers.
 */
export function unauthorized(): Response {
  return Response.json(
    { error: "UNAUTHORIZED", message: "Authentication required." },
    { status: 401 }
  );
}
