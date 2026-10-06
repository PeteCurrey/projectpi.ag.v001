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
        {/* DATA RETENTION POLICY */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-admin-border pb-3">
            <Database className="w-4 h-4 text-admin-accent" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
              Statutory Data Retention Schedules
            </h2>
          </div>
          <div className="text-xs space-y-3 text-admin-text-secondary leading-relaxed">
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <p className="font-semibold text-admin-text">Active Casework & Reports</p>
              <p className="text-[11px] text-admin-text-muted mt-0.5">
                Retained for 6 years post-closure in compliance with Limitation Act 1980 for professional negligence and CPR disclosure.
              </p>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <p className="font-semibold text-admin-text">Surveillance Raw Footage & Audio</p>
              <p className="text-[11px] text-admin-text-muted mt-0.5">
                Scheduled for purge review 90 days following case completion unless marked for formal trial exhibit retention.
              </p>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs">
              <p className="font-semibold text-admin-text">Declined Enquiries & Intake Briefs</p>
              <p className="text-[11px] text-admin-text-muted mt-0.5">
                Purged after 30 days in strict accordance with UK GDPR data minimisation standards.
              </p>
            </div>
          </div>
        </div>

        {/* SECURITY & COMPLIANCE POSTURE */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-admin-border pb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
              Security & Cryptographic Standards
            </h2>
          </div>
          <div className="text-xs space-y-3 text-admin-text-secondary leading-relaxed">
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Storage Encryption</p>
                <p className="text-[11px] text-admin-text-muted">AES-256 at rest with customer-managed key support</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ACTIVE</span>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Evidence Hashing</p>
                <p className="text-[11px] text-admin-text-muted">SHA-256 tamper-evident integrity calculation</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ENFORCED</span>
            </div>
            <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs flex justify-between items-center">
              <div>
                <p className="font-semibold text-admin-text">Append-Only Audit Trail</p>
                <p className="text-[11px] text-admin-text-muted">Immutable security log with user & IP telemetry</p>
              </div>
              <span className="font-mono text-emerald-700 font-semibold text-[11px]">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
