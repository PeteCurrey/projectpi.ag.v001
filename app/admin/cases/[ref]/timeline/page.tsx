import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseTimelinePage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) notFound();
  const { events } = detail;

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6">
      <div className="flex justify-between items-center mb-6 border-b border-admin-border pb-3">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Immutable Case Timeline</h2>
          <p className="text-xs text-admin-text-muted">Chronological audit stream of field logs, surveillance, and legal notices.</p>
        </div>
        <span className="text-xs font-mono text-admin-accent">{events.length} Events Logged</span>
      </div>

      <div className="relative border-l border-admin-border ml-3 space-y-8 pl-6 py-2">
        {events.map((ev) => (
          <div key={ev.id} className="relative group">
            {/* Dot Indicator */}
            <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-admin-accent border-2 border-white ring-1 ring-admin-border" />

            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-admin-text-muted">{formatDateTime(ev.occurred_at)}</span>
                <span className="text-[10px] font-mono uppercase bg-admin-surface border border-admin-border px-1.5 py-0.5 rounded-xs text-admin-text-secondary">
                  {ev.event_type}
                </span>
                <span className="text-[10px] font-mono text-admin-text-faint">{ev.visibility}</span>
              </div>
              <h3 className="text-sm font-medium text-admin-text">{ev.title}</h3>
              {ev.description && <p className="text-xs text-admin-text-secondary leading-relaxed mt-1">{ev.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
