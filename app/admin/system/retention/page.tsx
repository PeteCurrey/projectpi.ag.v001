import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { ArchiveRestore, AlertTriangle, ShieldCheck, Clock } from "lucide-react";
import { DEFAULT_RETENTION_POLICIES } from "@/lib/retention/policy";

export const metadata: Metadata = {
  title: "Data Retention — Admin",
  robots: "noindex, nofollow",
};

export default function DataRetentionPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="System / Data Retention"
        title="Statutory Data Retention & Destruction Lifecycle"
        description="GDPR Article 5(1)(e) storage limitation policies, Limitation Act 1980 7-year case file schedules, and legal hold registers."
      />

      <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-sm flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-semibold uppercase tracking-wider font-mono text-[11px]">
            Strict Non-Automated Destruction Policy
          </p>
          <p className="text-admin-text-secondary leading-relaxed">
            Case files and evidence items reaching maturity are transferred to <strong>Scheduled Review</strong>. The platform will never automatically delete case records or evidence exhibits without positive dual-signoff confirmation from a Director or Compliance Officer.
          </p>
        </div>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Entity Type</th>
              <th className="p-3">Retention Schedule</th>
              <th className="p-3">Trigger Event</th>
              <th className="p-3">Statutory Legal Basis</th>
              <th className="p-3">Human Approval</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {DEFAULT_RETENTION_POLICIES.map((p, idx) => (
              <tr key={idx} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3 font-semibold text-admin-text">{p.label}</td>
                <td className="p-3 font-mono font-medium text-admin-accent whitespace-nowrap">
                  {Math.round(p.retentionPeriodDays / 365)} Years ({p.retentionPeriodDays} days)
                </td>
                <td className="p-3 font-mono text-[11px] text-admin-text-secondary whitespace-nowrap">
                  {p.retentionTrigger.replace(/_/g, " ")}
                </td>
                <td className="p-3 text-admin-text-muted max-w-sm">{p.legalBasis}</td>
                <td className="p-3 font-mono text-[11px] whitespace-nowrap">
                  {p.requiresHumanApproval ? (
                    <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-xs">
                      Mandatory
                    </span>
                  ) : (
                    <span className="text-stone-600 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded-xs">
                      Auto-Archive
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
