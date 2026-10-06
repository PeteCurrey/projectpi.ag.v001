import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime, formatShortDate } from "@/lib/admin/utils/dates";
import StatusBadge from "@/app/admin/components/StatusBadge";
import PriorityIndicator from "@/app/admin/components/PriorityIndicator";
import { getSubjectsByMatter } from "@/lib/admin/fixtures/subjects";

interface CaseOverviewProps {
  params: Promise<{ ref: string }>;
}

export default async function CaseOverviewPage({ params }: CaseOverviewProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, clientName, leadInvestigatorName, caseManagerName, events, tasks, evidence } = detail;
  const subjects = getSubjectsByMatter(matter.id);

  return (
    <div className="space-y-6">
      {/* Primary Matter Meta Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Instruction Details</span>
          <dl className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Client</dt>
              <dd className="font-medium text-admin-text">{clientName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Matter Type</dt>
              <dd className="font-mono uppercase text-admin-text">{matter.matter_type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Instructed Date</dt>
              <dd className="text-admin-text">{formatShortDate(matter.opened_at)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Target Completion</dt>
              <dd className="text-admin-text font-mono">{matter.target_date ? formatShortDate(matter.target_date) : "—"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Operational Assignment</span>
          <dl className="mt-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Lead Investigator</dt>
              <dd className="font-medium text-admin-text">{leadInvestigatorName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Case Manager</dt>
              <dd className="text-admin-text">{caseManagerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Retention Status</dt>
              <dd className="text-admin-text font-mono text-[11px]">{matter.retention_status}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-text-muted">Linked Enquiry</dt>
              <dd className="text-admin-accent font-mono text-[11px]">{matter.created_from_enquiry_id || "Direct Instruction"}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Live Operational Tally</span>
          <div className="grid grid-cols-3 gap-2 mt-3 text-center">
            <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
              <div className="text-lg font-serif font-semibold text-admin-text">{subjects.length}</div>
              <div className="text-[10px] text-admin-text-muted font-mono uppercase">Subjects</div>
            </div>
            <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
              <div className="text-lg font-serif font-semibold text-admin-text">{evidence.length}</div>
              <div className="text-[10px] text-admin-text-muted font-mono uppercase">Evidence</div>
            </div>
            <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
              <div className="text-lg font-serif font-semibold text-admin-text">
                {tasks.filter((t) => t.status !== "COMPLETED").length}
              </div>
              <div className="text-[10px] text-admin-text-muted font-mono uppercase">Open Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Narrative */}
      <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card">
        <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted mb-2">Matter Scope & Objectives</h3>
        <p className="text-sm text-admin-text-secondary leading-relaxed">{matter.description || "No narrative recorded."}</p>
      </div>

      {/* Subjects & Active Tasks in 2-Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subjects Panel */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
          <div className="px-4 py-3 border-b border-admin-border flex justify-between items-center bg-admin-surface">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted">Subject Profiles</h3>
            <span className="text-[11px] text-admin-text-faint">{subjects.length} identified</span>
          </div>
          <div className="divide-y divide-admin-border-subtle">
            {subjects.length === 0 ? (
              <div className="p-4 text-xs text-admin-text-muted">No identified subjects linked.</div>
            ) : (
              subjects.map((sub) => (
                <div key={sub.id} className="p-3 text-xs flex justify-between items-center hover:bg-admin-surface/40">
                  <div>
                    <span className="font-medium text-admin-text">{sub.name}</span>
                    <span className="ml-2 font-mono text-[10px] text-admin-text-faint uppercase px-1.5 py-0.5 bg-admin-surface border border-admin-border rounded-xs">
                      {sub.role}
                    </span>
                    <p className="text-[11px] text-admin-text-muted mt-0.5 line-clamp-1">{sub.description}</p>
                  </div>
                  <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded-xs">
                    {sub.confidence_rating || "CONFIRMED"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Tasks Panel */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
          <div className="px-4 py-3 border-b border-admin-border flex justify-between items-center bg-admin-surface">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted">Operational Tasks</h3>
            <span className="text-[11px] text-admin-text-faint">{tasks.length} total</span>
          </div>
          <div className="divide-y divide-admin-border-subtle">
            {tasks.length === 0 ? (
              <div className="p-4 text-xs text-admin-text-muted">No scheduled tasks.</div>
            ) : (
              tasks.slice(0, 5).map((tsk) => (
                <div key={tsk.id} className="p-3 text-xs flex items-center justify-between hover:bg-admin-surface/40">
                  <div className="flex items-center gap-2">
                    <PriorityIndicator priority={tsk.priority} />
                    <span className="text-admin-text font-medium">{tsk.title}</span>
                  </div>
                  <StatusBadge status={tsk.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Chronology */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="px-4 py-3 border-b border-admin-border flex justify-between items-center bg-admin-surface">
          <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted">Recent Matter Activity Timeline</h3>
          <Link href={`/admin/cases/${matter.reference}/timeline`} className="text-[11px] text-admin-accent hover:underline">
            View Complete Timeline &rarr;
          </Link>
        </div>
        <div className="divide-y divide-admin-border-subtle">
          {events.length === 0 ? (
            <div className="p-4 text-xs text-admin-text-muted">No events logged yet.</div>
          ) : (
            events.slice(0, 5).map((ev) => (
              <div key={ev.id} className="p-3 text-xs flex items-start gap-4 hover:bg-admin-surface/30">
                <span className="font-mono text-[11px] text-admin-text-muted whitespace-nowrap">
                  {formatDateTime(ev.occurred_at)}
                </span>
                <div className="flex-1">
                  <span className="font-medium text-admin-text">{ev.title}</span>
                  <span className="ml-2 font-mono text-[10px] text-admin-text-faint uppercase px-1.5 py-0.2 bg-admin-surface border border-admin-border rounded-xs">
                    {ev.event_type}
                  </span>
                  <p className="text-[11px] text-admin-text-muted mt-0.5">{ev.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
