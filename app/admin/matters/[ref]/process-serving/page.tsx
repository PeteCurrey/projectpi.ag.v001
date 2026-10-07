import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime } from "@/lib/admin/utils/dates";
import { Stamp, CheckCircle2, AlertTriangle, Clock, MapPin, FileText } from "lucide-react";

interface ProcessServingProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterProcessServingPage({ params }: ProcessServingProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, events } = detail;
  const serviceEvents = events.filter((e) =>
    e.event_type.toLowerCase().includes("service")
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Process Serving & Service Attempts</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Court document service logs, physical attendances, GPS-stamped verification, and affidavit records.
          </p>
        </div>
        <button className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5">
          <Stamp className="w-3.5 h-3.5 text-admin-accent" />
          Log Service Attempt
        </button>
      </div>

      {serviceEvents.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <Stamp className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Process Serving Activity Logged</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            This matter does not have active process serving attempts recorded.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {serviceEvents.map((attempt) => (
            <div
              key={attempt.id}
              className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-admin-border-subtle pb-2.5">
                <div className="flex items-center gap-2">
                  <Stamp className="w-4 h-4 text-admin-accent" />
                  <h3 className="text-sm font-semibold text-admin-text">{attempt.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-admin-text-faint">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDateTime(attempt.occurred_at)}</span>
                </div>
              </div>
              <p className="text-xs text-admin-text-secondary leading-relaxed bg-admin-surface/30 p-3 rounded-xs border border-admin-border-subtle">
                {attempt.description}
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-admin-text-faint pt-1">
                <span>SERVER ID: {attempt.actor_user_id || "Unassigned"}</span>
                <span className="text-amber-700 font-semibold">FURTHER ATTEMPT SCHEDULED</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
