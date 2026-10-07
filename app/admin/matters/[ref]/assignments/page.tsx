import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getUserById } from "@/lib/admin/fixtures/users";
import { formatShortDate } from "@/lib/admin/utils/dates";
import { ClipboardList, UserCheck, Calendar, Shield } from "lucide-react";

interface AssignmentsProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterAssignmentsPage({ params }: AssignmentsProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, assignments } = detail;

  const roleLabels: Record<string, string> = {
    LEAD_INVESTIGATOR: "Lead Investigator",
    SUPPORTING_INVESTIGATOR: "Supporting Investigator",
    RESEARCHER: "Intelligence Researcher",
    FIELD_OPERATIVE: "Field Operative",
    PROCESS_SERVER: "Process Server",
    SURVEILLANCE_OPERATIVE: "Surveillance Operative",
    CASE_MANAGER: "Case Manager",
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Investigator Assignments & Field Deployments</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Role allocations and operational instructions for operatives assigned to this Matter.
          </p>
        </div>
        <button className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text">
          + Assign Operative
        </button>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                <th className="p-3">Assigned Operative</th>
                <th className="p-3">Operational Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Start Date</th>
                <th className="p-3">Operational Instructions</th>
                <th className="p-3 text-right">Assignment ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {assignments.map((asg) => {
                const user = getUserById(asg.user_id);
                return (
                  <tr key={asg.id} className="hover:bg-admin-surface/30 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-admin-surface border border-admin-border flex items-center justify-center font-mono text-xs font-semibold text-admin-accent">
                          {user?.name.slice(0, 2).toUpperCase() || "OP"}
                        </div>
                        <div>
                          <p className="font-semibold text-admin-text">{user?.name || asg.user_id}</p>
                          <p className="text-[11px] text-admin-text-faint font-mono">{user?.email || "—"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-xs px-2 py-0.5 bg-admin-surface border border-admin-border rounded-xs text-admin-text-secondary font-medium">
                        {roleLabels[asg.assignment_role] || asg.assignment_role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {asg.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-admin-text-muted">
                      {formatShortDate(asg.start_date)}
                    </td>
                    <td className="p-3 text-admin-text-secondary max-w-md">
                      {asg.instructions || "Standard operational parameters apply."}
                    </td>
                    <td className="p-3 text-right font-mono text-[10px] text-admin-text-faint">
                      {asg.id}
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
