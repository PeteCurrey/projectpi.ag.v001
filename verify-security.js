// Self-contained security test runner for direct verification
const { randomUUID } = require("crypto");

console.log("============================================================");
console.log("EXECUTING PI PLATFORM ADVERSARIAL SECURITY VERIFICATION SUITE");
console.log("============================================================\n");

const results = [];

// ============================================================================
// LOGIC IMPLEMENTATION MIRRORS
// ============================================================================
function sanitizeAuditMetadata(metadata) {
  if (!metadata) return {};
  const sanitized = { ...metadata };
  const sensitiveKeys = [
    "narrative",
    "description",
    "password",
    "token",
    "secret",
    "email",
    "phone",
    "telephone",
    "address",
    "subjectname",
    "contactname",
  ];
  for (const key of Object.keys(sanitized)) {
    const k = key.toLowerCase();
    if (sensitiveKeys.some((s) => k.includes(s))) {
      sanitized[key] = "[REDACTED]";
    }
  }
  return sanitized;
}

function authorizeMatterAccess(context, matter) {
  if (context.role === "SUPER_ADMIN" || context.role === "ADMIN") {
    return { authorized: true };
  }
  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (!context.clientOrganisationId) {
      return { authorized: false, reason: "No active client organisation membership" };
    }
    if (context.clientOrganisationId !== matter.clientOrganisationId) {
      return {
        authorized: false,
        reason: "Access denied: matter does not belong to your organisation (IDOR prevention)",
      };
    }
    return { authorized: true };
  }
  if (context.role === "INVESTIGATOR") {
    const isAssigned = context.assignedMatterIds && context.assignedMatterIds.includes(matter.id);
    if (!isAssigned) {
      return {
        authorized: false,
        reason: "Access denied: investigator is not assigned to this matter",
      };
    }
    return { authorized: true };
  }
  if (context.role === "CASE_MANAGER") {
    return { authorized: true };
  }
  return { authorized: false, reason: "Unauthorized role" };
}

function authorizeDocumentAccess(context, document) {
  const matterAuth = authorizeMatterAccess(context, {
    id: document.matterId,
    clientOrganisationId: document.clientOrganisationId,
  });
  if (!matterAuth.authorized) return matterAuth;

  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (document.visibility !== "CLIENT_VISIBLE") {
      return {
        authorized: false,
        reason: "Access denied: document is internal only",
      };
    }
  }
  return { authorized: true };
}

function authorizeReportAccess(context, report) {
  const matterAuth = authorizeMatterAccess(context, {
    id: report.matterId,
    clientOrganisationId: report.clientOrganisationId,
  });
  if (!matterAuth.authorized) return matterAuth;

  if (context.role === "CLIENT" || context.role === "CLIENT_ADMIN") {
    if (report.status !== "DELIVERED") {
      return {
        authorized: false,
        reason: "Access denied: report is not in delivered status (drafts hidden)",
      };
    }
  }
  return { authorized: true };
}

function authorizeAdminAccess(context) {
  if (context.role === "ADMIN" || context.role === "SUPER_ADMIN") {
    return { authorized: true };
  }
  return { authorized: false, reason: "Administrative role required" };
}

const ALLOWED_MIME_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "application/msword": [".doc"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "application/zip": [".zip"],
};

function validateUploadFile(originalFilename, mimeType, sizeBytes, targetContext) {
  if (sizeBytes > 25 * 1024 * 1024) {
    return { valid: false, error: "File exceeds maximum allowed size" };
  }
  const allowedExtensions = ALLOWED_MIME_TYPES[mimeType.toLowerCase()];
  if (!allowedExtensions) {
    return { valid: false, error: `Unsupported MIME type: ${mimeType}` };
  }
  const extMatch = originalFilename.match(/\.[a-zA-Z0-9]+$/);
  if (!extMatch) return { valid: false, error: "Missing file extension" };
  const ext = extMatch[0].toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return { valid: false, error: "Extension mismatch with MIME type" };
  }
  const baseName = originalFilename
    .replace(/^.*[\\\/]/, "")
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 100);
  const opaqueFileId = randomUUID();
  const folder = targetContext.matterId ? `matter/${targetContext.matterId}` : "staging";
  return {
    valid: true,
    sanitizedFilename: baseName,
    storageKey: `private/${folder}/docs/${opaqueFileId}${ext}`,
  };
}

const rateLimitStore = new Map();
function checkRateLimit(key, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);
  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: maxRequests - 1 };
  }
  if (existing.count >= maxRequests) {
    return { success: false, remaining: 0 };
  }
  existing.count += 1;
  return { success: true, remaining: maxRequests - existing.count };
}

// ============================================================================
// RUN ADVERSARIAL TESTS
// ============================================================================

// 1. Client Organisation Isolation
const clientA = { userId: "usr-a", role: "CLIENT", clientOrganisationId: "org-a" };
const clientB = { userId: "usr-b", role: "CLIENT", clientOrganisationId: "org-b" };
const matterA = { id: "mat-a-1", clientOrganisationId: "org-a" };
const matterB = { id: "mat-b-1", clientOrganisationId: "org-b" };

results.push({
  suite: "Client Org Isolation",
  test: "Client A -> Matter A (Own Org)",
  passed: authorizeMatterAccess(clientA, matterA).authorized === true,
});

results.push({
  suite: "Client Org Isolation",
  test: "Client A -> Matter B (IDOR Cross-Tenant Attack)",
  passed: authorizeMatterAccess(clientA, matterB).authorized === false,
});

results.push({
  suite: "Client Org Isolation",
  test: "Client B -> Matter A (IDOR Cross-Tenant Attack)",
  passed: authorizeMatterAccess(clientB, matterA).authorized === false,
});

// 2. Investigator Assignment
const invA = { userId: "inv-a", role: "INVESTIGATOR", assignedMatterIds: ["mat-a-1"] };
results.push({
  suite: "Investigator Assignment",
  test: "Assigned Investigator -> Matter A",
  passed: authorizeMatterAccess(invA, matterA).authorized === true,
});

results.push({
  suite: "Investigator Assignment",
  test: "Unassigned Investigator -> Matter B (Access Denied)",
  passed: authorizeMatterAccess(invA, matterB).authorized === false,
});

// 3. Document Visibility
const docVisible = { id: "doc-1", matterId: "mat-a-1", clientOrganisationId: "org-a", visibility: "CLIENT_VISIBLE" };
const docInternal = { id: "doc-2", matterId: "mat-a-1", clientOrganisationId: "org-a", visibility: "INTERNAL_ONLY" };
const docOrgB = { id: "doc-3", matterId: "mat-b-1", clientOrganisationId: "org-b", visibility: "CLIENT_VISIBLE" };

results.push({
  suite: "Document Security",
  test: "Client A -> Client Visible Document (Matter A)",
  passed: authorizeDocumentAccess(clientA, docVisible).authorized === true,
});

results.push({
  suite: "Document Security",
  test: "Client A -> Internal Only Document (Matter A)",
  passed: authorizeDocumentAccess(clientA, docInternal).authorized === false,
});

results.push({
  suite: "Document Security",
  test: "Client A -> Document (Matter B IDOR)",
  passed: authorizeDocumentAccess(clientA, docOrgB).authorized === false,
});

// 4. Report Lifecycle
const repDraft = { id: "rep-1", matterId: "mat-a-1", clientOrganisationId: "org-a", status: "DRAFT" };
const repDelivered = { id: "rep-2", matterId: "mat-a-1", clientOrganisationId: "org-a", status: "DELIVERED" };

results.push({
  suite: "Report Lifecycle",
  test: "Client A -> Draft Report (Hidden)",
  passed: authorizeReportAccess(clientA, repDraft).authorized === false,
});

results.push({
  suite: "Report Lifecycle",
  test: "Client A -> Delivered Report (Accessible)",
  passed: authorizeReportAccess(clientA, repDelivered).authorized === true,
});

// 5. Role Escalation & Admin Boundary
results.push({
  suite: "Role Escalation",
  test: "Client Role -> Admin Area Access",
  passed: authorizeAdminAccess(clientA).authorized === false,
});

results.push({
  suite: "Role Escalation",
  test: "Investigator Role -> Admin Area Access",
  passed: authorizeAdminAccess(invA).authorized === false,
});

results.push({
  suite: "Role Escalation",
  test: "Admin Role -> Admin Area Access",
  passed: authorizeAdminAccess({ role: "ADMIN" }).authorized === true,
});

// 6. File Upload Hardening
results.push({
  suite: "File Hardening",
  test: "Legitimate PDF Upload",
  passed: validateUploadFile("court_order.pdf", "application/pdf", 500000, { matterId: "mat-1" }).valid === true,
});

results.push({
  suite: "File Hardening",
  test: "Disguised Executable (.exe as application/pdf)",
  passed: validateUploadFile("payload.exe", "application/pdf", 500000, { matterId: "mat-1" }).valid === false,
});

results.push({
  suite: "File Hardening",
  test: "Path Traversal in Filename Sanitization",
  passed: !validateUploadFile("../../../etc/shadow.pdf", "application/pdf", 500000, { matterId: "mat-1" }).sanitizedFilename.includes("/"),
});

// 7. Rate Limiting Abuse Detection
const rateIp = `ip_${Date.now()}`;
let rateLimited = false;
for (let i = 0; i < 7; i++) {
  const check = checkRateLimit(rateIp, 5, 60000);
  if (!check.success) {
    rateLimited = true;
    break;
  }
}
results.push({
  suite: "Abuse & Rate Limiting",
  test: "Public Enquiry Bursted Requests (>5/min)",
  passed: rateLimited === true,
});

// 8. Sanitized Audit Logging (PII Redaction)
const dirtyMetadata = {
  narrative: "Target was observed entering address 12 High Street",
  contactName: "John Doe",
  email: "john@example.com",
  matterType: "PROCESS_SERVING",
};
const cleanedMetadata = sanitizeAuditMetadata(dirtyMetadata);
results.push({
  suite: "Audit Redaction",
  test: "Sensitive Investigation Narrative & PII Redacted from Logs",
  passed: cleanedMetadata.narrative === "[REDACTED]" && cleanedMetadata.contactName === "[REDACTED]" && cleanedMetadata.matterType === "PROCESS_SERVING",
});

// ============================================================================
// REPORTING
// ============================================================================
for (const r of results) {
  const symbol = r.passed ? "✔ [PASS]" : "✖ [FAIL]";
  console.log(`${symbol} ${r.suite.padEnd(25)} :: ${r.test}`);
}

const total = results.length;
const passed = results.filter((r) => r.passed).length;
const failed = total - passed;

console.log("\n------------------------------------------------------------");
console.log(`TOTAL SECURITY TESTS: ${total}`);
console.log(`PASSED:               ${passed}`);
console.log(`FAILED:               ${failed}`);
console.log(`STATUS:               ${failed === 0 ? "ALL SECURITY CHECKS PASSED" : "FAILED"}`);
console.log("------------------------------------------------------------\n");

if (failed > 0) process.exit(1);
