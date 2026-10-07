// ============================================================
// SESSION MANAGEMENT
// Private Intelligence & Investigations Platform
// ============================================================
// Server-side only. Uses jose for Edge-compatible JWT operations.

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { AdminSession, AdminSessionPayload } from "./types";

const COOKIE_NAME = process.env.SESSION_COOKIE_NAME ?? "pi_session";
const SESSION_EXPIRY_SECONDS = parseInt(
  process.env.SESSION_EXPIRY_SECONDS ?? "28800" // 8 hours
);

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("AUTH_SECRET environment variable is not set. Cannot create sessions in production.");
    }
    // Development fallback — insecure, clearly marked
    console.warn("[AUTH] WARNING: AUTH_SECRET not set. Using insecure development secret.");
    return new TextEncoder().encode("INSECURE_DEV_SECRET_DO_NOT_USE_IN_PRODUCTION_32B");
  }
  return new TextEncoder().encode(secret);
}

/** Generate a cryptographically random session ID. */
function generateSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Creates a signed session JWT and sets it as an HttpOnly cookie.
 * Call this after successful authentication (and MFA if required).
 */
export async function createSession(payload: Omit<AdminSessionPayload, "sessionId">): Promise<string> {
  const sessionId = generateSessionId();
  const secret = getSecret();
  const now = Math.floor(Date.now() / 1000);

  const token = await new SignJWT({
    ...payload,
    sessionId,
    sub: payload.sub,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + SESSION_EXPIRY_SECONDS)
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_EXPIRY_SECONDS,
  });

  return sessionId;
}

/**
 * Verifies the session cookie and returns a hydrated AdminSession.
 * Returns null if the session is invalid, expired, or absent.
 * Use in Server Components and Route Handlers.
 */
export async function getSession(): Promise<AdminSession | null> {
  // Development bypass when no AUTH_SECRET
  if (!process.env.AUTH_SECRET && process.env.NODE_ENV !== "production") {
    return DEV_SESSION;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    const p = payload as unknown as AdminSessionPayload;

    return {
      userId: p.sub,
      name: p.name,
      email: p.email,
      role: p.role,
      permissions: p.permissions,
      mfaVerified: p.mfaVerified,
      sessionId: p.sessionId,
      issuedAt: new Date((p.iat ?? 0) * 1000),
      expiresAt: new Date((p.exp ?? 0) * 1000),
    };
  } catch {
    return null;
  }
}

/**
 * Clears the session cookie.
 * Call from the logout Route Handler.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Updates the session to mark MFA as verified.
 * Replaces the existing cookie with a new token that has mfaVerified: true.
 *
 * TODO: Connect to session deny-list in DB for full revocation support.
 */
export async function markMfaVerified(existingPayload: AdminSessionPayload): Promise<void> {
  await createSession({ ...existingPayload, mfaVerified: true });
}

// ──────────────────────────────────────────────────────────────
// Development fixture session — bypasses auth when AUTH_SECRET absent
// Never reached in production.
// ──────────────────────────────────────────────────────────────
import { ALL_PERMISSIONS } from "@/lib/rbac/permissions";

const DEV_SESSION: AdminSession = {
  userId: "usr-dev-001",
  name: "Development User",
  email: "dev@tfts.co.uk",
  role: "SUPER_ADMIN",
  permissions: ALL_PERMISSIONS,
  mfaVerified: true,
  sessionId: "dev-session-0000",
  issuedAt: new Date(),
  expiresAt: new Date(Date.now() + 28800 * 1000),
};
