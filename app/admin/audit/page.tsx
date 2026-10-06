import React from "react";
import Link from "next/link";
import { ScrollText, ShieldAlert, KeyRound, Clock } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";
import { FIXTURE_AUDIT_LOGS, FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Immutable Audit Log | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminAuditPage() {
  const auditLogs = [...FIXTURE_AUDIT_LOGS].sort(
    (a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="COMPLIANCE & GOVERNANCE"
        title="Append-Only System Audit Trail"
        description="Tamper-evident operational logging of authentication attempts, case access, status transitions and evidence downloads."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
              LOG STREAM ACTIVE
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Timestamp</th>
                <th className="p-3 font-medium">Actor</th>
                <th className="p-3 font-medium">Action Performed</th>
                <th className="p-3 font-medium">Entity Type / ID</th>
                <th className="p-3 font-medium">Audit Notes</th>
                <th className="p-3 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {auditLogs.map((log) => {
                const user = log.actor_user_id ? FIXTURE_USERS.find((u) => u.id === log.actor_user_id) : null;

                return (
                  <tr key={log.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {new Date(log.occurred_at).toLocaleString("en-GB")}
                    </td>
                    <td className="p-3 text-[11px]">
                      {user ? (
                        <span className="font-medium text-admin-text">{user.name}</span>
                      ) : (
                        <span className="font-mono text-admin-text-faint">System / Anonymous</span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-1.5 py-0.5 rounded-xs font-mono text-[10px] ${
                          log.action.includes("FAILED")
                            ? "bg-red-50 text-red-700 border border-red-200 font-bold"
                            : "bg-admin-surface border border-admin-border text-admin-text font-medium"
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-secondary">
                      {log.entity_type ? `${log.entity_type}: ${log.entity_id}` : "—"}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {log.notes || "—"}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {log.actor_ip || "Internal"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
