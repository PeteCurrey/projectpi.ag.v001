import React from "react";
import Link from "next/link";
import { Stamp, ShieldCheck, Clock, MapPin, ArrowRight } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import PriorityIndicator from "../components/PriorityIndicator";
import { FIXTURE_CASES, FIXTURE_CLIENTS, FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Process Serving Command | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminProcessServingPage() {
  const processServingMatters = FIXTURE_CASES.filter(
    (c) => c.matter_type === "PROCESS_SERVING"
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="SPECIALIST VERTICAL"
        title="Process Serving Operations & Court Filings"
        description="Operational tracking of statutory demands, winding-up petitions, and court document service attempts under CPR Part 6 procedural guidelines."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {processServingMatters.length} Instructions on File
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
                <th className="p-3 font-medium">Instruction & Recipient</th>
                <th className="p-3 font-medium">Instructing Solicitor</th>
                <th className="p-3 font-medium">Process Server</th>
                <th className="p-3 font-medium">Court Deadline</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium text-right">Service Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {processServingMatters.map((m) => {
                const client = FIXTURE_CLIENTS.find((c) => c.id === m.client_organisation_id);
                const operative = m.lead_investigator_id
                  ? FIXTURE_USERS.find((u) => u.id === m.lead_investigator_id)
                  : null;

                return (
                  <tr key={m.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-mono font-medium text-admin-text">
                      <Link href={`/admin/process-serving/${m.id}`} className="hover:text-admin-accent">
                        {m.reference}
                      </Link>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-admin-text">{m.title}</p>
                      <p className="text-[11px] text-admin-text-muted mt-0.5 line-clamp-1">{m.description}</p>
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {client ? client.legal_name : "Private Client"}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {operative ? operative.name : <span className="text-admin-text-faint italic">Unassigned</span>}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-red-600 font-medium">
                      {m.target_date ? new Date(m.target_date).toLocaleDateString("en-GB") : "—"}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/process-serving/${m.id}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Service Hub
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
