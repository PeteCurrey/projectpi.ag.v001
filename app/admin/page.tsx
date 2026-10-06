import type { Metadata } from "next";
import Link from "next/link";
import {
  getDashboardMetrics,
  getRecentCaseActivity,
  getNewEnquirySummaries,
  getTodayItems,
} from "@/lib/admin/queries/dashboard";
import { getRecentAuditEvents } from "@/lib/admin/fixtures/audit";
import MetricCard from "./components/MetricCard";
import StatusBadge from "./components/StatusBadge";
import PriorityIndicator from "./components/PriorityIndicator";
import { formatDistanceToNow } from "@/lib/admin/utils/dates";
import { ChevronRight, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: "noindex, nofollow",
};

// ── Helpers ──────────────────────────────────────────────────
function caseTypeLabel(type: string): string {
  const MAP: Record<string, string> = {
    FRAUD:           "Fraud",
    PROCESS_SERVING: "Process Serving",
    SURVEILLANCE:    "Surveillance",
    ASSET_TRACING:   "Asset Tracing",
    DUE_DILIGENCE:   "Due Diligence",
    TRACING:         "Tracing",
    OSINT:           "OSINT",
    BACKGROUND:      "Background",
    INTELLIGENCE:    "Intelligence",
  };
  return MAP[type] ?? type;
}

function enquiryTypeLabel(type: string): string {
  return type
    .split("_")
    .map((w) => w[0] + w.slice(1).toLowerCase())
    .join(" ");
}

// ── Page ─────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const metrics = getDashboardMetrics();
  const recentCases = getRecentCaseActivity();
  const newEnquiries = getNewEnquirySummaries();
  const todayItems = getTodayItems();
  const recentAudit = getRecentAuditEvents(5);

  const now = new Date();
  const dateLabel = now.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-5">
      {/* Page heading */}
      <div className="mb-5 flex items-baseline justify-between">
        <div>
          <p className="admin-label mb-1">Command</p>
          <h1 className="text-base font-medium text-admin-text">Operational Dashboard</h1>
        </div>
        <p className="text-[11px] text-admin-text-muted font-mono">{dateLabel}</p>
      </div>

      {/* ── KPI Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Active Cases"
          value={metrics.activeCases}
          subtext="investigations in progress"
          href="/admin/cases"
        />
        <MetricCard
          label="New Enquiries"
          value={metrics.newEnquiries}
          subtext={metrics.newEnquiries > 0 ? "awaiting review" : "no new enquiries"}
          alert={metrics.newEnquiries > 0}
          alertLabel={`${metrics.newEnquiries} require triage`}
          href="/admin/leads"
        />
        <MetricCard
          label="Overdue Tasks"
          value={metrics.overdueTasks}
          alert={metrics.overdueTasks > 0}
          alertLabel={metrics.overdueTasks > 0 ? "require immediate attention" : undefined}
          subtext="no overdue tasks"
          href="/admin/tasks"
        />
        <MetricCard
          label="Cases Requiring Action"
          value={metrics.casesRequiringAction}
          alert={metrics.casesRequiringAction > 0}
          alertLabel={metrics.casesRequiringAction > 0 ? "waiting on client or assignment" : undefined}
          subtext="all cases progressing"
          href="/admin/cases"
        />
        <MetricCard
          label="Open Leads"
          value={metrics.openLeads}
          subtext="in pipeline"
          href="/admin/leads"
        />
        <MetricCard
          label="Today's Tasks"
          value={metrics.upcomingAppointments}
          subtext="due in next 7 days"
          href="/admin/tasks"
        />
        <MetricCard
          label="Evidence Awaiting Review"
          value={metrics.evidenceAwaitingReview}
          alert={metrics.evidenceAwaitingReview > 0}
          alertLabel={metrics.evidenceAwaitingReview > 0 ? "integrity unverified" : undefined}
          subtext="all evidence verified"
          href="/admin/evidence"
        />
        <MetricCard
          label="Reports Pending"
          value={metrics.reportsPending}
          subtext="in reporting stage"
          href="/admin/reports"
        />
      </div>

      {/* ── Main content grid ─────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Case activity — 2 cols */}
        <div className="col-span-2">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
              <span className="text-[12px] font-medium text-admin-text">Active Cases</span>
              <Link
                href="/admin/cases"
                className="text-[10px] text-admin-text-muted hover:text-admin-accent font-mono uppercase tracking-wider flex items-center gap-0.5 transition-colors"
              >
                All cases <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-admin-surface">
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Reference</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Matter</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Type</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Status</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">P</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Investigator</th>
                    <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((c) => (
                    <tr
                      key={c.caseId}
                      className="border-t border-admin-border-subtle hover:bg-admin-surface/50 transition-colors"
                    >
                      <td className="px-4 py-2.5">
                        <Link
                          href={`/admin/cases/${c.reference}`}
                          className="text-[11px] font-mono text-admin-accent hover:underline"
                        >
                          {c.reference}
                        </Link>
                      </td>
                      <td className="px-4 py-2.5">
                        <div>
                          <Link
                            href={`/admin/cases/${c.reference}`}
                            className="text-[12px] text-admin-text hover:text-admin-accent transition-colors line-clamp-1"
                          >
                            {c.title}
                          </Link>
                          <p className="text-[10px] text-admin-text-muted mt-0.5">{c.clientName}</p>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-admin-text-muted whitespace-nowrap">
                        {caseTypeLabel(c.caseType)}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="px-4 py-2.5">
                        <PriorityIndicator priority={c.priority} />
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-admin-text-secondary">
                        {c.investigatorName}
                      </td>
                      <td className="px-4 py-2.5 text-[10px] text-admin-text-muted whitespace-nowrap">
                        {formatDistanceToNow(c.lastActivityAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Today panel */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
              <span className="text-[12px] font-medium text-admin-text">Today</span>
              <Link
                href="/admin/tasks"
                className="text-[10px] text-admin-text-muted hover:text-admin-accent font-mono uppercase tracking-wider flex items-center gap-0.5 transition-colors"
              >
                All tasks <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-admin-border-subtle">
              {todayItems.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-[11px] text-admin-text-muted">No tasks due today</p>
                </div>
              ) : (
                todayItems.map((item) => (
                  <div key={item.id} className="px-4 py-2.5">
                    <div className="flex items-start gap-2">
                      <PriorityIndicator priority={item.priority} />
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/admin/tasks/${item.id}`}
                          className="text-[12px] text-admin-text hover:text-admin-accent transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <p className="text-[10px] text-admin-text-muted mt-0.5 font-mono">
                          {item.caseReference}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New enquiries */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
              <span className="text-[12px] font-medium text-admin-text">New Enquiries</span>
              <Link
                href="/admin/leads"
                className="text-[10px] text-admin-text-muted hover:text-admin-accent font-mono uppercase tracking-wider flex items-center gap-0.5 transition-colors"
              >
                All leads <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-admin-border-subtle">
              {newEnquiries.length === 0 ? (
                <div className="px-4 py-6 text-center">
                  <p className="text-[11px] text-admin-text-muted">No new enquiries</p>
                </div>
              ) : (
                newEnquiries.map((enq) => (
                  <Link
                    key={enq.id}
                    href={`/admin/leads/${enq.id}`}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-admin-surface/50 transition-colors block"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[12px] font-medium text-admin-text truncate">
                          {enq.company || enq.name}
                        </p>
                        <StatusBadge status={enq.urgency} />
                      </div>
                      <p className="text-[10px] text-admin-text-muted mt-0.5">
                        {enquiryTypeLabel(enq.service)} · {formatDistanceToNow(enq.receivedAt)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent audit events */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
              <span className="text-[12px] font-medium text-admin-text">Recent Activity</span>
              <Link
                href="/admin/system/audit"
                className="text-[10px] text-admin-text-muted hover:text-admin-accent font-mono uppercase tracking-wider flex items-center gap-0.5 transition-colors"
              >
                Audit log <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="divide-y divide-admin-border-subtle">
              {recentAudit.map((event) => {
                const isAlert = event.action?.includes("FAILED") || event.action?.includes("LOCKED");
                return (
                  <div key={event.id} className="px-4 py-2.5 flex items-start gap-2">
                    {isAlert && (
                      <AlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-admin-text-secondary truncate">
                        {event.notes ?? event.action}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-admin-text-faint">
                          {event.action}
                        </span>
                        <span className="text-[10px] text-admin-text-faint">
                          · {formatDistanceToNow(event.occurred_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
