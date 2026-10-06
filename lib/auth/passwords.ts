// ============================================================
// PASSWORD UTILITIES
// Private Intelligence & Investigations Platform
// ============================================================
// Uses Node.js built-in crypto (scrypt) — no native compilation required.
// Server-side only. Never call from client components or Edge runtime.

import { scrypt, randomBytes, timingSafeEqual } from "crypto";

const SCRYPT_PARAMS = {
  N: 16384,  // CPU/memory cost factor
  r: 8,      // Block size
  p: 1,      // Parallelisation factor
  keylen: 64, // Output key length in bytes
};

/**
 * Hashes a plaintext password using scrypt with a random salt.
 * Returns a string in the format: $scrypt$<params>$<salt>$<hash>
 *
 * TODO: When DB is connected, store this hash in the users table.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  const salt = randomBytes(32).toString("hex");
  const { N, r, p, keylen } = SCRYPT_PARAMS;
  const hash = (await new Promise<Buffer>((resolve, reject) => {
    scrypt(plaintext, salt, keylen, { N, r, p }, (err, derivedKey) => {
      if (err) reject(err);
      else resolve(derivedKey);
    });
  }));
  return `$scrypt$N=${N},r=${r},p=${p}$${salt}$${hash.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored hash.
 * Uses timing-safe comparison to prevent timing attacks.
 * Returns true if the password matches.
 *
 * TODO: When DB is connected, retrieve the stored hash and call this function.
 */
export async function verifyPassword(
  plaintext: string,
  storedHash: string
): Promise<boolean> {
  try {
    const parts = storedHash.split("$");
    // Expected format: ["", "scrypt", "N=...,r=...,p=...", salt, hash]
    if (parts.length !== 5 || parts[1] !== "scrypt") {
      return false;
    }

    const paramEntries = parts[2].split(",").map((kv) => {
      const [k, v] = kv.split("=");
      return [k, parseInt(v, 10)] as [string, number];
    });
    const params = Object.fromEntries(paramEntries);
    const salt = parts[3];
    const expectedHash = Buffer.from(parts[4], "hex");
    const keylen = expectedHash.length;

    const actualHash = await new Promise<Buffer>((resolve, reject) => {
      scrypt(plaintext, salt, keylen, { N: params.N, r: params.r, p: params.p }, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey);
      });
    });

    return timingSafeEqual(actualHash, expectedHash);
  } catch {
    return false;
  }
}

/**
 * Generates a cryptographically random password reset token.
 * Expires after a short window (typically 1 hour).
 * Store the hash of this token in the DB — not the raw token.
 */
export function generateResetToken(): { token: string; hash: string } {
  const token = randomBytes(32).toString("hex");
  const { createHash } = require("crypto");
  const hash = createHash("sha256").update(token).digest("hex");
  return { token, hash };
}

/**
 * Generates a cryptographically random temporary password for initial account setup.
 * Force-change on first login.
 */
export function generateTemporaryPassword(): string {
  // 16 random bytes → 32 hex chars. Inform user via secure channel.
  return randomBytes(16).toString("hex");
}
