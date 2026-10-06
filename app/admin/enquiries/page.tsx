import React from "react";
import Link from "next/link";
import AdminPageHeader from "../components/AdminPageHeader";
import StatusBadge from "../components/StatusBadge";
import PriorityIndicator from "../components/PriorityIndicator";
import { FIXTURE_LEADS, getUserById } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Enquiry Triage Queue | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminEnquiriesPage() {
  const enquiries = [...FIXTURE_LEADS].sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  );

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="CLIENT INTAKE & TRIAGE"
        title="Confidential Enquiries & Instructions"
        description="Review inbound matters, qualify jurisdiction and conflict of interest, and convert into active client instructions."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-admin-text-muted">
              {enquiries.length} total recorded enquiries
            </span>
          </div>
        }
      />

      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
        <div className="p-4 border-b border-admin-border flex flex-wrap items-center justify-between gap-4 bg-admin-surface/30">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="font-semibold text-admin-text">Filter Status:</span>
            <span className="px-2 py-0.5 bg-admin-text text-white rounded-xs">All ({enquiries.length})</span>
            <span className="px-2 py-0.5 bg-white border border-admin-border text-admin-text-secondary rounded-xs">
              New ({enquiries.filter((e) => e.status === "NEW").length})
            </span>
            <span className="px-2 py-0.5 bg-white border border-admin-border text-admin-text-secondary rounded-xs">
              Instructed ({enquiries.filter((e) => e.status === "INSTRUCTED").length})
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-admin-border bg-admin-surface/50 text-admin-text-faint font-mono text-[10px] uppercase">
                <th className="p-3 font-medium">Reference</th>
                <th className="p-3 font-medium">Contact / Organisation</th>
                <th className="p-3 font-medium">Service Vertical</th>
                <th className="p-3 font-medium">Urgency</th>
                <th className="p-3 font-medium">Status</th>
                <th className="p-3 font-medium">Received At</th>
                <th className="p-3 font-medium">Assigned</th>
                <th className="p-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border-subtle">
              {enquiries.map((enq) => {
                const assignedUser = enq.assigned_to ? getUserById(enq.assigned_to) : null;
                return (
                  <tr key={enq.id} className="hover:bg-admin-surface/40 transition-colors">
                    <td className="p-3 font-mono font-medium text-admin-text">
                      <Link href={`/admin/enquiries/${enq.id}`} className="hover:text-admin-accent">
                        {enq.reference}
                      </Link>
                    </td>
                    <td className="p-3">
                      <p className="font-medium text-admin-text">{enq.contact_name}</p>
                      <p className="text-[11px] text-admin-text-muted">
                        {enq.organisation_name || enq.contact_email}
                      </p>
                    </td>
                    <td className="p-3 font-mono text-[11px] uppercase text-admin-text-secondary">
                      {enq.enquiry_type.replace(/_/g, " ")}
                      {enq.service_subcategory ? ` · ${enq.service_subcategory}` : ""}
                    </td>
                    <td className="p-3">
                      <PriorityIndicator priority={enq.urgency} showLabel />
                    </td>
                    <td className="p-3">
                      <StatusBadge status={enq.status} />
                    </td>
                    <td className="p-3 font-mono text-[11px] text-admin-text-muted">
                      {new Date(enq.submitted_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-3 text-[11px] text-admin-text-secondary">
                      {assignedUser ? assignedUser.name : <span className="text-admin-text-faint italic">Unassigned</span>}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="px-2.5 py-1 text-[11px] font-mono uppercase bg-admin-surface border border-admin-border hover:border-admin-accent text-admin-text rounded-xs transition-colors"
                      >
                        Triage
                      </Link>
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
