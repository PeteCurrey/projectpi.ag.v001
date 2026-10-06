// ============================================================
// API ROUTE HANDLER WRAPPER
// Private Intelligence & Investigations Platform
// ============================================================
// Enforces auth, permissions, request limits, and audit logging
// on all admin Route Handlers.

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import type { AdminSession } from "@/lib/auth/types";
import type { Permission } from "@/lib/rbac/permissions";
import { hasAllPermissions } from "@/lib/rbac/guard";
import { logAuditEvent } from "@/lib/audit/logger";

const MAX_REQUEST_BODY_BYTES = 10 * 1024 * 1024; // 10 MB default

type RouteHandler = (
  req: NextRequest,
  session: AdminSession,
  params?: Record<string, string>
) => Promise<NextResponse | Response>;

interface WithAdminAuthOptions {
  /** Required permissions — user must have ALL of these */
  permissions?: Permission[];
  /** Override max request body size in bytes */
  maxBodyBytes?: number;
  /** Whether to log this route access to the audit log */
  audit?: boolean;
}

/**
 * Wraps a Route Handler with:
 * - Session verification (401 if unauthenticated)
 * - Permission check (403 if insufficient role)
 * - Request size limit
 * - Structured error responses
 * - Optional audit logging
 *
 * Usage:
 * ```ts
 * export const GET = withAdminAuth(
 *   { permissions: ['cases.view'] },
 *   async (req, session) => {
 *     // ... handler
 *   }
 * );
 * ```
 */
export function withAdminAuth(
  options: WithAdminAuthOptions,
  handler: RouteHandler
): (req: NextRequest, context?: { params: Record<string, string> }) => Promise<Response> {
  return async (req: NextRequest, context?: { params: Record<string, string> }) => {
    // 1. Session verification
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Permission check
    if (options.permissions && options.permissions.length > 0) {
      if (!hasAllPermissions(session, options.permissions)) {
        await logAuditEvent({
          eventType: "RECORD_VIEWED",
          actorUserId: session.userId,
          actorName: session.name,
          description: `Forbidden access attempt to ${req.nextUrl.pathname}`,
          metadata: {
            required: options.permissions,
            granted: session.permissions,
            method: req.method,
            path: req.nextUrl.pathname,
          },
        });
        return NextResponse.json(
          { error: "FORBIDDEN", message: "You do not have permission to perform this action." },
          { status: 403 }
        );
      }
    }

    // 3. Request size limit
    const contentLength = req.headers.get("content-length");
    const maxBytes = options.maxBodyBytes ?? MAX_REQUEST_BODY_BYTES;
    if (contentLength && parseInt(contentLength) > maxBytes) {
      return NextResponse.json(
        { error: "PAYLOAD_TOO_LARGE", message: "Request body exceeds the maximum permitted size." },
        { status: 413 }
      );
    }

    // 4. Execute handler
    try {
      return await handler(req, session, context?.params);
    } catch (err: unknown) {
      const error = err as { code?: number; message?: string };

      // Permission errors from guard.ts
      if (error?.code === 403) {
        return NextResponse.json(
          { error: "FORBIDDEN", message: error.message ?? "Access denied." },
          { status: 403 }
        );
      }

      // Unknown errors — never leak internals
      console.error("[API] Unhandled error in admin route:", req.nextUrl.pathname, err);
      return NextResponse.json(
        { error: "INTERNAL_ERROR", message: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  };
}

/**
 * Validates that client-supplied IDs match the expected format.
 * Never trust client-supplied IDs without format validation.
 *
 * @param id - The ID to validate
 * @param prefix - Expected prefix (e.g. "usr", "mat", "evi")
 */
export function validateId(id: unknown, prefix?: string): id is string {
  if (typeof id !== "string" || id.length === 0 || id.length > 128) return false;
  if (prefix && !id.startsWith(`${prefix}_`)) return false;
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

/**
 * Returns a structured error response. Use in Route Handlers.
 */
export function apiError(
  code: number,
  error: string,
  message: string
): NextResponse {
  return NextResponse.json({ error, message }, { status: code });
}

/**
 * Returns a structured success response.
 */
export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ data }, { status });
}
