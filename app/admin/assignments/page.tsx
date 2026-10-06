import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import { FIXTURE_USERS, FIXTURE_CASES, FIXTURE_TASKS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Assignments & Operative Allocation | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminAssignmentsPage() {
  const operatives = FIXTURE_USERS.filter((u) => u.role === "INVESTIGATOR" || u.role === "ADMIN");

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="PERSONNEL ALLOCATION"
        title="Field Operative & Case Manager Workload"
        description="Monitor investigator caseloads, task load distribution, and case management assignments."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operatives.map((op) => {
          const leadMatters = FIXTURE_CASES.filter(
            (c) => c.lead_investigator_id === op.id && !["COMPLETED", "CLOSED"].includes(c.status)
          );
          const tasks = FIXTURE_TASKS.filter(
            (t) => t.assigned_to === op.id && !["COMPLETED", "CANCELLED"].includes(t.status)
          );

          return (
            <div key={op.id} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
              <div className="flex items-start justify-between border-b border-admin-border pb-3">
                <div>
                  <h2 className="text-sm font-semibold text-admin-text">{op.name}</h2>
                  <p className="text-[11px] font-mono text-admin-text-faint uppercase">{op.role}</p>
                </div>
                <StatusBadge status={op.status} />
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-admin-text-muted">Active Lead Matters:</span>
                  <span className="font-mono font-semibold text-admin-text">{leadMatters.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-admin-text-muted">Open Tasks:</span>
                  <span className="font-mono font-semibold text-admin-text">{tasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-admin-text-muted">MFA Security:</span>
                  <span className="font-mono text-emerald-700">{op.mfa_enabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-admin-border space-y-2">
                <p className="text-[11px] font-mono uppercase text-admin-text-faint">Assigned Matters:</p>
                {leadMatters.length === 0 ? (
                  <p className="text-xs text-admin-text-muted">No active lead matters assigned.</p>
                ) : (
                  <div className="space-y-1.5">
                    {leadMatters.map((m) => (
                      <Link
                        key={m.id}
                        href={`/admin/matters/${m.id}`}
                        className="block p-2 bg-admin-surface/50 border border-admin-border rounded-xs hover:border-admin-accent text-xs"
                      >
                        <p className="font-mono font-medium text-admin-text">{m.reference}</p>
                        <p className="text-admin-text-muted text-[11px] truncate">{m.title}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
