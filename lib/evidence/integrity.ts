// ============================================================
// EVIDENCE INTEGRITY
// Private Intelligence & Investigations Platform
// ============================================================
// Cryptographic hash verification for evidence chain of custody.
// Server-side only.

import { createHash } from "crypto";

export type IntegrityStatus =
  | "VERIFIED"      // Hash matches stored value
  | "TAMPERED"      // Hash mismatch — integrity breach
  | "UNAVAILABLE"   // Could not retrieve file for verification
  | "UNVERIFIED";   // No hash stored yet

export interface ChainOfCustodyEvent {
  id: string;
  evidenceId: string;
  eventType:
    | "UPLOADED"
    | "VERIFIED"
    | "DOWNLOADED"
    | "TRANSFERRED"
    | "ANNOTATED"
    | "INTEGRITY_CHECK_PASSED"
    | "INTEGRITY_CHECK_FAILED"
    | "LEGAL_HOLD_APPLIED";
  actorUserId: string;
  actorName: string;
  description: string;
  integrityHash?: string;
  occurredAt: Date;
  metadata?: Record<string, unknown>;
}

/**
 * Computes the SHA-256 hash of a file buffer.
 * Called immediately after upload — before storage.
 * The hash is stored alongside the file reference; the original
 * file must never be modified.
 */
export function computeHash(buffer: Buffer | ArrayBuffer): string {
  const buf = buffer instanceof ArrayBuffer ? Buffer.from(buffer) : buffer;
  return createHash("sha256").update(buf).digest("hex");
}

/**
 * Verifies the integrity of an evidence file by comparing its
 * current hash against the stored hash.
 *
 * TODO: When file storage is connected, retrieve the file content
 * via a private signed URL and compute the hash here.
 *
 * @param storedHash - The SHA-256 hex string recorded at upload time
 * @param currentBuffer - The current file content (retrieved from storage)
 */
export function verifyIntegrity(
  storedHash: string,
  currentBuffer: Buffer
): IntegrityStatus {
  if (!storedHash) return "UNVERIFIED";
  try {
    const currentHash = computeHash(currentBuffer);
    return currentHash === storedHash ? "VERIFIED" : "TAMPERED";
  } catch {
    return "UNAVAILABLE";
  }
}

/**
 * Creates a chain-of-custody event record.
 * All custody events are append-only — corrections create new entries.
 *
 * TODO: Persist to database in an append-only custody_events table.
 */
export function createCustodyEvent(
  params: Omit<ChainOfCustodyEvent, "id" | "occurredAt">
): ChainOfCustodyEvent {
  const { randomBytes } = require("crypto") as typeof import("crypto");
  return {
    ...params,
    id: `cust_${randomBytes(8).toString("hex")}`,
    occurredAt: new Date(),
  };
}

/**
 * Validates that an uploaded evidence file meets minimum requirements
 * before it is accepted and stored.
 *
 * Returns a list of validation errors (empty = valid).
 */
export function validateEvidenceUpload(params: {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  maxSizeBytes?: number;
}): string[] {
  const errors: string[] = [];
  const MAX_SIZE = params.maxSizeBytes ?? 500 * 1024 * 1024; // 500 MB default

  // Allowed MIME types for evidence
  const ALLOWED_MIME_TYPES = new Set([
    "image/jpeg", "image/png", "image/gif", "image/webp", "image/tiff",
    "video/mp4", "video/quicktime", "video/avi", "video/webm",
    "audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "text/csv",
  ]);

  if (params.sizeBytes > MAX_SIZE) {
    errors.push(`File exceeds maximum size of ${Math.round(MAX_SIZE / 1024 / 1024)} MB`);
  }

  if (!ALLOWED_MIME_TYPES.has(params.mimeType)) {
    errors.push(`File type "${params.mimeType}" is not permitted for evidence upload`);
  }

  if (!params.filename || params.filename.length > 255) {
    errors.push("Invalid filename");
  }

  return errors;
}
