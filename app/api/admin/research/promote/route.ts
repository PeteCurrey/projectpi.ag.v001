// ============================================================
// API: TRANSACTIONAL RESEARCH PROMOTION
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { withAdminAuth } from "@/lib/api/handler";
import { researchStore } from "@/lib/admin/research/store";
import { PERMISSIONS } from "@/lib/rbac/permissions";

// POST: Promote a research finding to Case Intelligence, Evidence, Timeline, or Subject
export const POST = withAdminAuth(
  { permissions: [PERMISSIONS.INTELLIGENCE_CREATE, PERMISSIONS.CASES_EDIT] },
  async (req: NextRequest, session) => {
    try {
      const body = await req.json();
      const { findingId, target } = body;

      if (!findingId || !target) {
        return NextResponse.json(
          { error: "VALIDATION_FAILED", message: "findingId and target are required." },
          { status: 400 }
        );
      }

      if (!["INTELLIGENCE", "EVIDENCE", "TIMELINE", "SUBJECT"].includes(target)) {
        return NextResponse.json(
          { error: "INVALID_TARGET", message: "Target must be INTELLIGENCE, EVIDENCE, TIMELINE, or SUBJECT." },
          { status: 400 }
        );
      }

      const result = await researchStore.promoteFinding(findingId, target, session);

      return NextResponse.json({
        success: true,
        message: `Successfully promoted finding to ${target}`,
        data: result,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Promotion transaction failed";
      return NextResponse.json({ error: "TRANSACTION_FAILED", message: msg }, { status: 500 });
    }
  }
);
