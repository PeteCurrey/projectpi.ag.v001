// ============================================================
// RATE LIMITING
// Private Intelligence & Investigations Platform
// ============================================================
// In-memory rate limiter for development.
// TODO: Replace with Redis-backed implementation for production.

interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
  lockedUntil?: number;
}

const MAX_ATTEMPTS = parseInt(process.env.AUTH_MAX_FAILED_ATTEMPTS ?? "5");
const LOCKOUT_DURATION_MS =
  parseInt(process.env.AUTH_LOCKOUT_DURATION_SECONDS ?? "900") * 1000;
const WINDOW_MS = 15 * 60 * 1000; // 15-minute sliding window

// Separate stores for IP-based and email-based rate limiting
const ipStore = new Map<string, AttemptRecord>();
const emailStore = new Map<string, AttemptRecord>();

function getRecord(store: Map<string, AttemptRecord>, key: string): AttemptRecord {
  const now = Date.now();
  const existing = store.get(key);
  if (!existing || now - existing.firstAttemptAt > WINDOW_MS) {
    return { count: 0, firstAttemptAt: now };
  }
  return existing;
}

/**
 * Checks whether a login attempt should be rate-limited.
 * Checks both IP address and email address independently.
 *
 * Returns:
 *   { allowed: true } — proceed
 *   { allowed: false; lockedUntilMs: number } — locked until timestamp
 *
 * TODO: Replace in-memory store with Redis for multi-instance production.
 */
export function checkRateLimit(
  ipAddress: string,
  email: string
): { allowed: boolean; lockedUntilMs?: number } {
  const now = Date.now();

  const ipRecord = getRecord(ipStore, ipAddress);
  const emailRecord = getRecord(emailStore, email);

  // Check lockout
  if (ipRecord.lockedUntil && ipRecord.lockedUntil > now) {
    return { allowed: false, lockedUntilMs: ipRecord.lockedUntil };
  }
  if (emailRecord.lockedUntil && emailRecord.lockedUntil > now) {
    return { allowed: false, lockedUntilMs: emailRecord.lockedUntil };
  }

  return { allowed: true };
}

/**
 * Records a failed login attempt for both IP and email.
 * If the attempt limit is exceeded, applies a lockout.
 *
 * Returns the new attempt count.
 */
export function recordFailedAttempt(ipAddress: string, email: string): number {
  const now = Date.now();

  // Update IP record
  const ipRecord = getRecord(ipStore, ipAddress);
  ipRecord.count += 1;
  if (ipRecord.count >= MAX_ATTEMPTS) {
    ipRecord.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
  ipStore.set(ipAddress, ipRecord);

  // Update email record
  const emailRecord = getRecord(emailStore, email);
  emailRecord.count += 1;
  if (emailRecord.count >= MAX_ATTEMPTS) {
    emailRecord.lockedUntil = now + LOCKOUT_DURATION_MS;
  }
  emailStore.set(email, emailRecord);

  return Math.max(ipRecord.count, emailRecord.count);
}

/**
 * Clears rate limit records on successful authentication.
 */
export function clearRateLimit(ipAddress: string, email: string): void {
  ipStore.delete(ipAddress);
  emailStore.delete(email);
}

/**
 * Returns whether a given IP or email is currently locked out.
 */
export function isLockedOut(ipAddress: string, email: string): boolean {
  const { allowed } = checkRateLimit(ipAddress, email);
  return !allowed;
}
