import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getAuditEventsByCase } from "@/lib/admin/fixtures/audit";
import { formatDateTime } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseAuditPage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const auditEvents = getAuditEventsByCase(detail.matter.id);

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6">
      <div className="flex justify-between items-center mb-6 border-b border-admin-border pb-3">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Immutable Case Audit Trail</h2>
          <p className="text-xs text-admin-text-muted">Forensic record of all state mutations, evidence downloads, and user disclosures.</p>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-xs">
          APPEND-ONLY
        </span>
      </div>

      {auditEvents.length === 0 ? (
        <div className="p-4 text-xs text-admin-text-muted">No isolated case events recorded in current audit segment.</div>
      ) : (
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Action</th>
              <th className="p-3">Notes & Mutation Scope</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {auditEvents.map((a) => (
              <tr key={a.id} className="hover:bg-admin-surface/40">
                <td className="p-3 font-mono text-[11px] text-admin-text-muted whitespace-nowrap">
                  {formatDateTime(a.occurred_at)}
                </td>
                <td className="p-3 font-mono text-[11px] uppercase text-admin-accent whitespace-nowrap">
                  {a.action}
                </td>
                <td className="p-3 text-admin-text-secondary">{a.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
