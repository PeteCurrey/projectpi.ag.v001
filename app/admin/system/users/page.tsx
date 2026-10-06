import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { FIXTURE_USERS } from "@/lib/admin/fixtures/users";
import { formatDistanceToNow, formatShortDate } from "@/lib/admin/utils/dates";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Users & Team",
  robots: "noindex, nofollow",
};

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN:  "Super Administrator",
  ADMIN:        "Director",
  CASE_MANAGER: "Case Manager",
  INVESTIGATOR: "Investigator",
  CLIENT:       "Client",
  CLIENT_ADMIN: "Client Administrator",
};

export default function UsersPage() {
  const totalUsers = FIXTURE_USERS.length;
  const activeUsers = FIXTURE_USERS.filter((u) => u.status === "ACTIVE").length;
  const mfaActive = FIXTURE_USERS.filter((u) => u.mfa_enabled).length;

  return (
    <div>
      <AdminPageHeader
        label="System / Users"
        title="Users & Team"
        description="Manage staff accounts, roles, and system access."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium text-white bg-admin-text rounded-sm hover:bg-admin-text/90 transition-colors">
            <Plus className="w-3 h-3" />
            Invite User
          </button>
        }
      />

      {/* Stats */}
      <div className="px-6 pt-4 grid grid-cols-3 gap-3 mb-5">
        <div className="bg-white border border-admin-border rounded-sm p-4 shadow-admin-card">
          <p className="admin-label mb-2">Total Users</p>
          <p className="text-2xl font-serif font-semibold text-admin-text">{totalUsers}</p>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-4 shadow-admin-card">
          <p className="admin-label mb-2">Active Accounts</p>
          <p className="text-2xl font-serif font-semibold text-admin-text">{activeUsers}</p>
        </div>
        <div className="bg-white border border-admin-border rounded-sm p-4 shadow-admin-card">
          <p className="admin-label mb-2">MFA Enrolled</p>
          <p className="text-2xl font-serif font-semibold text-admin-text">
            {mfaActive}/{totalUsers}
          </p>
        </div>
      </div>

      {/* Users table */}
      <div className="px-6 pb-6">
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-admin-surface border-b border-admin-border">
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Name</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Role</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Status</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">MFA</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Last Login</th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Joined</th>
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {FIXTURE_USERS.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-admin-border-subtle hover:bg-admin-surface/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        {/* Avatar */}
                        <div className="w-6 h-6 rounded-full bg-admin-active border border-admin-border flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-medium text-admin-text-secondary">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-admin-text">{user.name}</p>
                          <p className="text-[10px] text-admin-text-muted">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-admin-text-secondary">
                      {ROLE_LABELS[user.role] ?? user.role}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3">
                      {user.mfa_enabled ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-xs">
                          Enabled
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-xs">
                          Not set
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-admin-text-muted">
                      {user.last_login_at
                        ? formatDistanceToNow(user.last_login_at)
                        : "Never"}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-admin-text-muted">
                      {formatShortDate(user.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-[10px] text-admin-text-muted hover:text-admin-text font-mono uppercase tracking-wider px-2 py-1 hover:bg-admin-surface rounded-xs transition-colors">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
