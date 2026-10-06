import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { ClipboardList, Plus, User, Clock, CheckCircle } from "lucide-react";
import { formatShortDate } from "@/lib/admin/utils/dates";

export const metadata: Metadata = {
  title: "Field Assignments — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_ASSIGNMENTS = [
  {
    id: "asg-001",
    operative_name: "Thomas Hardy",
    role: "Process Server / Field Operative",
    matter_ref: "MAT-2501-002",
    task: "Personal Service of High Court Winding-Up Petition (Pre-dawn attempt 05:30)",
    status: "IN_PROGRESS",
    due_date: "2025-10-10",
  },
  {
    id: "asg-002",
    operative_name: "Sarah Chen",
    role: "Senior Investigator",
    matter_ref: "MAT-2501-001",
    task: "Forensic analysis of Dubai freezone company registries and beneficial ownership documentation",
    status: "IN_PROGRESS",
    due_date: "2025-10-12",
  },
  {
    id: "asg-003",
    operative_name: "James Whitfield",
    role: "Field Operative",
    matter_ref: "MAT-2501-005",
    task: "Static surveillance unit setup on suspected claimant gymnasium venue",
    status: "IN_PROGRESS",
    due_date: "2025-10-09",
  },
];

export default function FieldAssignmentsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Operations / Assignments"
        title="Field & Operative Task Allocations"
        description="Deployment schedules, operative work queues, and task dispatch across active investigations."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Plus className="w-3.5 h-3.5" />
            New Assignment
          </button>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Operative</th>
              <th className="p-3">Role</th>
              <th className="p-3">Matter Ref</th>
              <th className="p-3">Assignment Directive</th>
              <th className="p-3">Status</th>
              <th className="p-3">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {FIXTURE_ASSIGNMENTS.map((a) => (
              <tr key={a.id} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3 font-semibold text-admin-text">{a.operative_name}</td>
                <td className="p-3 text-[11px] text-admin-text-muted">{a.role}</td>
                <td className="p-3 font-mono font-medium text-admin-accent">{a.matter_ref}</td>
                <td className="p-3 text-admin-text-secondary max-w-sm">{a.task}</td>
                <td className="p-3">
                  <StatusBadge status={a.status} />
                </td>
                <td className="p-3 font-mono text-admin-text-muted">{formatShortDate(a.due_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
