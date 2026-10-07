import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { MapPin, Eye, Stamp, Shield, Clock, ArrowRight } from "lucide-react";

interface FieldOpsProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterFieldOpsPage({ params }: FieldOpsProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, assignments } = detail;
  const fieldAssignments = assignments.filter((a) =>
    ["FIELD_OPERATIVE", "SURVEILLANCE_OPERATIVE", "PROCESS_SERVER"].includes(a.assignment_role)
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Field Operations & Physical Deployments</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Coordination hub for physical field investigations, surveillance teams, and process server attendances linked to this Matter.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Surveillance Sub-card */}
        <div className="bg-white border border-admin-border rounded-sm p-5 shadow-admin-card space-y-3">
          <div className="flex items-center justify-between border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-admin-accent" />
              <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">
                Surveillance Logs
              </h3>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">DEPLOYED</span>
          </div>
          <p className="text-xs text-admin-text-muted">
            Static & mobile observations, video logs, vehicle tracking, and subject activity records.
          </p>
          <div className="pt-2">
            <Link
              href={`/admin/matters/${matter.reference}/surveillance`}
              className="inline-flex items-center gap-1.5 text-xs text-admin-accent hover:underline font-mono"
            >
              Open Surveillance Module →
            </Link>
          </div>
        </div>

        {/* Process Serving Sub-card */}
        <div className="bg-white border border-admin-border rounded-sm p-5 shadow-admin-card space-y-3">
          <div className="flex items-center justify-between border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <Stamp className="w-4 h-4 text-admin-accent" />
              <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">
                Process Serving
              </h3>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">SERVICE</span>
          </div>
          <p className="text-xs text-admin-text-muted">
            Court papers, statutory demands, service attempt logs, and affidavits of personal service.
          </p>
          <div className="pt-2">
            <Link
              href={`/admin/matters/${matter.reference}/process-serving`}
              className="inline-flex items-center gap-1.5 text-xs text-admin-accent hover:underline font-mono"
            >
              Open Process Serving Module →
            </Link>
          </div>
        </div>

        {/* Active Operatives Summary */}
        <div className="bg-white border border-admin-border rounded-sm p-5 shadow-admin-card space-y-3">
          <div className="flex items-center justify-between border-b border-admin-border pb-2.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-admin-accent" />
              <h3 className="text-xs font-mono uppercase font-semibold text-admin-text">
                Field Operatives
              </h3>
            </div>
            <span className="text-[10px] font-mono text-admin-text-faint">ROSTER</span>
          </div>
          <p className="text-xs text-admin-text-muted">
            {fieldAssignments.length} field operative{fieldAssignments.length !== 1 ? "s" : ""} currently assigned to this matter.
          </p>
          <div className="pt-2">
            <Link
              href={`/admin/matters/${matter.reference}/assignments`}
              className="inline-flex items-center gap-1.5 text-xs text-admin-accent hover:underline font-mono"
            >
              View Operative Rosters →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
