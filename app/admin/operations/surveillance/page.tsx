import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { Eye, MapPin, Calendar, Clock, Shield, Plus } from "lucide-react";
import { formatShortDate } from "@/lib/admin/utils/dates";

export const metadata: Metadata = {
  title: "Surveillance Operations — Admin",
  robots: "noindex, nofollow",
};

const FIXTURE_SURVEILLANCE_DEPLOYMENTS = [
  {
    id: "surv-001",
    matter_ref: "MAT-2501-005",
    subject_name: "Clara Higgins",
    objective: "Static and mobile covert observation to document claimed mobility restriction inconsistencies.",
    location: "Wilmslow / South Manchester",
    status: "IN_PROGRESS",
    start_date: "2025-10-04",
    lead_operative: "James Whitfield",
    team_size: 2,
    log_count: 8,
    evidence_recorded: "14 Video Clips, 22 Photographs",
  },
  {
    id: "surv-002",
    matter_ref: "MAT-2501-001",
    subject_name: "Arthur Pendelton",
    objective: "Lifestyle surveillance and pattern-of-life documentation regarding suspected third-party meetings.",
    location: "St. John's Wood / Central London",
    status: "COMPLETED",
    start_date: "2025-10-01",
    lead_operative: "Sarah Chen",
    team_size: 3,
    log_count: 15,
    evidence_recorded: "Meeting Photographed, Subject Identified with Contact",
  },
];

export default function SurveillanceOperationsPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Operations / Surveillance"
        title="Covert Surveillance Deployments"
        description="Tasking directives, mobile observation units, covert logging, and evidential capture management."
        actions={
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
            <Plus className="w-3.5 h-3.5" />
            New Deployment
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Active Deployments</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">1 Live Unit</div>
          <p className="text-[11px] text-admin-text-muted mt-1">2 Operatives deployed in field</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Evidential Compliance</span>
          <div className="text-2xl font-serif font-semibold text-emerald-700 mt-2">100% RIPA / DPA</div>
          <p className="text-[11px] text-admin-text-muted mt-1">Legitimate Interest Assessment logged</p>
        </div>
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Observation Logs (MTD)</span>
          <div className="text-2xl font-serif font-semibold text-admin-text mt-2">23 Logs</div>
          <p className="text-[11px] text-admin-text-muted mt-1">Synchronised with case timelines</p>
        </div>
      </div>

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-admin-surface border-b border-admin-border text-[10px] font-mono uppercase tracking-wider text-admin-text-muted">
            <tr>
              <th className="p-3">Matter Ref</th>
              <th className="p-3">Target Subject</th>
              <th className="p-3">Operational Objective</th>
              <th className="p-3">Location</th>
              <th className="p-3">Status</th>
              <th className="p-3">Lead Operative</th>
              <th className="p-3">Deployment Date</th>
              <th className="p-3">Evidential Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-border-subtle">
            {FIXTURE_SURVEILLANCE_DEPLOYMENTS.map((s) => (
              <tr key={s.id} className="hover:bg-admin-surface/40 transition-colors">
                <td className="p-3 font-mono font-medium text-admin-accent">{s.matter_ref}</td>
                <td className="p-3 font-semibold text-admin-text">{s.subject_name}</td>
                <td className="p-3 text-admin-text-secondary max-w-xs">{s.objective}</td>
                <td className="p-3 text-admin-text-muted whitespace-nowrap">{s.location}</td>
                <td className="p-3 whitespace-nowrap">
                  <StatusBadge status={s.status} />
                </td>
                <td className="p-3 whitespace-nowrap">{s.lead_operative}</td>
                <td className="p-3 font-mono text-admin-text-muted whitespace-nowrap">
                  {formatShortDate(s.start_date)}
                </td>
                <td className="p-3 text-[11px] text-admin-text-secondary">{s.evidence_recorded}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
