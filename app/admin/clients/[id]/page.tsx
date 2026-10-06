import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building, Mail, Phone, MapPin, FolderOpen, ArrowRight } from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import { getClientById, getCasesByClient } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Client Profile | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const client = getClientById(resolvedParams.id);

  if (!client) {
    notFound();
  }

  const clientMatters = getCasesByClient(client.id);

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <AdminPageHeader
        label={`CLIENT RECORD / ${client.id}`}
        title={client.legal_name}
        description={`Classification: ${client.client_type.replace(/_/g, " ")} · Status: ${client.status}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/clients"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Clients
            </Link>
            <StatusBadge status={client.status} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: MATTERS & ACTIVITY */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-admin-border pb-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                Instructed Matters ({clientMatters.length})
              </h2>
            </div>

            {clientMatters.length === 0 ? (
              <p className="text-xs text-admin-text-muted py-4">No matters on file for this client.</p>
            ) : (
              <div className="divide-y divide-admin-border-subtle">
                {clientMatters.map((m) => (
                  <div key={m.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <Link href={`/admin/matters/${m.id}`} className="font-medium text-admin-text hover:text-admin-accent">
                        {m.reference} — {m.title}
                      </Link>
                      <p className="text-[11px] font-mono text-admin-text-muted mt-0.5">
                        Type: {m.matter_type.replace(/_/g, " ")} · Opened: {new Date(m.opened_at).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={m.status} />
                      <Link
                        href={`/admin/matters/${m.id}`}
                        className="px-2 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border text-admin-text hover:border-admin-accent rounded-xs"
                      >
                        Workspace
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COL: CLIENT METADATA */}
        <div className="space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Organisation Particulars
            </h2>

            <div className="text-xs space-y-2.5">
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Company Registration</p>
                <p className="font-mono text-admin-text font-medium">{client.company_number || "Unregistered / Overseas"}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Primary Email</p>
                <a href={`mailto:${client.email}`} className="text-admin-accent hover:underline font-mono">
                  {client.email || "—"}
                </a>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Telephone</p>
                <p className="font-mono text-admin-text">{client.telephone || "—"}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Registered Address</p>
                <p className="text-admin-text mt-0.5">
                  {[client.address_line1, client.address_line2, client.address_city, client.address_postcode, client.address_country]
                    .filter(Boolean)
                    .join(", ") || "No address recorded"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Data Retention</p>
                <p className="font-mono text-emerald-700 font-medium">{client.retention_status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
