// ============================================================================
// SECURE FILE STORAGE & UPLOAD VALIDATION ENGINE
// Private Storage, MIME Validation, Path Traversal Prevention
// ============================================================================

import { randomUUID } from "crypto";

export const ALLOWED_MIME_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/msword": [".doc"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/zip": [".zip"],
};

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  sanitizedFilename?: string;
  storageKey?: string;
}

/**
 * Validate upload payload against strict security rules
 */
export function validateUploadFile(
  originalFilename: string,
  mimeType: string,
  sizeBytes: number,
  targetContext: { matterId?: string; enquiryRef?: string }
): FileValidationResult {
  // 1. File size check
  if (sizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File exceeds maximum allowed size of ${MAX_FILE_SIZE_BYTES / (1024 * 1024)}MB`,
    };
  }

  // 2. MIME type whitelist check
  const allowedExtensions = ALLOWED_MIME_TYPES[mimeType.toLowerCase()];
  if (!allowedExtensions) {
    return {
      valid: false,
      error: `Unsupported or prohibited file MIME type: ${mimeType}`,
    };
  }

  // 3. Extension check (prevent disguised executables)
  const extMatch = originalFilename.match(/\.[a-zA-Z0-9]+$/);
  if (!extMatch) {
    return { valid: false, error: "File must have an explicit file extension" };
  }
  const ext = extMatch[0].toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return {
      valid: false,
      error: `File extension '${ext}' does not match MIME type '${mimeType}'`,
    };
  }

  // 4. Sanitize original filename (prevent path traversal / script execution)
  const baseName = originalFilename
    .replace(/^.*[\\\/]/, "") // strip directory components
    .replace(/[^a-zA-Z0-9._-]/g, "_") // strip special chars
    .slice(0, 100);

  // 5. Generate secure, unpredictable storage key
  // Format: private/{scope}/{opaque-id}/docs/{uuid}{ext}
  const opaqueFileId = randomUUID();
  const folder = targetContext.matterId
    ? `matter/${targetContext.matterId}`
    : targetContext.enquiryRef
    ? `enquiry/${targetContext.enquiryRef}`
    : "staging";

  const storageKey = `private/${folder}/docs/${opaqueFileId}${ext}`;

  return {
    valid: true,
    sanitizedFilename: baseName,
    storageKey,
  };
}

/**
 * Generate a time-limited signed URL structure for a private storage key
 */
export function generateTemporaryDownloadDescriptor(
  storageKey: string,
  expiresInSeconds = 300 // 5 minutes default
) {
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
  return {
    storageKey,
    expiresAt,
    temporaryToken: randomUUID(),
  };
}
