import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Stamp, MapPin, Calendar, Clock, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import AdminPageHeader from "../../components/AdminPageHeader";
import StatusBadge from "../../components/StatusBadge";
import PriorityIndicator from "../../components/PriorityIndicator";
import { getCaseById, getClientById, getUserById, FIXTURE_CASE_EVENTS } from "@/lib/admin/fixtures";

export const metadata = {
  title: "Process Serving Hub | PI Operations",
  robots: "noindex, nofollow",
};

export default async function AdminProcessServingDetailPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const resolvedParams = await params;
  const matter = getCaseById(resolvedParams.matterId);

  if (!matter) {
    notFound();
  }

  const client = getClientById(matter.client_organisation_id);
  const operative = matter.lead_investigator_id
    ? getUserById(matter.lead_investigator_id)
    : null;
  const events = FIXTURE_CASE_EVENTS.filter(
    (e) => e.matter_id === matter.id && e.event_type === "SERVICE_ATTEMPT"
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <AdminPageHeader
        label={`PROCESS SERVING FILE / ${matter.reference}`}
        title={matter.title}
        description={`Instructing Party: ${client ? client.legal_name : "Private Solicitor"}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/process-serving"
              className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text rounded-xs hover:bg-admin-hover transition-colors"
            >
              ← Back to Overview
            </Link>
            <StatusBadge status={matter.status} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* SERVICE ATTEMPTS LOG */}
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-admin-border pb-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
                Service Attempts Register (Factual Attempt Log)
              </h2>
              <button className="px-3 py-1 text-xs font-mono uppercase bg-admin-text text-white rounded-xs">
                Log New Attempt
              </button>
            </div>

            {events.length === 0 ? (
              <p className="text-xs text-admin-text-muted py-4">No service attempts logged yet.</p>
            ) : (
              <div className="space-y-4">
                {events.map((evt) => (
                  <div key={evt.id} className="p-4 bg-admin-surface/40 border border-admin-border rounded-xs space-y-2 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-semibold text-admin-text">{evt.title}</span>
                      <span className="text-admin-text-muted">{new Date(evt.occurred_at).toLocaleString("en-GB")}</span>
                    </div>
                    <p className="text-admin-text leading-relaxed">{evt.description}</p>
                    <div className="pt-2 border-t border-admin-border flex items-center justify-between text-[11px] text-admin-text-muted">
                      <span>Operative: {operative ? operative.name : "T. Hardy"}</span>
                      <span className="font-mono text-emerald-700">Timestamped Record</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold border-b border-admin-border pb-2">
              Certificate / Statement of Service
            </h2>
            <div className="text-xs space-y-2 text-admin-text-secondary">
              <p>
                Assembles recorded factual details (date, time, address, method, operative notes). A formal Certificate or Affidavit of Service requires human review and confirmation of personal service or CPR Part 6 compliance prior to issue.
              </p>
              <div className="pt-2">
                <button className="w-full py-2 bg-admin-surface border border-admin-border text-admin-text text-xs font-mono uppercase rounded-xs hover:bg-admin-hover">
                  Assemble Draft Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
