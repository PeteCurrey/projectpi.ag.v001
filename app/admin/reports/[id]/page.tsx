import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileBarChart, CheckCircle2, ShieldCheck, Download, UserCheck } from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import { getCaseById, getClientById, getUserById } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Report Review & Approval | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const matter = getCaseById(resolvedParams.id);

  if (!matter) {
    notFound();
  }

  const client = getClientById(matter.client_organisation_id);
  const author = matter.lead_investigator_id
    ? getUserById(matter.lead_investigator_id)
    : null;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <AdminPageHeader
        label={`FORMAL DELIVERABLE / ${matter.reference}`}
        title={`Investigation Report — ${matter.title}`}
        description={`Instructing Organisation: ${client ? client.legal_name : "Private Client"}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/reports"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Reports
            </Link>
            <StatusBadge status={matter.status === "COMPLETED" ? "APPROVED" : "DRAFT"} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
              Executive Summary & Findings
            </h2>
            <div className="prose prose-sm max-w-none text-xs text-admin-text leading-relaxed bg-admin-surface/30 p-5 border border-admin-border rounded-xs">
              <p className="font-medium text-sm mb-2">Matter Brief: {matter.title}</p>
              <p className="text-admin-text-secondary mb-4">{matter.description}</p>
              <p className="font-semibold text-admin-text">Key Findings & Corroboration:</p>
              <ul className="list-disc pl-4 space-y-1 text-admin-text-secondary mt-1">
                <li>All subject background and OSINT verifications executed in accordance with ISO 27001 / DPA 2018 guidelines.</li>
                <li>Digital exhibits and physical surveillance timestamp logs verified with cryptographic SHA-256 integrity hashes.</li>
                <li>Report conclusions prepared for legal review, tribunal presentation, or client decision-making.</li>
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-admin-border">
              <span className="text-[11px] font-mono text-admin-text-muted">
                Author: {author ? author.name : "Operative"}
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 text-xs font-mono uppercase bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover">
                  Export PDF
                </button>
                <button className="px-3 py-1.5 text-xs font-mono uppercase font-medium bg-admin-accent text-white rounded-xs hover:bg-admin-accent/90">
                  Approve for Client Release
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Deliverable Quality Sign-Off
            </h2>
            <div className="space-y-2 text-xs text-admin-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Legitimate Interest Basis Documented</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Photographic Exclusions / Bystander Redaction</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Director Sign-Off Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
