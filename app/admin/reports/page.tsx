import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import { FIXTURE_CASES, FIXTURE_CLIENTS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Reports & Affidavits | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminReportsPage() {
  const reportingMatters = FIXTURE_CASES.filter((c) =>
    ["REPORTING", "COMPLETED"].includes(c.status)
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="DELIVERABLES & COURT AFFIDAVITS"
        title="Investigation Reports, Evidence Bundles & Proofs of Service"
        description="Drafting, partner quality assurance review, client release and court submission bundles."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {reportingMatters.length} Formal Reports on Record
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Matter Ref</th>
                <th className="p-3 font-medium">Report Subject / Title</th>
                <th className="p-3 font-medium">Instructing Client</th>
                <th className="p-3 font-medium">Report Type</th>
                <th className="p-3 font-medium">Workflow Stage</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {reportingMatters.map((m) => {
                const client = FIXTURE_CLIENTS.find((c) => c.id === m.client_organisation_id);

                return (
                  <tr key={m.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-mono font-medium text-admin-text">
                      <Link href={`/admin/reports/${m.id}`} className="hover:text-admin-accent">
                        {m.reference}
                      </Link>
                    </td>
                    <td className="p-3 font-medium text-admin-text">
                      {m.title}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {client ? client.legal_name : "Private Client"}
                    </td>
                    <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                      {m.matter_type.replace(/_/g, " ")} REPORT
                    </td>
                    <td className="p-3">
                      <StatusBadge status={m.status === "COMPLETED" ? "APPROVED" : "DRAFT"} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/reports/${m.id}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Review
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
