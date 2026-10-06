import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import { FIXTURE_CASES, FIXTURE_CLIENTS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Secure Communications | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminMessagesPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="CLIENT COMMUNICATION CHANNELS"
        title="Encrypted Case Messages & Client Portals"
        description="End-to-end audit trailed client instructions, updates and sensitive matter communications."
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
          Active Message Threads by Matter
        </h2>

        <div className="divide-y divide-admin-border-subtle">
          {FIXTURE_CASES.map((m) => {
            const client = FIXTURE_CLIENTS.find((c) => c.id === m.client_organisation_id);
            return (
              <div key={m.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-admin-text font-mono">{m.reference} — {m.title}</p>
                  <p className="text-[11px] text-admin-text-muted mt-0.5">
                    Client: {client ? client.legal_name : "Private Client"} · Status: {m.status}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    PORTAL SECURE
                  </span>
                  <Link
                    href={`/admin/matters/${m.id}`}
                    className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:border-admin-accent"
                  >
                    Open Thread
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
