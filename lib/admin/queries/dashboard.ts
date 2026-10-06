// ============================================================
// DASHBOARD QUERIES
// All dashboard metrics derived from fixture data.
// TODO: Replace each function with a real DB query.
// ============================================================

import {
  FIXTURE_CASES,
  FIXTURE_LEADS,
  FIXTURE_TASKS,
  FIXTURE_EVIDENCE,
  FIXTURE_CASE_EVENTS,
  getActiveCases,
  getNewLeads,
  getOpenLeads,
  getTasksDueToday,
  getOverdueTasks,
  getEvidenceAwaitingReview,
  FIXTURE_CLIENTS,
  getUserById,
  getClientById,
} from "@/lib/admin/fixtures";
import type { Matter, Enquiry, MatterTask } from "@/lib/db/types";

export interface DashboardMetrics {
  activeCases: number;
  newEnquiries: number;
  openLeads: number;
  casesRequiringAction: number;
  overdueTasks: number;
  upcomingAppointments: number;
  evidenceAwaitingReview: number;
  reportsPending: number;
}

/** Aggregate all top-level dashboard KPI metrics from fixture data. */
export function getDashboardMetrics(): DashboardMetrics {
  const activeCases = getActiveCases().length;
  const newEnquiries = getNewLeads().length;
  const openLeads = getOpenLeads().length;

  // Cases requiring action = cases with status AWAITING_CLIENT or NEW with no investigator
  const casesRequiringAction = FIXTURE_CASES.filter(
    (c) =>
      c.status === "AWAITING_CLIENT" ||
      c.status === "AWAITING_INFORMATION" ||
      (c.status === "NEW" && !c.lead_investigator_id)
  ).length;

  const overdueTasks = getOverdueTasks().length;

  // Upcoming appointments = tasks due in next 7 days
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const upcomingAppointments = FIXTURE_TASKS.filter((t) => {
    if (!t.due_at || t.status === "COMPLETED" || t.status === "CANCELLED") return false;
    const due = new Date(t.due_at);
    return due >= now && due <= nextWeek;
  }).length;

  const evidenceAwaitingReview = getEvidenceAwaitingReview().length;

  // Reports pending = cases in REPORTING status
  const reportsPending = FIXTURE_CASES.filter((c) => c.status === "REPORTING").length;

  return {
    activeCases,
    newEnquiries,
    openLeads,
    casesRequiringAction,
    overdueTasks,
    upcomingAppointments,
    evidenceAwaitingReview,
    reportsPending,
  };
}

export interface RecentCaseActivity {
  caseId: string;
  reference: string;
  title: string;
  clientName: string;
  caseType: string;
  status: string;
  lastActivity: string;
  lastActivityAt: string;
  investigatorName: string;
  priority: string;
}

/** Recent case activity for the dashboard activity table. */
export function getRecentCaseActivity(limit = 6): RecentCaseActivity[] {
  const activeCases = getActiveCases();

  return activeCases
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, limit)
    .map((c) => {
      const client = getClientById(c.client_organisation_id);
      const investigator = c.lead_investigator_id
        ? getUserById(c.lead_investigator_id)
        : null;

      // Find the most recent event for this case
      const latestEvent = FIXTURE_CASE_EVENTS.filter((e) => e.matter_id === c.id)
        .sort((a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime())[0];

      return {
        caseId: c.id,
        reference: c.reference,
        title: c.title,
        clientName: client?.trading_name ?? client?.legal_name ?? "Unknown",
        caseType: c.matter_type,
        status: c.status,
        lastActivity: latestEvent?.title ?? "Case opened",
        lastActivityAt: latestEvent?.occurred_at ?? c.updated_at,
        investigatorName: investigator?.name ?? "Unassigned",
        priority: c.priority,
      };
    });
}

export interface NewEnquirySummary {
  id: string;
  reference: string;
  name: string;
  company: string;
  service: string;
  urgency: string;
  receivedAt: string;
  status: string;
}

/** New and reviewing enquiries for the dashboard leads panel. */
export function getNewEnquirySummaries(limit = 5): NewEnquirySummary[] {
  return FIXTURE_LEADS.filter((l) => ["NEW", "UNDER_REVIEW"].includes(l.status))
    .sort((a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime())
    .slice(0, limit)
    .map((l) => ({
      id: l.id,
      reference: l.reference,
      name: l.contact_name,
      company: l.organisation_name ?? "",
      service: l.enquiry_type,
      urgency: l.urgency,
      receivedAt: l.submitted_at,
      status: l.status,
    }));
}

export interface TodayItem {
  id: string;
  title: string;
  caseReference: string;
  assignee: string;
  priority: string;
  dueAt: string;
  type: "TASK";
}

/** Tasks due today for the dashboard Today panel. */
export function getTodayItems(): TodayItem[] {
  const todayTasks = getTasksDueToday();
  return todayTasks.map((t) => {
    const matter = FIXTURE_CASES.find((c) => c.id === t.matter_id);
    const assignee = t.assigned_to ? getUserById(t.assigned_to) : null;
    return {
      id: t.id,
      title: t.title,
      caseReference: matter?.reference ?? "—",
      assignee: assignee?.name ?? "Unassigned",
      priority: t.priority,
      dueAt: t.due_at ?? "",
      type: "TASK" as const,
    };
  });
}
