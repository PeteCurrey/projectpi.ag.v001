import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldAlert,
  Clock,
  UserCheck,
  Building,
  Mail,
  Phone,
  Calendar,
  ArrowRight,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import PriorityIndicator from "../../components/PriorityIndicator";
import { getLeadById, getUserById, FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Triage Enquiry | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const enquiry = getLeadById(resolvedParams.id);

  if (!enquiry) {
    notFound();
  }

  const assignedStaff = enquiry.assigned_to ? getUserById(enquiry.assigned_to) : null;

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <AdminPageHeader
        label={`ENQUIRY TRIAGE / ${enquiry.reference}`}
        title={`Intake: ${enquiry.contact_name}`}
        description={`Submitted ${new Date(enquiry.submitted_at).toLocaleString("en-GB")}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/enquiries"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Queue
            </Link>
            {enquiry.converted_to_matter_id ? (
              <Link
                href={`/admin/matters/${enquiry.converted_to_matter_id}`}
                className="px-3 py-1.5 text-xs font-mono bg-emerald-600 text-white rounded-xs hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                View Converted Matter
              </Link>
            ) : (
              <button className="px-3 py-1.5 text-xs font-mono uppercase font-medium bg-admin-accent text-white rounded-xs hover:bg-admin-accent/90 transition-colors">
                Convert to Matter
              </button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: NARRATIVE & DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          {/* INSTRUCTION OVERVIEW CARD */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-admin-border pb-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                Client Statement & Brief
              </h2>
              <div className="flex items-center gap-2">
                <StatusBadge status={enquiry.status} />
                <PriorityIndicator priority={enquiry.urgency} showLabel />
              </div>
            </div>

            <div className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs">
              <p className="text-xs text-admin-text-faint font-mono uppercase mb-1">
                Instruction Narrative
              </p>
              <p className="text-sm text-admin-text leading-relaxed whitespace-pre-line">
                {enquiry.narrative || "No specific narrative provided."}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Vertical Type</p>
                <p className="font-medium text-admin-text uppercase font-mono mt-0.5">
                  {enquiry.enquiry_type.replace(/_/g, " ")}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Sub-Category</p>
                <p className="font-medium text-admin-text mt-0.5">
                  {enquiry.service_subcategory || "—"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Client Classification</p>
                <p className="font-medium text-admin-text mt-0.5">
                  {enquiry.professional_client_type || "Private Client"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Preferred Contact</p>
                <p className="font-medium text-admin-text mt-0.5">
                  {enquiry.preferred_contact_method || "Email"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Deadline</p>
                <p className="font-medium text-admin-text mt-0.5 font-mono">
                  {enquiry.deadline_at
                    ? new Date(enquiry.deadline_at).toLocaleDateString("en-GB")
                    : "Flexible / Standard"}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-admin-text-muted">Retention Status</p>
                <p className="font-medium text-emerald-700 mt-0.5 font-mono">
                  {enquiry.retention_status}
                </p>
              </div>
            </div>
          </div>

          {/* CONFLICT CHECK & QUALIFICATION WORKFLOW */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-3">
              Recorded Triage & Compliance Assessments
            </h2>
            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-2.5 p-2.5 bg-admin-surface/50 border border-admin-border rounded-xs cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5" />
                <div>
                  <span className="font-medium text-admin-text block">Conflict Search Performed — No Match Identified</span>
                  <span className="text-admin-text-muted text-[11px]">
                    Internal database query executed against parties and adverse subjects. Requires Director sign-off prior to engagement.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 bg-admin-surface/50 border border-admin-border rounded-xs cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5" />
                <div>
                  <span className="font-medium text-admin-text block">Recorded Processing Assessment (Legitimate Interest)</span>
                  <span className="text-admin-text-muted text-[11px]">
                    Documented lawful basis review under UK GDPR / DPA 2018. Special category / criminal offence data flagged if present.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 bg-admin-surface/50 border border-admin-border rounded-xs cursor-pointer">
                <input type="checkbox" className="mt-0.5" />
                <div>
                  <span className="font-medium text-admin-text block">Fee Quote & Retainer Acceptance</span>
                  <span className="text-admin-text-muted text-[11px]">
                    Agreed engagement terms and fee structure confirmed prior to fieldwork deployment.
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COL: CONTACT & ALLOCATION */}
        <div className="space-y-6">
          {/* CLIENT CONTACT INFO */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Instructing Party Details
            </h2>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-admin-text-faint shrink-0" />
                <div>
                  <p className="font-medium text-admin-text">{enquiry.contact_name}</p>
                  <p className="text-[11px] text-admin-text-muted">{enquiry.organisation_name || "Private Individual"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-admin-text-faint shrink-0" />
                <a href={`mailto:${enquiry.contact_email}`} className="text-admin-accent hover:underline font-mono">
                  {enquiry.contact_email}
                </a>
              </div>

              {enquiry.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-admin-text-faint shrink-0" />
                  <a href={`tel:${enquiry.contact_phone}`} className="text-admin-text font-mono">
                    {enquiry.contact_phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* INTERNAL ALLOCATION */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Assigned Directorate
            </h2>

            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-admin-text-muted">Assigned Lead:</span>
                <span className="font-medium text-admin-text">
                  {assignedStaff ? assignedStaff.name : "Unassigned"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-admin-text-muted">Reviewed At:</span>
                <span className="font-mono text-admin-text">
                  {enquiry.reviewed_at ? new Date(enquiry.reviewed_at).toLocaleDateString("en-GB") : "Pending"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-admin-border">
              <label className="text-[11px] font-mono text-admin-text-muted block mb-1">
                Reassign Investigator
              </label>
              <select className="w-full text-xs p-1.5 bg-admin-surface border border-admin-border rounded-xs">
                {FIXTURE_USERS.filter((u) => u.role === "INVESTIGATOR" || u.role === "ADMIN").map((u) => (
                  <option key={u.id} value={u.id} selected={u.id === enquiry.assigned_to}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
