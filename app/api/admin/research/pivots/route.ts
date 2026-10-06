// ============================================================
// API: RESEARCH PIVOTS
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { researchStore } from "@/lib/admin/research/store";
import { PERMISSIONS } from "@/lib/rbac/permissions";

// GET: List pivots (optional ?case=MAT-XXXX)
export const GET = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_VIEW] },
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const caseRef = searchParams.get("case") || undefined;

    const pivots = researchStore.getPivots(caseRef);
    return NextResponse.json({ success: true, data: pivots });
  }
);

// POST: Create a new pivot
export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_CREATE] },
  async (req: NextRequest, session) => {
    try {
      const body = await req.json();

      if (!body.case_reference || !body.pivot_type || !body.input_value || !body.output_lead) {
        return NextResponse.json(
          { error: "VALIDATION_FAILED", message: "Missing required fields for pivot." },
          { status: 400 }
        );
      }

      const created = await researchStore.createPivot(
        {
          case_reference: body.case_reference,
          pivot_type: body.pivot_type,
          input_value: body.input_value,
          output_lead: body.output_lead,
          target_tool: body.target_tool,
          notes: body.notes,
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

// PATCH: Update pivot status (RESOLVED, DEAD_END, CORROBORATING, OPEN)
export const PATCH = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_EDIT] },
  async (req: NextRequest, session) => {
    try {
      const body = await req.json();
      const { id, status, notes } = body;

      if (!id || !status) {
        return NextResponse.json(
          { error: "VALIDATION_FAILED", message: "id and status are required." },
          { status: 400 }
        );
      }

      const updated = await researchStore.updatePivotStatus(id, status, session, notes);
      return NextResponse.json({ success: true, data: updated });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal error";
      return NextResponse.json({ error: "EXECUTION_ERROR", message: msg }, { status: 400 });
    }
  }
);
