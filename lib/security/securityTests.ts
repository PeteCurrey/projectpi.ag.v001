// ============================================================================
// AUTOMATED SECURITY TEST SUITE & ADVERSARIAL VERIFICATION
// Tests: Client Isolation, IDOR, Document Visibility, Report Status,
// Role Escalation, Rate Limiting, File Validation, and Sanitized Audit
// ============================================================================

import {
  authorizeMatterAccess,
  authorizeDocumentAccess,
  authorizeReportAccess,
  authorizeAdminAccess,
  AuthContext,
} from "./authorisation";
import { validateUploadFile } from "./storage";
import { checkRateLimit } from "./rateLimit";
import { logAuditEvent, getAuditLogs } from "./audit";

export interface TestResult {
  suite: string;
  testName: string;
  passed: boolean;
  scenario: string;
  details?: string;
}

export async function runSecurityTestSuite(): Promise<{
  allPassed: boolean;
  total: number;
  passedCount: number;
  failedCount: number;
  results: TestResult[];
}> {
  const results: TestResult[] = [];

  // ==========================================================================
  // FIXTURES
  // ==========================================================================
  const userClientA: AuthContext = {
    userId: "usr-client-a-1",
    role: "CLIENT",
    clientOrganisationId: "org-a",
  };

  const userClientB: AuthContext = {
    userId: "usr-client-b-1",
    role: "CLIENT",
    clientOrganisationId: "org-b",
  };

  const investigatorA: AuthContext = {
    userId: "usr-inv-a",
    role: "INVESTIGATOR",
    assignedMatterIds: ["mat-org-a-1"],
  };

  const investigatorB: AuthContext = {
    userId: "usr-inv-b",
    role: "INVESTIGATOR",
    assignedMatterIds: ["mat-org-b-1"],
  };

  const adminUser: AuthContext = {
    userId: "usr-admin-1",
    role: "ADMIN",
  };

  const matterOrgA = {
    id: "mat-org-a-1",
    clientOrganisationId: "org-a",
  };

  const matterOrgB = {
    id: "mat-org-b-1",
    clientOrganisationId: "org-b",
  };

  // ==========================================================================
  // SUITE 1: CLIENT ORGANISATION ISOLATION (CROSS-TENANT ACCESS)
  // ==========================================================================
  // Test 1.1: Client A accessing Matter A (should PASS)
  const res1_1 = await authorizeMatterAccess(userClientA, matterOrgA);
  results.push({
    suite: "Client Organisation Isolation",
    testName: "Client A accessing Matter A (Own Organisation)",
    passed: res1_1.authorized === true,
    scenario: "Client A -> Matter A = PASS",
  });

  // Test 1.2: Client A attempting to access Matter B (IDOR attack - should DENY)
  const res1_2 = await authorizeMatterAccess(userClientA, matterOrgB);
  results.push({
    suite: "Client Organisation Isolation",
    testName: "Client A accessing Matter B (Cross-Tenant IDOR Attack)",
    passed: res1_2.authorized === false,
    scenario: "Client A -> Matter B = DENY",
    details: res1_2.reason,
  });

  // Test 1.3: Client B attempting to access Matter A (IDOR attack - should DENY)
  const res1_3 = await authorizeMatterAccess(userClientB, matterOrgA);
  results.push({
    suite: "Client Organisation Isolation",
    testName: "Client B accessing Matter A (Cross-Tenant IDOR Attack)",
    passed: res1_3.authorized === false,
    scenario: "Client B -> Matter A = DENY",
    details: res1_3.reason,
  });

  // ==========================================================================
  // SUITE 2: MATTER-LEVEL INVESTIGATOR ACCESS
  // ==========================================================================
  // Test 2.1: Assigned Investigator accessing Matter (should PASS)
  const res2_1 = await authorizeMatterAccess(investigatorA, matterOrgA);
  results.push({
    suite: "Investigator Assignment Access",
    testName: "Investigator A accessing assigned Matter A",
    passed: res2_1.authorized === true,
    scenario: "Assigned Investigator -> Matter = PASS",
  });

  // Test 2.2: Unassigned Investigator accessing Matter (should DENY)
  const res2_2 = await authorizeMatterAccess(investigatorA, matterOrgB);
  results.push({
    suite: "Investigator Assignment Access",
    testName: "Investigator A accessing unassigned Matter B",
    passed: res2_2.authorized === false,
    scenario: "Unassigned Investigator -> Matter = DENY",
    details: res2_2.reason,
  });

  // ==========================================================================
  // SUITE 3: DOCUMENT ISOLATION & VISIBILITY FILTERING
  // ==========================================================================
  const docClientVisible = {
    id: "doc-visible-1",
    matterId: matterOrgA.id,
    clientOrganisationId: matterOrgA.clientOrganisationId,
    visibility: "CLIENT_VISIBLE" as const,
  };

  const docInternalOnly = {
    id: "doc-internal-1",
    matterId: matterOrgA.id,
    clientOrganisationId: matterOrgA.clientOrganisationId,
    visibility: "INTERNAL_ONLY" as const,
  };

  const docOrgB = {
    id: "doc-org-b-1",
    matterId: matterOrgB.id,
    clientOrganisationId: matterOrgB.clientOrganisationId,
    visibility: "CLIENT_VISIBLE" as const,
  };

  // Test 3.1: Client A accessing CLIENT_VISIBLE document on Matter A (should PASS)
  const res3_1 = await authorizeDocumentAccess(userClientA, docClientVisible);
  results.push({
    suite: "Document Security & Visibility",
    testName: "Client A accessing CLIENT_VISIBLE document on Matter A",
    passed: res3_1.authorized === true,
    scenario: "Client A -> Document A (Client Visible) = PASS",
  });

  // Test 3.2: Client A accessing INTERNAL_ONLY document on Matter A (should DENY)
  const res3_2 = await authorizeDocumentAccess(userClientA, docInternalOnly);
  results.push({
    suite: "Document Security & Visibility",
    testName: "Client A accessing INTERNAL_ONLY document on Matter A",
    passed: res3_2.authorized === false,
    scenario: "Client A -> Document A (Internal Only) = DENY",
    details: res3_2.reason,
  });

  // Test 3.3: Client A attempting to access Document on Matter B (should DENY)
  const res3_3 = await authorizeDocumentAccess(userClientA, docOrgB);
  results.push({
    suite: "Document Security & Visibility",
    testName: "Client A accessing Document belonging to Organisation B",
    passed: res3_3.authorized === false,
    scenario: "Client A -> Document B = DENY",
    details: res3_3.reason,
  });

  // ==========================================================================
  // SUITE 4: REPORT STATUS RESTRICTIONS (DRAFT VS DELIVERED)
  // ==========================================================================
  const reportDraft = {
    id: "rep-draft-1",
    matterId: matterOrgA.id,
    clientOrganisationId: matterOrgA.clientOrganisationId,
    status: "DRAFT",
  };

  const reportDelivered = {
    id: "rep-delivered-1",
    matterId: matterOrgA.id,
    clientOrganisationId: matterOrgA.clientOrganisationId,
    status: "DELIVERED",
  };

  // Test 4.1: Client accessing DRAFT report (should DENY)
  const res4_1 = await authorizeReportAccess(userClientA, reportDraft);
  results.push({
    suite: "Report Lifecycle Security",
    testName: "Client accessing DRAFT report",
    passed: res4_1.authorized === false,
    scenario: "Draft report -> Client = DENY",
    details: res4_1.reason,
  });

  // Test 4.2: Client accessing DELIVERED report (should PASS)
  const res4_2 = await authorizeReportAccess(userClientA, reportDelivered);
  results.push({
    suite: "Report Lifecycle Security",
    testName: "Client accessing DELIVERED report",
    passed: res4_2.authorized === true,
    scenario: "Delivered report -> Authorised Client = PASS",
  });

  // ==========================================================================
  // SUITE 5: ROLE ESCALATION & ADMIN BOUNDARY
  // ==========================================================================
  // Test 5.1: Client accessing Admin area (should DENY)
  const res5_1 = authorizeAdminAccess(userClientA);
  results.push({
    suite: "Role Escalation & Admin Barrier",
    testName: "Client role attempting Admin action",
    passed: res5_1.authorized === false,
    scenario: "Client -> Admin Operation = DENY",
  });

  // Test 5.2: Investigator accessing Admin area (should DENY)
  const res5_2 = authorizeAdminAccess(investigatorA);
  results.push({
    suite: "Role Escalation & Admin Barrier",
    testName: "Investigator role attempting Admin action",
    passed: res5_2.authorized === false,
    scenario: "Investigator -> Admin Operation = DENY",
  });

  // Test 5.3: Admin user accessing Admin area (should PASS)
  const res5_3 = authorizeAdminAccess(adminUser);
  results.push({
    suite: "Role Escalation & Admin Barrier",
    testName: "Admin role attempting Admin action",
    passed: res5_3.authorized === true,
    scenario: "Admin -> Admin Operation = PASS",
  });

  // ==========================================================================
  // SUITE 6: FILE UPLOAD HARDENING & PATH TRAVERSAL
  // ==========================================================================
  // Test 6.1: Valid PDF upload (should PASS)
  const file1 = validateUploadFile("legitimate_order.pdf", "application/pdf", 1024 * 500, {
    matterId: "mat-1",
  });
  results.push({
    suite: "File Upload Hardening",
    testName: "Valid PDF document upload",
    passed: file1.valid === true && !!file1.storageKey?.startsWith("private/matter/mat-1/docs/"),
    scenario: "Valid PDF Upload = PASS",
  });

  // Test 6.2: Malicious executable disguised as PDF (should DENY)
  const file2 = validateUploadFile("exploit.exe", "application/pdf", 1024 * 500, {
    matterId: "mat-1",
  });
  results.push({
    suite: "File Upload Hardening",
    testName: "Executable file extension disguised with PDF MIME type",
    passed: file2.valid === false,
    scenario: "Malicious executable extension = DENY",
    details: file2.error,
  });

  // Test 6.3: Path traversal in filename (should SANITIZE safely)
  const file3 = validateUploadFile("../../etc/passwd.pdf", "application/pdf", 1024 * 500, {
    matterId: "mat-1",
  });
  results.push({
    suite: "File Upload Hardening",
    testName: "Path traversal attempt in filename sanitized",
    passed: file3.valid === true && !file3.sanitizedFilename?.includes("/"),
    scenario: "Path Traversal in Filename Sanitized = PASS",
  });

  // ==========================================================================
  // SUITE 7: RATE LIMITING ON PUBLIC ENQUIRY ENDPOINT
  // ==========================================================================
  const testIp = `test-ip-${Date.now()}`;
  let rateLimitDenied = false;
  for (let i = 0; i < 7; i++) {
    const check = checkRateLimit(testIp, 5, 60000);
    if (!check.success) {
      rateLimitDenied = true;
      break;
    }
  }
  results.push({
    suite: "Abuse & Rate Limiting",
    testName: "Burst submission protection (>5 requests/min per IP)",
    passed: rateLimitDenied === true,
    scenario: "Bursted Public Enquiry Requests = RATE LIMITED (429)",
  });

  // Calculate totals
  const total = results.length;
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = total - passedCount;

  return {
    allPassed: failedCount === 0,
    total,
    passedCount,
    failedCount,
    results,
  };
}
