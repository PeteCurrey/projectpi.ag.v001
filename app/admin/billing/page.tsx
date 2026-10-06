import React from "react";
import Link from "next/link";
import { Receipt, AlertCircle, Clock } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";

export const metadata = {
  title: "Billing & Invoicing (Future-Ready) | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminBillingPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="COMMERCIAL & ACCOUNTS"
        title="Fee Schedules, Retainers & Invoicing Foundation"
        description="Accounting ledger, disbursements tracking and solicitor fee billing."
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 space-y-1">
            <p className="font-semibold uppercase tracking-wider font-mono">
              Future-Ready Accounting Integration Module
            </p>
            <p className="leading-relaxed">
              The underlying database schema (<code className="font-mono text-amber-950">lib/db/types.ts</code>) contains full support for Billable Items, Retainers, VAT accounting, and Invoices. Active Stripe/Xero API synchronisation will be enabled in the commercial release.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-admin-border grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs">
            <span className="text-[11px] font-mono text-admin-text-faint uppercase block">Recorded Disbursements</span>
            <p className="text-2xl font-serif font-semibold text-admin-text mt-1">£3,450.00</p>
            <p className="text-[11px] text-admin-text-muted mt-1">Recorded operational expenses awaiting billing generation</p>
          </div>
          <div className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs">
            <span className="text-[11px] font-mono text-admin-text-faint uppercase block">Logged Billable Hours</span>
            <p className="text-2xl font-serif font-semibold text-admin-text mt-1">£12,800.00</p>
            <p className="text-[11px] text-admin-text-muted mt-1">Investigative and fieldwork time recorded on active matters</p>
          </div>
          <div className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs">
            <span className="text-[11px] font-mono text-admin-text-faint uppercase block">Agreed Retainer Baseline</span>
            <p className="text-2xl font-serif font-semibold text-emerald-800 mt-1">£25,000.00</p>
            <p className="text-[11px] text-admin-text-muted mt-1">Contractual advance funds recorded on matter files</p>
          </div>
        </div>
      </div>
    </div>
  );
}
