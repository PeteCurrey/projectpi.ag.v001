import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Hash, User, Calendar, FolderOpen, ArrowRight } from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import { getEvidenceById, getCaseById, getUserById } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Evidence Inspection & Custody Log | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminEvidenceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const item = getEvidenceById(resolvedParams.id);

  if (!item) {
    notFound();
  }

  const matter = getCaseById(item.matter_id);
  const collector = item.collected_by_user_id
    ? getUserById(item.collected_by_user_id)
    : null;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <AdminPageHeader
        label={`EVIDENCE ARTIFACT / ${item.id}`}
        title={item.title}
        description={`Classification: ${item.classification || "CONFIDENTIAL"} · Status: ${item.status}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/evidence"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Inventory
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
              Artifact Particulars & Description
            </h2>
            <p className="text-xs sm:text-sm text-admin-text leading-relaxed whitespace-pre-line bg-admin-surface/30 p-4 border border-admin-border rounded-xs">
              {item.description || "No description provided."}
            </p>

            <div className="p-4 bg-admin-surface/50 border border-admin-border rounded-xs space-y-2">
              <span className="text-[11px] font-mono uppercase text-admin-text-faint block">
                Cryptographic Checksum (SHA-256)
              </span>
              <p className="font-mono text-xs text-admin-text break-all bg-white p-2.5 border border-admin-border rounded-xs">
                {item.integrity_hash || "NO CHECKSUM RECORDED — REQUIRES IMMEDIATE AUDIT"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Chain of Custody
            </h2>

            <div className="text-xs space-y-2.5">
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Associated Matter</p>
                {matter ? (
                  <Link href={`/admin/matters/${matter.id}`} className="font-medium text-admin-accent hover:underline">
                    {matter.reference} — {matter.title}
                  </Link>
                ) : (
                  <p className="text-admin-text-muted">Unlinked</p>
                )}
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Collected By</p>
                <p className="font-medium text-admin-text">{collector ? collector.name : "Operative"}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Collection Date</p>
                <p className="font-mono text-admin-text">
                  {item.collected_at ? new Date(item.collected_at).toLocaleString("en-GB") : "—"}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Source Origin</p>
                <p className="text-admin-text">{item.source || "Direct Fieldwork"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
