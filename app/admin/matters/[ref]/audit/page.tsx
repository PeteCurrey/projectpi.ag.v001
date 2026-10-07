import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getAuditEventsByCase } from "@/lib/admin/fixtures/audit";
import { getUserById } from "@/lib/admin/fixtures/users";
import { formatDateTime } from "@/lib/admin/utils/dates";
import { ScrollText, Lock, ShieldCheck, Clock, User } from "lucide-react";

interface AuditProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterAuditPage({ params }: AuditProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter } = detail;
  const auditLogs = getAuditEventsByCase(matter.id);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Immutable Matter Audit Log</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Cryptographically sealed and append-only audit trail recording every material change, document download, and access event.
          </p>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-white border border-admin-border rounded-xs text-admin-text-secondary flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-admin-accent" />
          Tamper-Evident Trail
        </span>
      </div>

      {auditLogs.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <ScrollText className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Audit Entries Recorded</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            Audit events will appear here automatically as users access, modify, or export data.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                  <th className="p-3">Action Type</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Target Entity</th>
                  <th className="p-3">Details / State Changes</th>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3 text-right">Log ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border-subtle">
                {auditLogs.map((log) => {
                  const actor = log.actor_user_id ? getUserById(log.actor_user_id) : null;
                  return (
                    <tr key={log.id} className="hover:bg-admin-surface/30 transition-colors">
                      <td className="p-3 font-mono text-admin-text font-semibold">
                        {log.action}
                      </td>
                      <td className="p-3">
                        <span className="font-medium text-admin-text">
                          {actor?.name || log.actor_user_id || "System"}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px] text-admin-text-secondary">
                        {log.entity_type ? `${log.entity_type} (${log.entity_id || "—"})` : "—"}
                      </td>
                      <td className="p-3 text-admin-text-secondary max-w-sm">
                        {log.notes || "—"}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                        {formatDateTime(log.occurred_at)}
                      </td>
                      <td className="p-3 text-right font-mono text-[10px] text-admin-text-faint">
                        {log.id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
