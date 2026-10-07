import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime } from "@/lib/admin/utils/dates";
import { Activity, Clock, ShieldCheck, User, FileText, Stamp, Eye, AlertCircle } from "lucide-react";

interface TimelineProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterTimelinePage({ params }: TimelineProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, events, tasks, evidence, assignments } = detail;

  // Aggregate multi-source events into a single unified chronologically ordered event stream
  type ChronoEvent = {
    id: string;
    occurredAt: string;
    title: string;
    description?: string;
    eventType: string;
    actor?: string;
    source: "CASE_EVENT" | "EVIDENCE" | "TASK" | "ASSIGNMENT";
  };

  const aggregated: ChronoEvent[] = [
    ...events.map((e) => ({
      id: e.id,
      occurredAt: e.occurred_at,
      title: e.title,
      description: e.description,
      eventType: e.event_type,
      actor: e.actor_user_id,
      source: "CASE_EVENT" as const,
    })),
    ...evidence.map((evi) => ({
      id: evi.id,
      occurredAt: evi.collected_at || evi.created_at,
      title: `Evidence Logged: ${evi.title}`,
      description: `Type: ${evi.evidence_type} · Source: ${evi.source || "Field"} · Hash: ${evi.integrity_hash?.slice(0, 16)}...`,
      eventType: "EVIDENCE_COLLECTED",
      actor: evi.collected_by_user_id,
      source: "EVIDENCE" as const,
    })),
    ...assignments.map((asg) => ({
      id: asg.id,
      occurredAt: asg.start_date,
      title: `Operative Assigned: ${asg.assignment_role.replace(/_/g, " ")}`,
      description: asg.instructions,
      eventType: "OPERATIVE_ASSIGNED",
      actor: asg.assigned_by_user_id,
      source: "ASSIGNMENT" as const,
    })),
  ].sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());

  function getEventIcon(type: string) {
    if (type.includes("SERVICE")) return Stamp;
    if (type.includes("SURVEILLANCE")) return Eye;
    if (type.includes("EVIDENCE")) return ShieldCheck;
    if (type.includes("REPORT")) return FileText;
    if (type.includes("ASSIGN")) return User;
    return Activity;
  }

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Matter Chronology & Investigation Log</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Unified chronological record across research, evidence, field activity, and case management.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-white border border-admin-border rounded-xs text-admin-text-secondary">
          {aggregated.length} Total Chronological Entries
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-admin-border">
        {aggregated.map((item) => {
          const Icon = getEventIcon(item.eventType);
          return (
            <div key={item.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-admin-accent flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-admin-accent" />
              </div>

              <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card space-y-2 group-hover:border-admin-accent/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-admin-accent" />
                    <span className="text-xs font-mono uppercase font-semibold text-admin-text">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-admin-text-faint">
                    <Clock className="w-3 h-3" />
                    <span>{formatDateTime(item.occurredAt)}</span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-xs text-admin-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-admin-text-faint border-t border-admin-border-subtle">
                  <span>EVENT TYPE: {item.eventType}</span>
                  {item.actor && <span>ACTOR ID: {item.actor}</span>}
                  <span>SOURCE: {item.source}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
