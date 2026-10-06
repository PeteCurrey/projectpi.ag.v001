import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import { FIXTURE_EVIDENCE, FIXTURE_CASES } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Evidence Register & Chain of Custody | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminEvidencePage() {
  const evidenceList = [...FIXTURE_EVIDENCE];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="FORENSIC & INVESTIGATIVE REGISTER"
        title="Evidence Inventory & Cryptographic Chain of Custody"
        description="Tamper-evident logs, digital forensics, field photography, audio transcripts and source integrity records."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {evidenceList.length} Total Evidence Artifacts
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Evidence Title</th>
                <th className="p-3 font-medium">Related Matter</th>
                <th className="p-3 font-medium">Evidence Type</th>
                <th className="p-3 font-medium">Classification</th>
                <th className="p-3 font-medium">Integrity (SHA-256)</th>
                <th className="p-3 font-medium">Date Secured</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {evidenceList.map((item) => {
                const matter = FIXTURE_CASES.find((c) => c.id === item.matter_id);

                return (
                  <tr key={item.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3">
                      <Link href={`/admin/evidence/${item.id}`} className="font-medium text-admin-text hover:text-admin-accent">
                        {item.title}
                      </Link>
                      {item.source && (
                        <p className="text-[11px] text-admin-text-muted mt-0.5">{item.source}</p>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      {matter ? (
                        <Link href={`/admin/matters/${matter.id}`} className="text-admin-accent hover:underline font-medium">
                          {matter.reference}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                      {item.evidence_type}
                    </td>
                    <td className="p-3">
                      <span className="px-1.5 py-0.5 bg-admin-surface border border-admin-border text-[10px] font-mono">
                        {item.classification || "CONFIDENTIAL"}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {item.integrity_hash ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1 py-0.5 border border-emerald-200">
                          {item.integrity_hash.slice(0, 16)}...
                        </span>
                      ) : (
                        <span className="text-amber-700 bg-amber-50 px-1 py-0.5 border border-amber-200">
                          UNHASHED
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {item.collected_at ? new Date(item.collected_at).toLocaleDateString("en-GB") : "—"}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/evidence/${item.id}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
