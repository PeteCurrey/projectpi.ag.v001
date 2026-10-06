import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { Lock, Shield, Check, Users } from "lucide-react";
import { ROLE_DEFINITIONS, AdminRole } from "@/lib/rbac/roles";

export const metadata: Metadata = {
  title: "Roles & Permissions — Admin",
  robots: "noindex, nofollow",
};

export default function RolesPermissionsPage() {
  const roles = Object.values(ROLE_DEFINITIONS);

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="System / Access Control"
        title="Role-Based Access Control (RBAC) Matrix"
        description="Comprehensive 11-role operational matrix enforcing granular permissions across matters, evidence exhibits, intelligence notes, and financial data."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((r) => (
          <div key={r.role} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-4 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start border-b border-admin-border pb-2">
                <div>
                  <h3 className="font-semibold text-xs text-admin-text">{r.label}</h3>
                  <span className="font-mono text-[10px] text-admin-accent">{r.role}</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-admin-surface border border-admin-border rounded-xs">
                  {r.permissions.length} PERMS
                </span>
              </div>
              <p className="text-xs text-admin-text-secondary leading-relaxed mt-2.5">
                {r.description}
              </p>
            </div>

            <div className="pt-2 border-t border-admin-border-subtle">
              <span className="text-[10px] font-mono uppercase text-admin-text-faint block mb-1">
                Sample Capabilities:
              </span>
              <div className="flex flex-wrap gap-1">
                {r.permissions.slice(0, 4).map((p) => (
                  <span key={p} className="text-[9px] font-mono bg-admin-surface px-1.5 py-0.5 border border-admin-border-subtle rounded-xs text-admin-text-muted">
                    {p}
                  </span>
                ))}
                {r.permissions.length > 4 && (
                  <span className="text-[9px] font-mono text-admin-text-faint self-center">
                    +{r.permissions.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
