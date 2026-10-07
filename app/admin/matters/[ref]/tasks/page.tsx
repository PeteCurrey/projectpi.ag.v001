import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getUserById } from "@/lib/admin/fixtures/users";
import { formatShortDate } from "@/lib/admin/utils/dates";
import PriorityIndicator from "@/app/admin/components/PriorityIndicator";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { CheckSquare, Clock, Plus, AlertCircle } from "lucide-react";

interface TasksProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterTasksPage({ params }: TasksProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, tasks } = detail;
  const now = new Date();

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Operational Action Items & Tasks</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Investigative tasks, court filing deadlines, and fieldwork objectives assigned to this Matter.
          </p>
        </div>
        <button className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-admin-accent" />
          Create Task
        </button>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                <th className="p-3">Task Title & Scope</th>
                <th className="p-3">Assignee</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Due Date</th>
                <th className="p-3 text-right">Task ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {tasks.map((task) => {
                const assignee = task.assigned_to ? getUserById(task.assigned_to) : null;
                const isOverdue =
                  task.due_at &&
                  new Date(task.due_at) < now &&
                  task.status !== "COMPLETED" &&
                  task.status !== "CANCELLED";

                return (
                  <tr key={task.id} className="hover:bg-admin-surface/30 transition-colors">
                    <td className="p-3 max-w-md">
                      <p className="font-semibold text-admin-text">{task.title}</p>
                      {task.description && (
                        <p className="text-[11px] text-admin-text-muted line-clamp-2 mt-0.5">
                          {task.description}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="font-medium text-admin-text-secondary">
                        {assignee?.name || task.assigned_to || "Unassigned"}
                      </span>
                    </td>
                    <td className="p-3">
                      <PriorityIndicator priority={task.priority} showLabel />
                    </td>
                    <td className="p-3">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="p-3 font-mono">
                      {task.due_at ? (
                        <span
                          className={
                            isOverdue
                              ? "text-red-600 font-semibold flex items-center gap-1"
                              : "text-admin-text-muted"
                          }
                        >
                          {isOverdue && <AlertCircle className="w-3 h-3 text-red-600" />}
                          {formatShortDate(task.due_at)}
                        </span>
                      ) : (
                        <span className="text-admin-text-faint">—</span>
                      )}
                    </td>
                    <td className="p-3 text-right font-mono text-[10px] text-admin-text-faint">
                      {task.id}
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
