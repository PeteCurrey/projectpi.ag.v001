import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import PriorityIndicator from "../components/PriorityIndicator";
import { FIXTURE_CASES, FIXTURE_CLIENTS, FIXTURE_USERS } from "@/lib/admin/fixtures";
import { Plus, FolderOpen } from "lucide-react";

export const metadata = {
  title: "Investigation Matters | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminMattersPage() {
  const matters = [...FIXTURE_CASES].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="CASEWORK DIRECTORY"
        title="Active Investigation Matters & Instructions"
        description="Master index of legal, intelligence, process serving and corporate casework."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted mr-2">
              {matters.length} Total Matters Recorded
            </span>
            <Link
              href="/admin/matters/new"
              className="px-3 py-1.5 text-xs font-mono bg-admin-accent text-white rounded-xs hover:bg-admin-accent/90 transition-colors flex items-center gap-1.5 font-medium shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Instruct New Matter
            </Link>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="p-4 border-b border-admin-border flex flex-wrap items-center justify-between gap-4 bg-admin-surface/30">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-semibold text-admin-text">Filter:</span>
            <span className="px-2 py-0.5 bg-admin-text text-white rounded-xs">All ({matters.length})</span>
            <span className="px-2 py-0.5 bg-white border border-admin-border text-admin-text-secondary rounded-xs">
              Live Fieldwork ({matters.filter((m) => ["IN_PROGRESS", "FIELDWORK"].includes(m.status)).length})
            </span>
            <span className="px-2 py-0.5 bg-white border border-admin-border text-admin-text-secondary rounded-xs">
              Reporting ({matters.filter((m) => m.status === "REPORTING").length})
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Matter Ref</th>
                <th className="p-3 font-medium">Title & Instructing Client</th>
                <th className="p-3 font-medium">Vertical</th>
                <th className="p-3 font-medium">Priority</th>
                <th className="p-3 font-medium">Confidentiality</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Lead Operative</th>
                <th className="p-3 font-medium">Target Date</th>
                <th className="p-3 font-medium text-right">Workspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {matters.map((matter) => {
                const client = FIXTURE_CLIENTS.find((c) => c.id === matter.client_organisation_id);
                const leadUser = matter.lead_investigator_id
                  ? FIXTURE_USERS.find((u) => u.id === matter.lead_investigator_id)
                  : null;

                const conf = matter.confidentiality || "STANDARD";
                const confStyles =
                  conf === "HIGHLY_CONFIDENTIAL"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : conf === "CONFIDENTIAL"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-admin-surface text-admin-text-secondary border-admin-border";

                return (
                  <tr key={matter.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-mono font-medium text-admin-text">
                      <Link href={`/admin/matters/${matter.reference}`} className="hover:text-admin-accent hover:underline">
                        {matter.reference}
                      </Link>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/admin/matters/${matter.reference}`}
                        className="font-medium text-admin-text hover:text-admin-accent hover:underline block"
                      >
                        {matter.title}
                      </Link>
                      <p className="text-[11px] text-admin-text-muted">
                        {client ? client.legal_name : "Private Client"}
                      </p>
                    </td>
                    <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                      {matter.matter_type.replace(/_/g, " ")}
                    </td>
                    <td className="p-3">
                      <PriorityIndicator priority={matter.priority} showLabel />
                    </td>
                    <td className="p-3">
                      <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-xs uppercase tracking-wider font-semibold ${confStyles}`}>
                        {conf.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="p-3">
                      <StatusBadge status={matter.status} />
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {leadUser ? leadUser.name : <span className="text-admin-text-faint italic">Unassigned</span>}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {matter.target_date
                        ? new Date(matter.target_date).toLocaleDateString("en-GB")
                        : "—"}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/matters/${matter.reference}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Enter Matter
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
