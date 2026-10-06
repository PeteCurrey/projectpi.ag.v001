import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Inbox } from "lucide-react";

import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import EmptyState from "@/app/admin/components/EmptyState";
import { FIXTURE_LEADS, FIXTURE_USERS } from "@/lib/admin/fixtures";
import { formatShortDate, formatDistanceToNow } from "@/lib/admin/utils/dates";

export const metadata: Metadata = {
  title: "Leads — Admin",
  robots: "noindex, nofollow",
};

const ENQUIRY_TYPE_LABELS: Record<string, string> = {
  PROCESS_SERVING:  "Process Serving",
  FRAUD_FINANCIAL:  "Fraud / Financial",
  SURVEILLANCE:     "Surveillance",
  TRACING:          "Tracing",
  INTELLIGENCE:     "Intelligence",
  OSINT:            "OSINT",
  DUE_DILIGENCE:    "Due Diligence",
  ASSET_TRACING:    "Asset Tracing",
};

const TABS = [
  { label: "All",          value: "ALL" },
  { label: "New",          value: "NEW" },
  { label: "Under Review", value: "UNDER_REVIEW" },
  { label: "Qualified",    value: "QUALIFIED" },
  { label: "Instructed",   value: "INSTRUCTED" },
  { label: "Closed",       value: "CLOSED" },
] as const;

export default function LeadsPage() {
  const leads = FIXTURE_LEADS;

  // Derived counts — no hardcoding
  const totalCount     = leads.length;
  const newCount       = leads.filter((l) => l.status === "NEW").length;
  const openCount      = leads.filter((l) =>
    !["INSTRUCTED", "DECLINED", "CLOSED"].includes(l.status)
  ).length;
  const convertedCount = leads.filter((l) => l.status === "INSTRUCTED").length;

  // Build a user lookup map
  const userMap = Object.fromEntries(FIXTURE_USERS.map((u) => [u.id, u.name]));

  return (
    <div className="flex flex-col h-full">
      <AdminPageHeader
        label="WORK / LEADS"
        title="Leads & Enquiries"
        description="Incoming enquiries and their conversion status."
        actions={
          <Link
            href="/admin/leads/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-admin-text text-white rounded-sm hover:bg-admin-text/90 transition-colors"
          >
            <Inbox className="w-3 h-3" />
            Log Enquiry
          </Link>
        }
      />

      {/* Stats bar */}
      <div className="flex items-stretch border-b border-admin-border divide-x divide-admin-border">
        {[
          { label: "Total",     value: totalCount },
          { label: "New",       value: newCount,       accent: newCount > 0 },
          { label: "Open",      value: openCount },
          { label: "Converted", value: convertedCount },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col px-6 py-3 min-w-[100px]">
            <span className="text-[9px] font-mono uppercase tracking-widest text-admin-text-faint mb-0.5">
              {stat.label}
            </span>
            <span className={`text-lg font-medium leading-none ${stat.accent ? "text-red-600" : "text-admin-text"}`}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-0 border-b border-admin-border px-6 overflow-x-auto">
        {TABS.map((tab) => {
          const count =
            tab.value === "ALL"
              ? leads.length
              : leads.filter((l) => l.status === tab.value).length;
          return (
            <button
              key={tab.value}
              className="flex items-center gap-1.5 px-3 py-2.5 text-[11px] font-medium text-admin-text-muted hover:text-admin-text border-b-2 border-transparent whitespace-nowrap transition-colors"
            >
              {tab.label}
              {count > 0 && (
                <span className="inline-flex items-center justify-center w-4 h-4 text-[9px] font-mono rounded-full bg-admin-surface text-admin-text-muted">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {leads.length === 0 ? (
          <EmptyState
            title="No enquiries"
            description="Incoming leads will appear here once received."
          />
        ) : (
          <table className="w-full text-left">
            <thead className="bg-admin-surface border-b border-admin-border sticky top-0">
              <tr>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Reference
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Contact
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Organisation
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Service
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Urgency
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Status
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Received
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Assigned
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2 text-right">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-b border-admin-border hover:bg-admin-surface/50 transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-mono text-xs text-admin-accent hover:underline"
                    >
                      {lead.reference}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap">
                    {lead.contact_name}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary max-w-[200px] truncate">
                    {lead.organisation_name ?? (
                      <span className="text-admin-text-faint">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap">
                    {ENQUIRY_TYPE_LABELS[lead.enquiry_type] ?? lead.enquiry_type}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={lead.urgency} />
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-muted whitespace-nowrap">
                    <span title={formatShortDate(lead.submitted_at)}>
                      {formatDistanceToNow(lead.submitted_at)}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap">
                    {lead.assigned_to ? (
                      userMap[lead.assigned_to] ?? lead.assigned_to
                    ) : (
                      <span className="text-admin-text-faint">Unassigned</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="inline-flex items-center gap-1 text-[11px] text-admin-text-faint hover:text-admin-accent transition-colors"
                    >
                      View
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
