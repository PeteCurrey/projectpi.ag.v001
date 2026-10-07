import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatShortDate } from "@/lib/admin/utils/dates";
import { researchStore } from "@/lib/admin/research/store";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileBarChart,
  FileText,
  FlaskConical,
  Plus,
  Receipt,
  ShieldCheck,
  Target,
  User,
  Users,
} from "lucide-react";

interface OverviewProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterOverviewPage({ params }: OverviewProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, client, clientName, leadInvestigatorName, caseManagerName, tasks, evidence, documents, subjects } = detail;

  // Retrieve research pivots
  const pivots = researchStore.getPivots(matter.reference);
  const activePivots = pivots.filter((p) => p.status === "OPEN" || p.status === "CORROBORATING");
  const findings = researchStore.getFindings(matter.reference);

  // Compute Next Action derived from real workflow state
  const openTasks = tasks.filter((t) => t.status === "TODO" || t.status === "IN_PROGRESS");
  const now = new Date();
  const overdueTask = openTasks.find((t) => t.due_at && new Date(t.due_at) < now);
  const urgentTask = openTasks.find((t) => t.priority === "CRITICAL" || t.priority === "HIGH");

  let nextAction: { title: string; detail: string; urgency: "critical" | "warning" | "normal"; link: string } = {
    title: "All current tasks up to date",
    detail: "No urgent actions pending. Review matter progression schedule.",
    urgency: "normal",
    link: `/admin/matters/${matter.reference}/tasks`,
  };

  if (overdueTask) {
    nextAction = {
      title: overdueTask.title,
      detail: `Overdue task assigned to ${overdueTask.assigned_to || "unassigned"}. Due: ${formatShortDate(overdueTask.due_at!)}`,
      urgency: "critical",
      link: `/admin/matters/${matter.reference}/tasks`,
    };
  } else if (urgentTask) {
    nextAction = {
      title: urgentTask.title,
      detail: `High-priority task assigned to ${urgentTask.assigned_to || "unassigned"}.`,
      urgency: "warning",
      link: `/admin/matters/${matter.reference}/tasks`,
    };
  } else if (activePivots.length > 0) {
    nextAction = {
      title: `Investigate Research Pivot: ${activePivots[0].input_value || activePivots[0].output_lead}`,
      detail: `Open pivot requiring corroboration or verification.`,
      urgency: "warning",
      link: `/admin/matters/${matter.reference}/research`,
    };
  } else if (matter.status === "REPORTING") {
    nextAction = {
      title: "Compile Final Investigation Report",
      detail: "Fieldwork and evidence gathering concluded. Final client report required.",
      urgency: "warning",
      link: `/admin/matters/${matter.reference}/reports`,
    };
  }

  return (
    <div className="space-y-6 max-w-[1500px] mx-auto">
      {/* NEXT ACTION HERO PANEL */}
      <div
        className={`p-5 rounded-sm border shadow-admin-card flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          nextAction.urgency === "critical"
            ? "bg-red-50/70 border-red-200"
            : nextAction.urgency === "warning"
            ? "bg-amber-50/70 border-amber-200"
            : "bg-admin-surface border-admin-border"
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {nextAction.urgency === "critical" ? (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            ) : nextAction.urgency === "warning" ? (
              <Clock className="w-4 h-4 text-amber-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-admin-text-faint">
              NEXT OPERATIONAL ACTION
            </span>
          </div>
          <h2 className="text-sm font-semibold text-admin-text">{nextAction.title}</h2>
          <p className="text-xs text-admin-text-muted">{nextAction.detail}</p>
        </div>
        <Link
          href={nextAction.link}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-admin-border hover:border-admin-accent rounded-xs shadow-xs transition-colors shrink-0 text-admin-text"
        >
          <span>Take Action</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* OPERATIONAL META GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Investigation Objective */}
        <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card md:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-admin-accent" />
              <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">
                Investigation Objective
              </h3>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">
              STATED OPERATIONAL MANDATE
            </span>
          </div>
          <p className="text-xs text-admin-text-secondary leading-relaxed">
            {matter.investigation_objective ||
              matter.description ||
              "No specific investigation objective recorded. Update matter details to establish formal investigative boundaries."}
          </p>
          {matter.instructions && (
            <div className="p-3 bg-admin-surface/50 border border-admin-border rounded-xs text-[11px] text-admin-text-muted space-y-1">
              <span className="font-semibold text-admin-text block">Special Instructions:</span>
              <p>{matter.instructions}</p>
            </div>
          )}
          {matter.legal_context && (
            <div className="text-[11px] text-admin-text-faint font-mono">
              Legal Context: {matter.legal_context}
            </div>
          )}
        </div>

        {/* Client & Instruction Meta */}
        <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card space-y-3">
          <div className="flex items-center gap-2 border-b border-admin-border pb-2.5">
            <User className="w-4 h-4 text-admin-accent" />
            <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">
              Instruction Details
            </h3>
          </div>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-admin-border-subtle">
              <dt className="text-admin-text-muted">Instructing Client</dt>
              <dd className="font-medium text-admin-text text-right">{clientName}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-admin-border-subtle">
              <dt className="text-admin-text-muted">Client Contact</dt>
              <dd className="text-admin-text-secondary text-right">{client?.email || "—"}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-admin-border-subtle">
              <dt className="text-admin-text-muted">Lead Investigator</dt>
              <dd className="font-medium text-admin-text">{leadInvestigatorName}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-admin-border-subtle">
              <dt className="text-admin-text-muted">Case Manager</dt>
              <dd className="text-admin-text-secondary">{caseManagerName}</dd>
            </div>
            <div className="flex justify-between py-1 border-b border-admin-border-subtle">
              <dt className="text-admin-text-muted">Instructed Date</dt>
              <dd className="text-admin-text font-mono">{formatShortDate(matter.opened_at)}</dd>
            </div>
            <div className="flex justify-between py-1">
              <dt className="text-admin-text-muted">Target Completion</dt>
              <dd className="text-admin-text font-mono">
                {matter.target_date ? formatShortDate(matter.target_date) : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* METRIC COUNTERS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link
          href={`/admin/matters/${matter.reference}/tasks`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Open Tasks</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">{openTasks.length}</p>
          <span className="text-[10px] text-admin-text-faint">{tasks.length} total</span>
        </Link>
        <Link
          href={`/admin/matters/${matter.reference}/subjects`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Subjects</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">{subjects.length}</p>
          <span className="text-[10px] text-admin-text-faint">Linked profiles</span>
        </Link>
        <Link
          href={`/admin/matters/${matter.reference}/research`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Research Findings</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">{findings.length}</p>
          <span className="text-[10px] text-admin-text-faint">{activePivots.length} active pivots</span>
        </Link>
        <Link
          href={`/admin/matters/${matter.reference}/evidence`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Evidence Exhibits</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">{evidence.length}</p>
          <span className="text-[10px] text-admin-text-faint">Hashed items</span>
        </Link>
        <Link
          href={`/admin/matters/${matter.reference}/documents`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Documents</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">{documents.length}</p>
          <span className="text-[10px] text-admin-text-faint">Vault files</span>
        </Link>
        <Link
          href={`/admin/matters/${matter.reference}/commercial`}
          className="bg-white border border-admin-border p-3.5 rounded-sm shadow-admin-card hover:border-admin-accent transition-colors"
        >
          <span className="text-[10px] font-mono uppercase text-admin-text-faint block">Quoted Value</span>
          <p className="text-xl font-serif font-semibold text-admin-text mt-1">
            {matter.quoted_value ? `£${(matter.quoted_value / 100).toLocaleString("en-GB")}` : "—"}
          </p>
          <span className="text-[10px] text-admin-text-faint">Commercial state</span>
        </Link>
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-admin-text-faint font-semibold block">
          OPERATIONAL LAUNCHPAD
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/matters/${matter.reference}/tasks`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-admin-accent" />
            Create Task
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/subjects`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-admin-accent" />
            Add Subject
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/evidence`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-admin-accent" />
            Add Evidence
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/research`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <FlaskConical className="w-3.5 h-3.5 text-admin-accent" />
            Start Research
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/documents`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-admin-accent" />
            Upload Document
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/reports`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <FileBarChart className="w-3.5 h-3.5 text-admin-accent" />
            Create Report
          </Link>
          <Link
            href={`/admin/matters/${matter.reference}/commercial`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
          >
            <Receipt className="w-3.5 h-3.5 text-admin-accent" />
            Commercial
          </Link>
        </div>
      </div>
    </div>
  );
}
