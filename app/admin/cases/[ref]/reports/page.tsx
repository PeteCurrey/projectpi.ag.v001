import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import StatusBadge from "@/app/admin/components/StatusBadge";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseReportsPage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6">
      <div className="flex justify-between items-center mb-6 border-b border-admin-border pb-3">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Investigation Reports & Deliverables</h2>
          <p className="text-xs text-admin-text-muted">Interim briefings, witness statements, and immutable final court-ready deliverables.</p>
        </div>
        <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
          + Draft New Report
        </button>
      </div>

      <div className="space-y-4">
        <div className="border border-admin-border p-4 rounded-xs bg-admin-surface/20 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-admin-text">Final_Investigation_Report_{detail.matter.reference}.pdf</span>
              <StatusBadge status={detail.matter.status === "COMPLETED" ? "ISSUED" : "DRAFT"} />
            </div>
            <p className="text-[11px] text-admin-text-muted mt-1">
              Includes executive briefing, corroborated findings, photographic annex, and statement of truth.
            </p>
          </div>
          <span className="text-xs font-mono text-admin-accent hover:underline cursor-pointer">Preview Deliverable &rarr;</span>
        </div>
      </div>
    </div>
  );
}
