import { notFound } from "next/navigation";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { getLeadDetail } from "@/lib/admin/queries/leads";
import { formatDateTime } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LeadDetailPage({ params }: Props) {
  const { id } = await params;
  const detail = getLeadDetail(id);

  if (!detail) {
    notFound();
  }

  const { enquiry, assigneeName, convertedCaseReference } = detail;

  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label={`ENQUIRY ${enquiry.reference}`}
        title={`${enquiry.contact_name} — ${enquiry.organisation_name || "Private Individual"}`}
        description={`Submitted ${formatDateTime(enquiry.submitted_at)}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={enquiry.status} />
            <StatusBadge status={enquiry.urgency} />
            {enquiry.status !== "INSTRUCTED" && (
              <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
                Convert to Case &rarr;
              </button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-admin-border p-5 rounded-sm shadow-admin-card">
            <h3 className="text-xs font-mono uppercase text-admin-text-muted mb-2 tracking-wider">Instruction Narrative & Objectives</h3>
            <p className="text-sm text-admin-text-secondary leading-relaxed whitespace-pre-wrap">{enquiry.narrative}</p>
          </div>

          {convertedCaseReference && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xs text-xs flex justify-between items-center text-emerald-900">
              <div>
                <span className="font-semibold block">Converted Matter Live:</span>
                This enquiry was instructed and converted into an active matter file.
              </div>
              <Link href={`/admin/cases/${convertedCaseReference}`} className="font-mono text-emerald-700 underline font-medium">
                {convertedCaseReference} &rarr;
              </Link>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card text-xs space-y-3">
            <h3 className="font-mono uppercase text-admin-text-muted text-[11px] tracking-wider border-b border-admin-border pb-2">
              Contact Dossier
            </h3>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Primary Contact</span>
              <span className="font-medium text-admin-text">{enquiry.contact_name}</span>
            </div>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Email</span>
              <span className="font-mono text-admin-text">{enquiry.contact_email}</span>
            </div>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Telephone</span>
              <span className="font-mono text-admin-text">{enquiry.contact_phone || "—"}</span>
            </div>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Organisation</span>
              <span className="text-admin-text">{enquiry.organisation_name || "—"}</span>
            </div>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Professional Client Type</span>
              <span className="font-mono text-admin-text uppercase">{enquiry.professional_client_type || "—"}</span>
            </div>
            <div>
              <span className="text-admin-text-muted block text-[11px]">Assigned Case Officer</span>
              <span className="text-admin-text font-medium">{assigneeName || "Unassigned"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
