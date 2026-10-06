import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import StatusBadge from "@/app/admin/components/StatusBadge";
import PriorityIndicator from "@/app/admin/components/PriorityIndicator";
import { formatShortDate } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseTasksPage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const { tasks } = detail;

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
      <div className="p-4 border-b border-admin-border flex justify-between items-center bg-admin-surface">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Operational Workflows & Tasks</h2>
          <p className="text-xs text-admin-text-muted">Assignments, target deadlines, and field directives for this matter.</p>
        </div>
        <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
          + Add Task
        </button>
      </div>

      <table className="w-full text-left text-xs">
        <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
          <tr>
            <th className="p-3">Priority</th>
            <th className="p-3">Task Title & Directive</th>
            <th className="p-3">Status</th>
            <th className="p-3">Due Date</th>
            <th className="p-3">Visibility</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-admin-border-subtle">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-admin-surface/40 transition-colors">
              <td className="p-3 whitespace-nowrap">
                <PriorityIndicator priority={task.priority} showLabel />
              </td>
              <td className="p-3">
                <div className="font-medium text-admin-text">{task.title}</div>
                {task.description && (
                  <p className="text-[11px] text-admin-text-muted mt-0.5 line-clamp-1">{task.description}</p>
                )}
              </td>
              <td className="p-3 whitespace-nowrap">
                <StatusBadge status={task.status} />
              </td>
              <td className="p-3 font-mono text-[11px] text-admin-text-secondary whitespace-nowrap">
                {task.due_at ? formatShortDate(task.due_at) : "—"}
              </td>
              <td className="p-3 font-mono text-[10px] text-admin-text-faint whitespace-nowrap">
                {task.visibility}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
