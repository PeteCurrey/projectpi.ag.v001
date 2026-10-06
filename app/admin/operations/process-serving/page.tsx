import type { Metadata } from "next";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { formatShortDate } from "@/lib/admin/utils/dates";
import { Stamp, MapPin, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Process Serving — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_PROCESS_JOBS = [
  {
    id: "ps-001",
    matter_ref: "MAT-2501-002",
    document_type: "WINDING_UP_PETITION",
    subject_name: "Julian Vance",
    jurisdiction: "Battersea, London SW11",
    status: "FIELDWORK",
    attempts: 1,
    max_attempts: 3,
    operative: "Thomas Hardy",
    court_deadline: "2025-10-10",
  },
  {
    id: "ps-002",
    matter_ref: "MAT-2501-006",
    document_type: "STATUTORY_DEMAND",
    subject_name: "A. Sterling",
    jurisdiction: "Leeds, LS1",
    status: "SERVED",
    attempts: 2,
    max_attempts: 3,
    operative: "Sarah Chen",
    court_deadline: "2025-10-02",
  },
];

export default function ProcessServingOperationsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Operations / Process Serving"
        title="Process Serving Field Dispatch"
        description="Statutory notices, court claim forms, witness summonses, and personal service affidavits."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Stamp className="w-3.5 h-3.5" />
            + New Instruction
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Active Field Dispatches</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">1 Active</div>
          <p className="text-[11px] text-admin-text-muted mt-1">1 scheduled pre-dawn attempt</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Service Rate (CPR Compliant)</span>
          <div className="text-2xl font-serif font-semibold text-emerald-700 mt-2">100%</div>
          <p className="text-[11px] text-admin-text-muted mt-1">Zero contested returns or defective service</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Affidavits Issued</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">1 Issued</div>
          <p className="text-[11px] text-admin-text-muted mt-1">Accompanied by statement of service</p>
        </div>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Matter Ref</th>
              <th className="p-3">Document Type</th>
              <th className="p-3">Target Subject</th>
              <th className="p-3">Jurisdiction</th>
              <th className="p-3">Status</th>
              <th className="p-3">Attempts</th>
              <th className="p-3">Field Operative</th>
              <th className="p-3">Court Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {FIXTURE_PROCESS_JOBS.map((job) => (
              <tr key={job.id} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3 font-mono">
                  <Link href={`/admin/cases/${job.matter_ref}`} className="text-admin-accent hover:underline">
                    {job.matter_ref}
                  </Link>
                </td>
                <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                  {job.document_type.replace(/_/g, " ")}
                </td>
                <td className="p-3 font-medium text-admin-text">{job.subject_name}</td>
                <td className="p-3 text-admin-text-secondary">{job.jurisdiction}</td>
                <td className="p-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="p-3 font-mono text-[11px]">
                  {job.attempts} of {job.max_attempts}
                </td>
                <td className="p-3 text-admin-text">{job.operative}</td>
                <td className="p-3 font-mono text-red-600 font-medium">
                  {formatShortDate(job.court_deadline)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
