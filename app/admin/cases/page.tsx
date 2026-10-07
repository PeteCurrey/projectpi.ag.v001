import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";

import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import PriorityIndicator from "@/app/admin/components/PriorityIndicator";
import EmptyState from "@/app/admin/components/EmptyState";
import {
  FIXTURE_CASES,
  FIXTURE_CLIENTS,
  FIXTURE_USERS,
} from "@/lib/admin/fixtures";
import { formatShortDate } from "@/lib/admin/utils/dates";

export const metadata: Metadata = {
  title: "Cases — Admin",
  robots: "noindex, nofollow",
};

const MATTER_TYPE_LABELS: Record<string, string> = {
  FRAUD:           "Fraud",
  PROCESS_SERVING: "Process Serving",
  ASSET_TRACING:   "Asset Tracing",
  DUE_DILIGENCE:   "Due Diligence",
  SURVEILLANCE:    "Surveillance",
  TRACING:         "Tracing",
  OSINT:           "OSINT",
  INTELLIGENCE:    "Intelligence",
};

const TABS = [
  { label: "All",        value: "ALL" },
  { label: "Active",     value: "OPEN" },
  { label: "In Progress",value: "IN_PROGRESS" },
  { label: "Fieldwork",  value: "FIELDWORK" },
  { label: "Reporting",  value: "REPORTING" },
  { label: "Completed",  value: "COMPLETED" },
] as const;

export default function CasesPage() {
  const cases = FIXTURE_CASES;

  // Lookup maps
  const clientMap = Object.fromEntries(FIXTURE_CLIENTS.map((c) => [c.id, c.legal_name]));
  const userMap   = Object.fromEntries(FIXTURE_USERS.map((u) => [u.id, u.name]));

  // Derived stats
  const activeCases   = cases.filter((c) =>
    ["NEW", "OPEN", "IN_PROGRESS", "FIELDWORK", "AWAITING_CLIENT", "AWAITING_INFORMATION"].includes(c.status)
  ).length;
  const fieldworkCount  = cases.filter((c) => c.status === "FIELDWORK").length;
  const reportingCount  = cases.filter((c) => c.status === "REPORTING").length;

  // Completed this month
  const now = new Date();
  const completedThisMonth = cases.filter((c) => {
    if (c.status !== "COMPLETED" || !c.closed_at) return false;
    const closed = new Date(c.closed_at);
    return closed.getMonth() === now.getMonth() && closed.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="flex flex-col h-full">
      <AdminPageHeader
        label="WORK / CASES"
        title="Cases"
        description="Active matters and investigations."
        actions={
          <Link
            href="/admin/cases/new"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-admin-text text-white rounded-sm hover:bg-admin-text/90 transition-colors"
          >
            <FolderOpen className="w-3 h-3" />
            Open Case
          </Link>
        }
      />

      {/* Stats bar */}
      <div className="flex items-stretch border-b border-admin-border divide-x divide-admin-border">
        {[
          { label: "Active Cases",          value: activeCases },
          { label: "Fieldwork",             value: fieldworkCount },
          { label: "Reporting",             value: reportingCount },
          { label: "Completed This Month",  value: completedThisMonth },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col px-6 py-3 min-w-[120px]">
            <span className="text-[9px] font-mono uppercase tracking-widest text-admin-text-faint mb-0.5">
              {stat.label}
            </span>
            <span className="text-lg font-medium leading-none text-admin-text">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center border-b border-admin-border px-6 overflow-x-auto">
        {TABS.map((tab) => {
          const count =
            tab.value === "ALL"
              ? cases.length
              : cases.filter((c) => c.status === tab.value).length;
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
        {cases.length === 0 ? (
          <EmptyState
            title="No cases"
            description="Open matters will appear here."
          />
        ) : (
          <table className="w-full text-left">
            <thead className="bg-admin-surface border-b border-admin-border sticky top-0">
              <tr>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Reference
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Title
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Client
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Type
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Status
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Priority
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Investigator
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Opened
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2">
                  Target
                </th>
                <th className="text-[10px] font-mono uppercase tracking-wider text-admin-text-muted px-3 py-2 text-right">
                  &nbsp;
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-admin-border hover:bg-admin-surface/50 transition-colors"
                >
                  <td className="px-3 py-2.5">
                    <Link
                      href={`/admin/matters/${c.reference}`}
                      className="font-mono text-xs text-admin-accent hover:underline"
                    >
                      {c.reference}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary max-w-[260px] truncate">
                    {c.title}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap max-w-[180px] truncate">
                    {clientMap[c.client_organisation_id] ?? (
                      <span className="text-admin-text-faint">Unknown</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap">
                    {MATTER_TYPE_LABELS[c.matter_type] ?? c.matter_type}
                  </td>
                  <td className="px-3 py-2.5">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-3 py-2.5">
                    <PriorityIndicator priority={c.priority} showLabel />
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-secondary whitespace-nowrap">
                    {c.lead_investigator_id ? (
                      userMap[c.lead_investigator_id] ?? c.lead_investigator_id
                    ) : (
                      <span className="text-admin-text-faint">Unassigned</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-sm text-admin-text-muted whitespace-nowrap">
                    {formatShortDate(c.opened_at)}
                  </td>
                  <td className="px-3 py-2.5 text-sm whitespace-nowrap">
                    {c.target_date ? (
                      <span
                        className={
                          new Date(c.target_date) < new Date() && c.status !== "COMPLETED"
                            ? "text-red-600 font-medium"
                            : "text-admin-text-muted"
                        }
                      >
                        {formatShortDate(c.target_date)}
                      </span>
                    ) : (
                      <span className="text-admin-text-faint">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <Link
                      href={`/admin/matters/${c.reference}`}
                      className="inline-flex items-center gap-1 text-[11px] text-admin-text-faint hover:text-admin-accent transition-colors"
                    >
                      Open
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
