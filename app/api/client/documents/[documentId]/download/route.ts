import { NextRequest, NextResponse } from "next/server";
import { authorizeDocumentAccess, AuthContext } from "@/lib/security/authorisation";
import { generateTemporaryDownloadDescriptor } from "@/lib/security/storage";
import { logAuditEvent } from "@/lib/security/audit";

// Demo document repository records with strict ownership metadata
const DEMO_DOCUMENTS: Record<
  string,
  {
    id: string;
    matterId: string;
    clientOrganisationId: string;
    visibility: "CLIENT_VISIBLE" | "INTERNAL_ONLY" | "RESTRICTED";
    storageKey: string;
    originalFilename: string;
    mimeType: string;
  }
> = {
  "doc-001": {
    id: "doc-001",
    matterId: "mat-org-a-1",
    clientOrganisationId: "org-a",
    visibility: "CLIENT_VISIBLE",
    storageKey: "private/matter/mat-org-a-1/docs/sealed_petition.pdf",
    originalFilename: "Petition_Form_7.1_Sealed_Copy.pdf",
    mimeType: "application/pdf",
  },
  "doc-002": {
    id: "doc-002",
    matterId: "mat-org-a-1",
    clientOrganisationId: "org-a",
    visibility: "INTERNAL_ONLY", // Internal field investigator surveillance notes
    storageKey: "private/matter/mat-org-a-1/docs/internal_surveillance_log.pdf",
    originalFilename: "Internal_Field_Log_Confidential.pdf",
    mimeType: "application/pdf",
  },
  "doc-003": {
    id: "doc-003",
    matterId: "mat-org-b-1",
    clientOrganisationId: "org-b", // Belongs to Organisation B!
    visibility: "CLIENT_VISIBLE",
    storageKey: "private/matter/mat-org-b-1/docs/asset_trace_report.pdf",
    originalFilename: "Asset_Intelligence_Org_B.pdf",
    mimeType: "application/pdf",
  },
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  try {
    const { documentId } = await params;
    const document = DEMO_DOCUMENTS[documentId];

    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Extract auth context from request headers / session
    const authHeaderRole = req.headers.get("x-user-role") || "CLIENT";
    const authHeaderUserId = req.headers.get("x-user-id") || "user-a";
    const authHeaderOrgId = req.headers.get("x-client-org-id") || "org-a";

    const authContext: AuthContext = {
      userId: authHeaderUserId,
      role: authHeaderRole as any,
      clientOrganisationId: authHeaderOrgId,
      assignedMatterIds: ["mat-org-a-1"],
    };

    // Authorize document access (Enforces Org Isolation + Document Visibility)
    const decision = await authorizeDocumentAccess(authContext, document);

    if (!decision.authorized) {
      await logAuditEvent({
        actorUserId: authContext.userId,
        actorRole: authContext.role,
        action: "PERMISSION_DENIED",
        entityType: "DOCUMENT",
        entityId: document.id,
        matterId: document.matterId,
        notes: decision.reason,
      });

      return NextResponse.json(
        { error: "You are not authorized to access this document" },
        { status: 403 }
      );
    }

    // Record audit log for compliant document access
    await logAuditEvent({
      actorUserId: authContext.userId,
      actorRole: authContext.role,
      action: "DOCUMENT_DOWNLOADED",
      entityType: "DOCUMENT",
      entityId: document.id,
      matterId: document.matterId,
      clientOrganisationId: document.clientOrganisationId,
    });

    // Generate short-lived (5-minute) signed access descriptor
    const downloadDescriptor = generateTemporaryDownloadDescriptor(document.storageKey, 300);

    return NextResponse.json({
      success: true,
      documentId: document.id,
      filename: document.originalFilename,
      mimeType: document.mimeType,
      expiresAt: downloadDescriptor.expiresAt,
      downloadUrl: `/api/client/documents/${documentId}/stream?token=${downloadDescriptor.temporaryToken}`,
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
