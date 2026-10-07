// ============================================================
// MFA — TOTP Implementation
// TFTS — Tactical Field Intelligence Service
// ============================================================
// Time-based One-Time Passwords compatible with Google Authenticator,
// Authy, 1Password, and other TOTP apps.
// Server-side only.

import { generateSecret, generateURI, verifySync } from "otplib";
import { randomBytes, createHash } from "crypto";
import { BRAND_PREFERRED } from "@/lib/config/brand";

const MFA_ISSUER = process.env.MFA_ISSUER ?? BRAND_PREFERRED;
const BACKUP_CODE_COUNT = 10;

/**
 * Generates a new TOTP secret for user enrollment.
 * Store this secret encrypted in the database.
 * Display the QR code URI to the user only during setup.
 *
 * TODO: When DB is connected, encrypt the secret before storage.
 */
export function generateTOTPSecret(userEmail: string): {
  secret: string;
  qrCodeUri: string;
  manualEntryKey: string;
} {
  const secret = generateSecret({ length: 20 });
  const qrCodeUri = generateURI({
    issuer: MFA_ISSUER,
    label: userEmail,
    secret,
  });
  // Format for manual entry: groups of 4 characters
  const manualEntryKey = secret.match(/.{1,4}/g)?.join(" ") ?? secret;

  return { secret, qrCodeUri, manualEntryKey };
}

/**
 * Verifies a 6-digit TOTP code against the user's secret.
 * Returns true if valid.
 *
 * TODO: When DB is connected, retrieve the stored encrypted secret.
 */
export function verifyTOTPCode(secret: string, code: string): boolean {
  try {
    const result = verifySync({
      secret,
      token: code.replace(/\s/g, ""),
      epochTolerance: 30, // 30s window drift
    });
    return typeof result === "object" ? result.valid : Boolean(result);
  } catch {
    return false;
  }
}

/**
 * Generates backup codes for account recovery.
 * Returns both the plaintext codes (show to user ONCE) and their hashes (store in DB).
 *
 * TODO: When DB is connected, store only the hashes.
 */
export function generateBackupCodes(): {
  plaintext: string[];
  hashes: string[];
} {
  const codes: string[] = [];
  const hashes: string[] = [];

  for (let i = 0; i < BACKUP_CODE_COUNT; i++) {
    const code = randomBytes(5).toString("hex").toUpperCase();
    // Format as XXXXX-XXXXX for readability
    const formatted = `${code.slice(0, 5)}-${code.slice(5)}`;
    codes.push(formatted);
    hashes.push(createHash("sha256").update(formatted).digest("hex"));
  }

  return { plaintext: codes, hashes };
}

/**
 * Verifies a backup code against stored hashes.
 * Returns the index of the used code (so it can be marked as consumed), or -1 if invalid.
 *
 * TODO: When DB is connected, mark the used code as consumed in the DB.
 */
export function verifyBackupCode(
  code: string,
  storedHashes: string[]
): number {
  const hash = createHash("sha256")
    .update(code.toUpperCase().replace(/\s/g, ""))
    .digest("hex");

  return storedHashes.findIndex((h) => h === hash);
}
