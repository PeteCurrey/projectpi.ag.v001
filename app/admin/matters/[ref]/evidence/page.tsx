import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getUserById } from "@/lib/admin/fixtures/users";
import { formatDateTime, formatShortDate } from "@/lib/admin/utils/dates";
import { ShieldCheck, Lock, Hash, Plus, FileCheck } from "lucide-react";

interface EvidenceProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterEvidencePage({ params }: EvidenceProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, evidence } = detail;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Evidence Exhibits & Custody Register</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Immutable forensic exhibits, field recordings, and documents verified with cryptographic SHA-256 hashes.
          </p>
        </div>
        <Link
          href={`/admin/evidence`}
          className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5 text-admin-accent" />
          Log New Exhibit
        </Link>
      </div>

      <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xs flex items-center gap-2.5 text-xs text-amber-900">
        <Lock className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          <strong>Forensic Immutability Notice:</strong> Evidence exhibits and digital hashes cannot be modified once logged. Any amendment requires formal logging of a supplementary exhibit.
        </span>
      </div>

      {evidence.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <ShieldCheck className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Evidence Logged</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            Log physical exhibits, digital recordings, photographs, or official documents into this Matter&apos;s custody register.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                  <th className="p-3">Exhibit Title</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Classification</th>
                  <th className="p-3">Collected Date</th>
                  <th className="p-3">Operative / Source</th>
                  <th className="p-3">Integrity Hash (SHA-256)</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border-subtle">
                {evidence.map((item) => {
                  const collector = item.collected_by_user_id ? getUserById(item.collected_by_user_id) : null;
                  return (
                    <tr key={item.id} className="hover:bg-admin-surface/30 transition-colors">
                      <td className="p-3 max-w-sm">
                        <Link
                          href={`/admin/evidence/${item.id}`}
                          className="font-semibold text-admin-text hover:text-admin-accent hover:underline block"
                        >
                          {item.title}
                        </Link>
                        {item.description && (
                          <p className="text-[11px] text-admin-text-muted line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </td>
                      <td className="p-3 font-mono text-admin-text-secondary">
                        {item.evidence_type}
                      </td>
                      <td className="p-3">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 border rounded-xs font-semibold ${
                            item.classification === "HIGHLY_CONFIDENTIAL"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : item.classification === "CONFIDENTIAL"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-admin-surface text-admin-text-secondary border-admin-border"
                          }`}
                        >
                          {item.classification || "STANDARD"}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-admin-text-muted">
                        {item.collected_at ? formatShortDate(item.collected_at) : formatShortDate(item.created_at)}
                      </td>
                      <td className="p-3 text-admin-text-secondary">
                        <p className="font-medium text-admin-text">{collector?.name || "Unassigned"}</p>
                        <p className="text-[11px] text-admin-text-faint">{item.source || "Field Operative"}</p>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-admin-text-faint">
                        {item.integrity_hash ? (
                          <span className="flex items-center gap-1" title={item.integrity_hash}>
                            <Hash className="w-3 h-3 text-admin-accent" />
                            {item.integrity_hash.slice(0, 14)}...
                          </span>
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs">
                          <FileCheck className="w-3 h-3 text-emerald-600" />
                          VERIFIED
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
