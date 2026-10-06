import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import { FIXTURE_CLIENTS, FIXTURE_CASES } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Client Directory | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminClientsPage() {
  const clients = [...FIXTURE_CLIENTS].sort((a, b) =>
    a.legal_name.localeCompare(b.legal_name)
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="CLIENT MANAGEMENT"
        title="Instructing Organisations & Clients"
        description="Legal practices, insolvency practitioners, insurers, corporations and private clients."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {clients.length} Registered Client Organisations
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Organisation / Legal Name</th>
                <th className="p-3 font-medium">Type</th>
                <th className="p-3 font-medium">Company No</th>
                <th className="p-3 font-medium">Primary Contact</th>
                <th className="p-3 font-medium">Active Matters</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {clients.map((client) => {
                const activeMatters = FIXTURE_CASES.filter(
                  (c) => c.client_organisation_id === client.id && !["COMPLETED", "CLOSED"].includes(c.status)
                );

                return (
                  <tr key={client.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-medium text-admin-text">
                      <Link href={`/admin/clients/${client.id}`} className="hover:text-admin-accent">
                        {client.legal_name}
                      </Link>
                      {client.trading_name && client.trading_name !== client.legal_name && (
                        <p className="text-[11px] text-admin-text-muted">t/a {client.trading_name}</p>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                      {client.client_type.replace(/_/g, " ")}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {client.company_number || "—"}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      <p>{client.email || "No email"}</p>
                      <p className="text-admin-text-muted">{client.telephone || "No telephone"}</p>
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      <span className="font-semibold text-admin-text">{activeMatters.length}</span> active
                    </td>
                    <td className="p-3">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Profile
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
