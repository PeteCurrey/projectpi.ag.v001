// ============================================================
// API: RESEARCH OBJECTIVE & AUDIT HISTORY
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { researchStore } from "@/lib/admin/research/store";
import { PERMISSIONS } from "@/lib/rbac/permissions";

// GET: Current objective and version history
export const GET = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_VIEW] },
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const caseRef = searchParams.get("case");

    if (!caseRef) {
      return NextResponse.json({ error: "CASE_REQUIRED", message: "Case reference is required." }, { status: 400 });
    }

    const current = researchStore.getObjective(caseRef);
    const history = researchStore.getObjectiveHistory(caseRef);

    return NextResponse.json({
      success: true,
      data: {
        current,
        history,
      },
    });
  }
);

// POST: Update research objective (creates immutable version entry)
export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.CASES_EDIT] },
  async (req: NextRequest, session) => {
    try {
      const body = await req.json();
      const { case_reference, objective, change_reason } = body;

      if (!case_reference || !objective) {
        return NextResponse.json(
          { error: "VALIDATION_FAILED", message: "case_reference and objective are required." },
          { status: 400 }
        );
      }

      const version = await researchStore.updateObjective(
        case_reference,
        objective,
        change_reason,
        session
      );

      return NextResponse.json({ success: true, data: version });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal error";
      return NextResponse.json({ error: "EXECUTION_ERROR", message: msg }, { status: 400 });
    }
  }
);
