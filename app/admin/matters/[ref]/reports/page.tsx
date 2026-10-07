import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatShortDate } from "@/lib/admin/utils/dates";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { FileBarChart, Plus, Lock, FileText, Download } from "lucide-react";

interface ReportsProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterReportsPage({ params }: ReportsProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter } = detail;

  // Initial fixture reports associated with this matter
  const reports = [
    {
      id: "rep-001",
      title: "Interim Investigation Report — Phase 1 Factual Findings",
      report_type: "INTERIM",
      version: 1,
      status: "APPROVED",
      generated_at: "2025-10-02T16:00:00.000Z",
      approved_at: "2025-10-03T11:00:00.000Z",
      delivered_at: "2025-10-04T09:00:00.000Z",
      is_immutable: true,
      references: {
        subjects: detail.subjects.length,
        evidence: detail.evidence.length,
        events: detail.events.length,
      },
    },
    {
      id: "rep-002",
      title: "Comprehensive Evidential Bundle & Affidavit Schedule",
      report_type: "FINAL",
      version: 1,
      status: "DRAFT",
      generated_at: "2025-10-06T14:00:00.000Z",
      is_immutable: false,
      references: {
        subjects: detail.subjects.length,
        evidence: detail.evidence.length,
        events: detail.events.length,
      },
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Investigation Reports & Disclosure Bundles</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Formal interim briefings, final forensic reports, and court evidence summaries compiled for this Matter.
          </p>
        </div>
        <button className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-admin-accent" />
          Create New Report
        </button>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                <th className="p-3">Report Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Version</th>
                <th className="p-3">Status</th>
                <th className="p-3">Referenced Records</th>
                <th className="p-3">Generated Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {reports.map((rep) => (
                <tr key={rep.id} className="hover:bg-admin-surface/30 transition-colors">
                  <td className="p-3 max-w-sm">
                    <p className="font-semibold text-admin-text">{rep.title}</p>
                    <p className="text-[11px] text-admin-text-muted font-mono mt-0.5">
                      REF: {rep.id} {rep.is_immutable && "· IMMUTABLE ISSUED VERSION"}
                    </p>
                  </td>
                  <td className="p-3 font-mono text-admin-text-secondary">
                    {rep.report_type}
                  </td>
                  <td className="p-3 font-mono text-admin-text-secondary">
                    v{rep.version}.0
                  </td>
                  <td className="p-3">
                    <StatusBadge status={rep.status} />
                  </td>
                  <td className="p-3 text-[11px] font-mono text-admin-text-faint">
                    {rep.references.subjects} Subjects · {rep.references.evidence} Exhibits · {rep.references.events} Events
                  </td>
                  <td className="p-3 font-mono text-admin-text-muted">
                    {formatShortDate(rep.generated_at)}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      title="Download Report"
                      className="p-1.5 text-admin-text-muted hover:text-admin-accent hover:bg-admin-surface rounded-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
