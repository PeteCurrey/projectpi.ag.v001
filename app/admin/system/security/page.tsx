import type { Metadata } from "next";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { FIXTURE_USERS } from "@/lib/admin/fixtures/users";
import { FIXTURE_AUDIT_LOGS, getFailedLoginEvents } from "@/lib/admin/fixtures/audit";
import { formatDistanceToNow } from "@/lib/admin/utils/dates";
import { ShieldCheck, ShieldAlert, Lock, Users, Smartphone, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  robots: "noindex, nofollow",
};

export default function SecurityPage() {
  const totalUsers = FIXTURE_USERS.length;
  const mfaEnabled = FIXTURE_USERS.filter((u) => u.mfa_enabled).length;
  const mfaNotEnabled = FIXTURE_USERS.filter((u) => !u.mfa_enabled);
  const failedLogins = getFailedLoginEvents();
  const recentFailures = FIXTURE_AUDIT_LOGS.filter(
    (e) => e.action === "AUTH_LOGIN_FAILED"
  ).slice(0, 10);

  return (
    <div>
      <AdminPageHeader
        label="System / Security"
        title="Security Administration"
        description="Session management, MFA status, access monitoring, and security controls."
      />

      <div className="px-6 py-5 space-y-5">
        {/* ── Security Posture Overview ──────────────── */}
        <div className="grid grid-cols-4 gap-3">
          {/* MFA Adoption */}
          <div className={`bg-white border rounded-sm p-4 shadow-admin-card ${mfaNotEnabled.length > 0 ? "border-l-2 border-l-amber-400 border-admin-border" : "border-admin-border"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="w-3.5 h-3.5 text-admin-text-faint" />
              <span className="admin-label">MFA Adoption</span>
            </div>
            <p className="text-2xl font-serif font-semibold text-admin-text tabular-nums">
              {mfaEnabled}/{totalUsers}
            </p>
            <p className={`text-[11px] mt-1 ${mfaNotEnabled.length > 0 ? "text-amber-600" : "text-admin-text-muted"}`}>
              {mfaNotEnabled.length > 0
                ? `${mfaNotEnabled.length} user${mfaNotEnabled.length > 1 ? "s" : ""} without MFA`
                : "All users MFA enrolled"}
            </p>
          </div>

          {/* Failed Login Attempts */}
          <div className={`bg-white border rounded-sm p-4 shadow-admin-card ${failedLogins.length > 0 ? "border-l-2 border-l-red-400 border-admin-border" : "border-admin-border"}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-3.5 h-3.5 text-admin-text-faint" />
              <span className="admin-label">Failed Logins (24h)</span>
            </div>
            <p className="text-2xl font-serif font-semibold text-admin-text tabular-nums">
              {failedLogins.length}
            </p>
            <p className={`text-[11px] mt-1 ${failedLogins.length > 0 ? "text-red-500" : "text-admin-text-muted"}`}>
              {failedLogins.length > 0 ? "Review authentication log" : "No failed attempts"}
            </p>
          </div>

          {/* Active Sessions */}
          <div className="bg-white border border-admin-border rounded-sm p-4 shadow-admin-card">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-3.5 h-3.5 text-admin-text-faint" />
              <span className="admin-label">Active Sessions</span>
            </div>
            <p className="text-2xl font-serif font-semibold text-admin-text tabular-nums">
              {FIXTURE_USERS.filter((u) => u.last_login_at).length}
            </p>
            <p className="text-[11px] mt-1 text-admin-text-muted">
              Across {totalUsers} accounts
            </p>
          </div>

          {/* Security Status */}
          <div className="bg-white border border-admin-border rounded-sm p-4 shadow-admin-card">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-admin-text-faint" />
              <span className="admin-label">Security Status</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[12px] text-admin-text">Operational</span>
            </div>
            <p className="text-[11px] mt-1 text-admin-text-muted">Headers active · Audit logging</p>
          </div>
        </div>

        {/* ── MFA Warning ──────────────────────────────── */}
        {mfaNotEnabled.length > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-sm px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-[12px] font-medium text-amber-800">
                {mfaNotEnabled.length} user account{mfaNotEnabled.length > 1 ? "s" : ""} without MFA enabled
              </p>
              <p className="text-[11px] text-amber-700 mt-0.5">
                All staff should have MFA enabled. Accounts without MFA are a security risk.
              </p>
              <div className="mt-2 flex gap-2">
                {mfaNotEnabled.map((u) => (
                  <span
                    key={u.id}
                    className="text-[10px] font-medium text-amber-700 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-xs"
                  >
                    {u.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Two column: Users / Failed logins ────────── */}
        <div className="grid grid-cols-2 gap-4">
          {/* User access list */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-admin-border">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-admin-text-faint" />
                <span className="text-[12px] font-medium text-admin-text">User Accounts</span>
              </div>
              <Link
                href="/admin/system/users"
                className="text-[10px] text-admin-text-muted hover:text-admin-accent font-mono uppercase tracking-wider transition-colors"
              >
                Manage
              </Link>
            </div>

            <table className="w-full">
              <thead>
                <tr className="bg-admin-surface">
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Name</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Role</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">MFA</th>
                  <th className="text-left px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">Last Login</th>
                </tr>
              </thead>
              <tbody>
                {FIXTURE_USERS.map((user) => (
                  <tr key={user.id} className="border-t border-admin-border-subtle hover:bg-admin-surface/50">
                    <td className="px-4 py-2.5">
                      <p className="text-[12px] text-admin-text">{user.name}</p>
                      <p className="text-[10px] text-admin-text-muted">{user.email}</p>
                    </td>
                    <td className="px-4 py-2.5 text-[11px] text-admin-text-secondary">
                      {user.role.replace(/_/g, " ")}
                    </td>
                    <td className="px-4 py-2.5">
                      {user.mfa_enabled ? (
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-xs">
                          Enabled
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-xs">
                          Off
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-[10px] text-admin-text-muted">
                      {user.last_login_at
                        ? formatDistanceToNow(user.last_login_at)
                        : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Failed login log */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-admin-border">
              <ShieldAlert className="w-3.5 h-3.5 text-admin-text-faint" />
              <span className="text-[12px] font-medium text-admin-text">Authentication Failures</span>
            </div>

            {recentFailures.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-[11px] text-admin-text-muted">No authentication failures recorded</p>
              </div>
            ) : (
              <div className="divide-y divide-admin-border-subtle">
                {recentFailures.map((event) => (
                  <div key={event.id} className="px-4 py-3 flex items-start gap-3">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-admin-text">{event.notes ?? event.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {event.actor_ip && (
                          <span className="text-[10px] font-mono text-admin-text-muted">
                            IP: {event.actor_ip}
                          </span>
                        )}
                        <span className="text-[10px] text-admin-text-faint">
                          {formatDistanceToNow(event.occurred_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Security Configuration ─────────────────── */}
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card">
          <div className="px-4 py-3 border-b border-admin-border">
            <span className="text-[12px] font-medium text-admin-text">Security Configuration</span>
          </div>
          <div className="divide-y divide-admin-border-subtle">
            {[
              { label: "Session duration", value: "8 hours", status: "Active" },
              { label: "Failed login lockout", value: "5 attempts → 15 min lockout", status: "Active" },
              { label: "MFA requirement", value: "Enforced for all admin accounts", status: "Active" },
              { label: "Session cookie", value: "HttpOnly · SameSite=Strict · Secure", status: "Active" },
              { label: "Audit logging", value: "All admin actions logged · Append-only", status: "Active" },
              { label: "Security headers", value: "CSP · HSTS · X-Frame-Options · CORP · COOP", status: "Active" },
              { label: "Evidence integrity", value: "SHA-256 hash on upload · Verified on download", status: "Active" },
              { label: "Rate limiting", value: "In-memory (development) · Redis recommended for production", status: "Development" },
            ].map((item) => (
              <div key={item.label} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-[12px] text-admin-text">{item.label}</p>
                  <p className="text-[11px] text-admin-text-muted mt-0.5">{item.value}</p>
                </div>
                <StatusBadge
                  status={item.status === "Development" ? "UNDER_REVIEW" : "ACTIVE"}
                  label={item.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
