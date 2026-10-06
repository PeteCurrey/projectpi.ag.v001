// ============================================================
// AUTH TYPES
// Private Intelligence & Investigations Platform
// ============================================================
// Server-side only. Never import into client components.

import type { AdminRole } from "@/lib/rbac/roles";
import type { Permission } from "@/lib/rbac/permissions";

/** The payload embedded in the signed session JWT. */
export interface AdminSessionPayload {
  /** JWT subject — the user's internal ID */
  sub: string;
  /** User's display name */
  name: string;
  /** User's email address */
  email: string;
  /** Resolved admin role */
  role: AdminRole;
  /** Resolved permission set at time of login */
  permissions: Permission[];
  /** Whether the user has completed MFA for this session */
  mfaVerified: boolean;
  /** Unique session identifier — used for revocation */
  sessionId: string;
  /** JWT standard: issued at (Unix seconds) */
  iat?: number;
  /** JWT standard: expires at (Unix seconds) */
  exp?: number;
}

/** Hydrated session object used by server components and route handlers. */
export interface AdminSession {
  userId: string;
  name: string;
  email: string;
  role: AdminRole;
  permissions: Permission[];
  mfaVerified: boolean;
  sessionId: string;
  issuedAt: Date;
  expiresAt: Date;
}

/** Result of a login attempt — returned from the login server action. */
export type LoginResult =
  | { success: true; requiresMfa: boolean }
  | { success: false; error: "INVALID_CREDENTIALS" | "ACCOUNT_LOCKED" | "ACCOUNT_INACTIVE" | "RATE_LIMITED" };

/** MFA challenge result. */
export type MfaResult =
  | { success: true }
  | { success: false; error: "INVALID_CODE" | "CODE_EXPIRED" | "MAX_ATTEMPTS_EXCEEDED" };

/** Active session record as stored/retrieved for session management. */
export interface SessionRecord {
  sessionId: string;
  userId: string;
  createdAt: Date;
  expiresAt: Date;
  lastActiveAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceDescription?: string;
  isRevoked: boolean;
  revokedAt?: Date;
  revokedReason?: string;
}

/** Failed login record for security monitoring. */
export interface LoginAttempt {
  id: string;
  email: string;
  ipAddress: string;
  userAgent?: string;
  outcome: "SUCCESS" | "FAILED_PASSWORD" | "FAILED_MFA" | "ACCOUNT_LOCKED" | "RATE_LIMITED";
  attemptedAt: Date;
}
