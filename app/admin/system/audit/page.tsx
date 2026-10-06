import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { getRecentAuditEvents } from "@/lib/admin/fixtures/audit";
import { FIXTURE_USERS } from "@/lib/admin/fixtures/users";
import { formatDateTime } from "@/lib/admin/utils/dates";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Audit Log",
  robots: "noindex, nofollow",
};

// Severity badge colors
function severityBadge(action: string) {
  const isAlert = action?.includes("FAILED") || action?.includes("LOCKED") || action?.includes("TAMPERED");
  const isWarning = action?.includes("DELETED") || action?.includes("EXPORTED") || action?.includes("REVOKED");
  if (isAlert) return "bg-red-50 text-red-700 border-red-100";
  if (isWarning) return "bg-amber-50 text-amber-700 border-amber-100";
  return "bg-stone-100 text-stone-500 border-stone-200";
}

export default function AuditLogPage() {
  const events = getRecentAuditEvents(50);

  return (
    <div>
      <AdminPageHeader
        label="System / Audit"
        title="Audit Log"
        description="Immutable record of all system events. Records cannot be modified or deleted."
      />

      <div className="px-6 py-5">
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
          <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
            <p className="text-[12px] text-admin-text">
              {events.length} records shown — most recent first
            </p>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3 text-admin-text-faint" />
              <span className="text-[10px] font-mono text-admin-text-muted uppercase tracking-wider">
                Append-only · Immutable
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-admin-surface">
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Timestamp</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Event</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Actor</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Entity</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Notes</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const actor = event.actor_user_id
                    ? FIXTURE_USERS.find((u) => u.id === event.actor_user_id)
                    : null;
                  const isAlert =
                    event.action?.includes("FAILED") || event.action?.includes("LOCKED");

                  return (
                    <tr
                      key={event.id}
                      className={`border-t border-admin-border-subtle hover:bg-admin-surface/50 ${isAlert ? "bg-red-50/30" : ""}`}
                    >
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <span className="text-[10px] font-mono text-admin-text-muted">
                          {formatDateTime(event.occurred_at)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono rounded-xs border ${severityBadge(event.action)}`}
                        >
                          {event.action}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        {actor ? (
                          <div>
                            <p className="text-[11px] text-admin-text">{actor.name}</p>
                            <p className="text-[10px] text-admin-text-faint">{actor.role}</p>
                          </div>
                        ) : event.actor_ip ? (
                          <span className="text-[10px] font-mono text-admin-text-muted">
                            IP: {event.actor_ip}
                          </span>
                        ) : (
                          <span className="text-[10px] text-admin-text-faint">System</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {event.entity_type && (
                          <div>
                            <span className="text-[10px] font-mono text-admin-text-muted">
                              {event.entity_type}
                            </span>
                            {event.entity_id && (
                              <p className="text-[10px] text-admin-text-faint font-mono">
                                {event.entity_id}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-[11px] text-admin-text-secondary max-w-xs">
                        <p className="truncate">{event.notes}</p>
                        {(event.previous_state || event.new_state) && (
                          <p className="text-[10px] text-admin-text-faint mt-0.5">
                            State change recorded
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
