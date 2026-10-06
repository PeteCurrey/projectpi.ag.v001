import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import PriorityIndicator from "../components/PriorityIndicator";
import { FIXTURE_TASKS, FIXTURE_CASES, FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Tasks & Operational Actions | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminTasksPage() {
  const tasks = [...FIXTURE_TASKS].sort((a, b) => {
    if (!a.due_at) return 1;
    if (!b.due_at) return -1;
    return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
  });

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="OPERATIONAL ACTION REGISTER"
        title="Tasks, Field Orders & Milestones"
        description="Daily operational tasks, surveillance shifts, court deadlines and evidence processing."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {tasks.length} Total Registered Tasks
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Priority</th>
                <th className="p-3 font-medium">Task Title & Details</th>
                <th className="p-3 font-medium">Related Matter</th>
                <th className="p-3 font-medium">Assigned Operative</th>
                <th className="p-3 font-medium">Due Date</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {tasks.map((task) => {
                const matter = FIXTURE_CASES.find((c) => c.id === task.matter_id);
                const assignedUser = task.assigned_to
                  ? FIXTURE_USERS.find((u) => u.id === task.assigned_to)
                  : null;

                return (
                  <tr key={task.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3">
                      <PriorityIndicator priority={task.priority} showLabel />
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-admin-text">{task.title}</p>
                      {task.description && (
                        <p className="text-[11px] text-admin-text-muted mt-0.5 max-w-md line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px]">
                      {matter ? (
                        <Link href={`/admin/matters/${matter.id}`} className="text-admin-accent hover:underline font-medium">
                          {matter.reference}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {assignedUser ? assignedUser.name : <span className="text-admin-text-faint italic">Unassigned</span>}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {task.due_at ? new Date(task.due_at).toLocaleDateString("en-GB") : "Flexible"}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="p-3 text-right">
                      {matter && (
                        <Link
                          href={`/admin/matters/${matter.id}?tab=tasks`}
                          className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                        >
                          View
                        </Link>
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
  );
}
