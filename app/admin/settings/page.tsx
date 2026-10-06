import React from "react";
import Link from "next/link";
import { Settings2, ShieldCheck, Database, FileCheck } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";

export const metadata = {
  title: "Firm Governance & Compliance Settings | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminSettingsPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="FIRM ADMINISTRATION"
        title="Governance, Data Retention & Operational Policies"
        description="Statutory retention rules, cryptographic hash verification, security controls and firm metadata."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DATA RETENTION SCHEDULES */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-admin-border pb-3">
            <Database className="w-4 h-4 text-admin-accent" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
              Retention Schedules & Legal Hold Controls
            </h2>
          </div>
          <div className="text-xs space-y-3 text-admin-text-secondary leading-relaxed">
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-admin-text">Completed Casework Files</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white border border-admin-border text-admin-text-secondary">BUSINESS POLICY</span>
              </div>
              <p className="text-[11px] text-admin-text-muted">
                Retained for 6 years post-closure as an internal policy aligned with the standard limitation period under the Limitation Act 1980 for potential contractual or professional negligence claims.
              </p>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-admin-text">Surveillance Raw Video & Audio</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white border border-admin-border text-admin-text-secondary">OPERATIONAL DEFAULT</span>
              </div>
              <p className="text-[11px] text-admin-text-muted">
                Scheduled for deliberate retention review 90 days following case completion. Raw footage is not automatically deleted if an active legal hold, pending litigation, or client instruction exists.
              </p>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-admin-text">Declined & Uninstructed Enquiries</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white border border-admin-border text-admin-text-secondary">BUSINESS POLICY</span>
              </div>
              <p className="text-[11px] text-admin-text-muted">
                Internal review and purge cycle set at 30 days under data minimisation principles, provided no conflict-check history, complaint, or fraud prevention requirement applies.
              </p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-[11px] text-amber-900">
              <span className="font-semibold block">LEGAL HOLD OVERRIDE</span>
              Any matter, document, or evidence item marked with retention status <code className="font-mono">LEGAL_HOLD</code> is locked against automated or manual deletion schedules until formally released by the Director.
            </div>
          </div>
        </div>

        {/* SECURITY & DATA PROTECTION POSTURE */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-admin-border pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
              Security Controls & Cryptographic Verification
            </h2>
          </div>
          <div className="text-xs space-y-3 text-admin-text-secondary leading-relaxed">
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Transport & Storage Encryption</p>
                <p className="text-[11px] text-admin-text-muted">TLS in transit; hosting platform-level encryption at rest</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ACTIVE</span>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Evidence Checksum Verification</p>
                <p className="text-[11px] text-admin-text-muted">SHA-256 integrity hash calculated upon upload</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ENFORCED</span>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Administrative Audit Trail</p>
                <p className="text-[11px] text-admin-text-muted">Append-only operational event logging with IP/actor tracking</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ACTIVE</span>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">MFA Enforcement Status</p>
                <p className="text-[11px] text-admin-text-muted">TOTP Authenticator supported; required for Admin roles</p>
              </div>
              <span className="font-mono text-admin-accent font-semibold text-[11px]">CONFIGURED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
