import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseEvidencePage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const { evidence } = detail;

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
      <div className="p-4 border-b border-admin-border flex justify-between items-center bg-admin-surface">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Chain of Custody & Evidence Vault</h2>
          <p className="text-xs text-admin-text-muted">Cryptographically validated evidence items, field exhibits, and digital media.</p>
        </div>
        <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
          + Ingest Evidence
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
          <tr>
            <th className="p-3">Exhibit Title</th>
            <th className="p-3">Type</th>
            <th className="p-3">Classification</th>
            <th className="p-3">SHA-256 Integrity Hash</th>
            <th className="p-3">Ingested Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-border-subtle">
          {evidence.map((item) => (
            <tr key={item.id} className="hover:bg-admin-surface/40 transition-colors">
              <td className="p-3">
                <div className="font-medium text-admin-text">{item.title}</div>
                {item.source && (
                  <p className="text-[11px] text-admin-text-muted mt-0.5">{item.source}</p>
                )}
              </td>
              <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary whitespace-nowrap">
                {item.evidence_type}
              </td>
              <td className="p-3 whitespace-nowrap">
                <span className="px-1.5 py-0.5 bg-admin-surface border border-admin-border text-[10px] font-mono rounded-xs">
                  {item.classification || "CONFIDENTIAL"}
                </span>
              </td>
              <td className="p-3 font-mono text-[11px] text-admin-text-muted whitespace-nowrap">
                {item.integrity_hash ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span title={item.integrity_hash}>
                      {item.integrity_hash.slice(0, 16)}...
                    </span>
                  </div>
                ) : (
                  <span className="text-amber-600 font-sans text-[10px] px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded-xs">
                    Unverified
                  </span>
                )}
              </td>
              <td className="p-3 font-mono text-[11px] text-admin-text-muted whitespace-nowrap">
                {item.collected_at ? formatDateTime(item.collected_at) : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
