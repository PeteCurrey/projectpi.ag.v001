// ============================================================================
// RATE LIMITING & ABUSE PROTECTION ENGINE
// Token Bucket & IP Rate Limiting for Public & Sensitive Endpoints
// ============================================================================

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Check rate limit for an identifier (e.g. client IP or user ID)
 * @param key unique identifier
 * @param maxRequests maximum allowed requests within the window
 * @param windowMs time window in milliseconds
 */
export function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 60 * 1000 // 1 minute default
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetAt) {
    const record: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitStore.set(key, record);
    return {
      success: true,
      remaining: maxRequests - 1,
      resetAt: record.resetAt,
    };
  }

  if (existing.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Clean expired keys periodically to prevent memory leaks
 */
export function purgeExpiredRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}
