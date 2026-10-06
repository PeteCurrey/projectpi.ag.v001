import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FolderOpen,
  Calendar,
  Clock,
  ShieldCheck,
  FileText,
  FileBarChart,
  Brain,
  Building,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Stamp,
  Activity,
} from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import PriorityIndicator from "../../components/PriorityIndicator";
import {
  getCaseById,
  getClientById,
  getUserById,
  getTasksByCase,
  getEvidenceByCase,
  FIXTURE_CASE_EVENTS,
  getAuditEventsByCase,
} from "@/lib/admin/fixtures";

export const metadata = {
  title: "Matter Workspace | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminMatterWorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ matterId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const activeTab = resolvedSearch.tab || "overview";

  const matter = getCaseById(resolvedParams.matterId);
  if (!matter) {
    notFound();
  }

  const client = getClientById(matter.client_organisation_id);
  const leadInvestigator = matter.lead_investigator_id
    ? getUserById(matter.lead_investigator_id)
    : null;
  const caseManager = matter.case_manager_id
    ? getUserById(matter.case_manager_id)
    : null;

  const tasks = getTasksByCase(matter.id);
  const evidence = getEvidenceByCase(matter.id);
  const events = FIXTURE_CASE_EVENTS.filter((e) => e.matter_id === matter.id);
  const audits = getAuditEventsByCase(matter.id);

  const tabs = [
    { id: "overview", label: "Overview", icon: FolderOpen },
    { id: "timeline", label: `Timeline (${events.length})`, icon: Activity },
    { id: "tasks", label: `Tasks (${tasks.length})`, icon: Clock },
    { id: "evidence", label: `Evidence (${evidence.length})`, icon: ShieldCheck },
    { id: "reports", label: "Reports", icon: FileBarChart },
    { id: "audit", label: `Audit Log (${audits.length})`, icon: FileText },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label={`CASE WORKSPACE / ${matter.reference}`}
        title={matter.title}
        description={`Instructing Organisation: ${client ? client.legal_name : "Private Client"} · Matter Type: ${matter.matter_type.replace(/_/g, " ")}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/matters"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Directory
            </Link>
            <StatusBadge status={matter.status} />
            <PriorityIndicator priority={matter.priority} showLabel />
          </div>
        }
      />

      {/* WORKSPACE NAVIGATION TABS */}
      <div className="border-b border-admin-border flex items-center gap-1 overflow-x-auto text-xs font-mono">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/admin/matters/${matter.id}?tab=${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 border-b-2 font-medium transition-colors ${
                isActive
                  ? "border-admin-accent text-admin-text bg-white"
                  : "border-transparent text-admin-text-muted hover:text-admin-text hover:bg-admin-surface/40"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* INSTRUCTION SUMMARY */}
            <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
                Instruction Narrative & Objectives
              </h2>
              <p className="text-xs sm:text-sm text-admin-text leading-relaxed whitespace-pre-line bg-admin-surface/30 p-4 border border-admin-border rounded-xs">
                {matter.description || "No specific instructions entered."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div>
                  <span className="text-[11px] font-mono text-admin-text-muted block">Matter Opened</span>
                  <span className="font-mono text-admin-text font-medium">
                    {new Date(matter.opened_at).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-admin-text-muted block">Target Completion</span>
                  <span className="font-mono text-admin-text font-medium">
                    {matter.target_date ? new Date(matter.target_date).toLocaleDateString("en-GB") : "Open"}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-admin-text-muted block">Retention Standing</span>
                  <span className="font-mono text-emerald-700 font-medium">{matter.retention_status}</span>
                </div>
              </div>
            </div>

            {/* LIVE OPERATIONAL TASKS SUMMARY */}
            <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5">
              <div className="flex items-center justify-between border-b border-admin-border pb-3 mb-3">
                <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                  Pending Operational Tasks ({tasks.length})
                </h2>
                <Link
                  href={`/admin/matters/${matter.id}?tab=tasks`}
                  className="text-[11px] font-mono text-admin-accent hover:underline"
                >
                  Manage All
                </Link>
              </div>

              {tasks.length === 0 ? (
                <p className="text-xs text-admin-text-muted py-3">No tasks assigned to this matter.</p>
              ) : (
                <div className="divide-y divide-admin-border-subtle">
                  {tasks.map((task) => (
                    <div key={task.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <PriorityIndicator priority={task.priority} />
                        <div>
                          <p className="font-medium text-admin-text">{task.title}</p>
                          <p className="text-[11px] text-admin-text-muted">
                            Due: {task.due_at ? new Date(task.due_at).toLocaleDateString("en-GB") : "Flexible"}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={task.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: CASE METADATA */}
          <div className="space-y-6">
            {/* CLIENT CARD */}
            <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
                Instructing Client
              </h2>
              {client ? (
                <div className="text-xs space-y-1.5">
                  <p className="font-medium text-admin-text text-sm">{client.legal_name}</p>
                  <p className="text-[11px] font-mono text-admin-text-muted uppercase">{client.client_type}</p>
                  <p className="text-admin-text-secondary">{client.email || "No email"}</p>
                  <p className="text-admin-text-secondary">{client.telephone || "No telephone"}</p>
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="inline-block mt-2 text-[11px] font-mono text-admin-accent hover:underline"
                  >
                    View Client Profile →
                  </Link>
                </div>
              ) : (
                <p className="text-xs text-admin-text-muted">Direct Private Instruction</p>
              )}
            </div>

            {/* ASSIGNED INVESTIGATIVE TEAM */}
            <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
                Case Directorate
              </h2>
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-[11px] font-mono text-admin-text-muted block">Lead Operative</span>
                  <p className="font-medium text-admin-text">
                    {leadInvestigator ? leadInvestigator.name : "Unassigned"}
                  </p>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-admin-text-muted block">Case Manager</span>
                  <p className="font-medium text-admin-text">
                    {caseManager ? caseManager.name : "Unassigned"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TIMELINE */}
      {activeTab === "timeline" && (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
            Chronological Matter Events
          </h2>
          {events.length === 0 ? (
            <p className="text-xs text-admin-text-muted">No chronological events logged for this matter.</p>
          ) : (
            <div className="space-y-4">
              {events.map((evt) => (
                <div key={evt.id} className="border-l-2 border-admin-accent pl-4 py-1 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-admin-text uppercase">{evt.event_type}</span>
                    <span className="text-admin-text-muted">
                      {new Date(evt.occurred_at).toLocaleString("en-GB")}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-admin-text">{evt.title}</p>
                  <p className="text-xs text-admin-text-secondary leading-relaxed">{evt.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: TASKS */}
      {activeTab === "tasks" && (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
            Operational Action Items
          </h2>
          <div className="divide-y divide-admin-border">
            {tasks.map((task) => (
              <div key={task.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-admin-text text-sm">{task.title}</p>
                  <p className="text-xs text-admin-text-muted mt-0.5">{task.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <PriorityIndicator priority={task.priority} showLabel />
                  <StatusBadge status={task.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: EVIDENCE */}
      {activeTab === "evidence" && (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
            Forensic & Investigative Evidence Register
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-admin-border text-admin-text-faint font-mono text-[10px] uppercase">
                  <th className="pb-2">Evidence Item</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Classification</th>
                  <th className="pb-2">SHA-256 Hash</th>
                  <th className="pb-2">Date Secured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border-subtle">
                {evidence.map((evi) => (
                  <tr key={evi.id}>
                    <td className="py-2.5 pr-2 font-medium text-admin-text">{evi.title}</td>
                    <td className="py-2.5 pr-2 font-mono text-[10px] uppercase text-admin-text-secondary">
                      {evi.evidence_type}
                    </td>
                    <td className="py-2.5 pr-2">
                      <span className="px-1.5 py-0.5 bg-admin-surface border border-admin-border text-[10px] font-mono">
                        {evi.classification || "CONFIDENTIAL"}
                      </span>
                    </td>
                    <td className="py-2.5 pr-2 font-mono text-[10px] text-admin-text-muted truncate max-w-xs">
                      {evi.integrity_hash || "PENDING VERIFICATION"}
                    </td>
                    <td className="py-2.5 font-mono text-[11px] text-admin-text-muted">
                      {evi.collected_at ? new Date(evi.collected_at).toLocaleDateString("en-GB") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: REPORTS */}
      {activeTab === "reports" && (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
            Investigation Reports & Affidavits
          </h2>
          <div className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs text-xs space-y-2">
            <p className="font-medium text-admin-text">Report Generation Protocol</p>
            <p className="text-admin-text-muted">
              All formal reports, proof of service statements, and executive summaries must be reviewed by the Case Manager or Director before client release.
            </p>
            <div className="pt-2">
              <Link
                href="/admin/reports"
                className="px-3 py-1.5 text-xs font-mono uppercase bg-admin-text text-white rounded-xs hover:bg-admin-text/90"
              >
                Access Reports Central
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
            Immutable Audit Trail for this Matter
          </h2>
          <div className="space-y-2 text-xs">
            {audits.map((a) => (
              <div key={a.id} className="p-2.5 bg-admin-surface/40 border border-admin-border rounded-xs flex items-center justify-between font-mono">
                <div>
                  <span className="font-semibold text-admin-text">{a.action}</span>
                  <span className="text-admin-text-muted ml-2">({a.notes})</span>
                </div>
                <span className="text-[11px] text-admin-text-muted">
                  {new Date(a.occurred_at).toLocaleString("en-GB")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
