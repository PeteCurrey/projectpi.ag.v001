import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import { FIXTURE_CASES, FIXTURE_CLIENTS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Document Centre | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminDocumentsPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="DOCUMENT REPOSITORY"
        title="Matter Documents & Legal Filings"
        description="Secure storage of client uploads, court process documents, statutory notices and case files."
        actions={
          <button className="px-3 py-1.5 text-xs font-mono uppercase bg-admin-text text-white rounded-xs">
            Upload Document
          </button>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
          Document Collections by Active Matter
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIXTURE_CASES.map((matter) => {
            const client = FIXTURE_CLIENTS.find((c) => c.id === matter.client_organisation_id);
            return (
              <div key={matter.id} className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-admin-text">{matter.reference}</span>
                  <span className="text-admin-text-muted">{matter.matter_type}</span>
                </div>
                <p className="text-xs font-medium text-admin-text truncate">{matter.title}</p>
                <p className="text-[11px] text-admin-text-muted">{client ? client.legal_name : "Private Client"}</p>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-[11px] font-mono text-emerald-700">Encrypted AES-256</span>
                  <Link
                    href={`/admin/matters/${matter.id}?tab=overview`}
                    className="text-[11px] font-mono text-admin-accent hover:underline"
                  >
                    Open Folder →
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
