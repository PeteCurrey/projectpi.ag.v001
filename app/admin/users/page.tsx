import React from "react";
import Link from "next/link";
import { Users, Shield, KeyRound, CheckCircle2 } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import { FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Personnel & Access Control | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminUsersPage() {
  const users = [...FIXTURE_USERS];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="SECURITY & ACCESS MANAGEMENT"
        title="Operatives, Case Managers & Director Access"
        description="Role-based access control (RBAC), multi-factor authentication standing and security provisioning."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {users.length} Active Staff Accounts
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Operative / Name</th>
                <th className="p-3 font-medium">Internal Email</th>
                <th className="p-3 font-medium">Assigned Role</th>
                <th className="p-3 font-medium">MFA Security</th>
                <th className="p-3 font-medium">Account Status</th>
                <th className="p-3 font-medium">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-admin-surface/40 transition-colors">
                  <td className="p-3">
                    <p className="font-semibold text-admin-text">{u.name}</p>
                    <p className="text-[11px] font-mono text-admin-text-faint">{u.id}</p>
                  </td>
                  <td className="p-3 font-mono text-admin-text-secondary">
                    {u.email}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-admin-surface border border-admin-border text-[10px] font-mono uppercase font-medium">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    {u.mfa_enabled ? (
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        MFA ENFORCED
                      </span>
                    ) : (
                      <span className="text-red-700 bg-red-50 px-2 py-0.5 border border-red-200">
                        MFA REQUIRED
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                    {u.last_login_at ? new Date(u.last_login_at).toLocaleString("en-GB") : "Never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
