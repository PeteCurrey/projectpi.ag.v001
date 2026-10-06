// ============================================================
// API: RESEARCH FINDINGS & QUERIES
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { researchStore } from "@/lib/admin/research/store";
import { PERMISSIONS } from "@/lib/rbac/permissions";

// GET: List findings (with optional ?case=MAT-XXXX filter)
export const GET = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_VIEW] },
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const caseRef = searchParams.get("case") || undefined;

    const findings = researchStore.getFindings(caseRef);
    return NextResponse.json({ success: true, data: findings });
  }
);

// POST: Create a new research finding
export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_CREATE] },
  async (req: NextRequest, session) => {
    try {
      const body = await req.json();

      if (!body.title || !body.finding || !body.case_reference || !body.confidence) {
        return NextResponse.json(
          { error: "VALIDATION_FAILED", message: "Missing required fields: title, finding, case_reference, confidence" },
          { status: 400 }
        );
      }

      const created = await researchStore.createFinding(
        {
          title: body.title,
          source_url: body.source_url || "https://internal-record.local",
          source_name: body.source_name || "Internal Investigative Note",
          source_type: body.source_type || "Investigative Observation",
          date_accessed: body.date_accessed,
          finding: body.finding,
          confidence: body.confidence,
          case_reference: body.case_reference,
          subject_name: body.subject_name,
          subject_ids: body.subject_ids,
          notes: body.notes,
          evidence_attachment: body.evidence_attachment,
        },
        session
      );

      return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal error";
      return NextResponse.json({ error: "EXECUTION_ERROR", message: msg }, { status: 400 });
    }
  }
);
