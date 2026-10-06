import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime } from "@/lib/admin/utils/dates";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseDocumentsPage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  return (
    <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-6">
      <div className="flex justify-between items-center mb-4 border-b border-admin-border pb-3">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Case Documentation & Briefs</h2>
          <p className="text-xs text-admin-text-muted">Client instructions, signed retainer agreements, identity proofs, and disclosure bundles.</p>
        </div>
        <button className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90">
          + Upload File
        </button>
      </div>

      <div className="space-y-3">
        <div className="p-3 border border-admin-border rounded-xs bg-admin-surface/30 flex justify-between items-center">
          <div>
            <div className="text-xs font-medium text-admin-text">Instruction_Brief_{detail.matter.reference}.pdf</div>
            <div className="text-[11px] text-admin-text-muted mt-0.5">Formal engagement instruction and legal justification</div>
          </div>
          <span className="font-mono text-[10px] text-admin-text-faint">{formatDateTime(detail.matter.opened_at)}</span>
        </div>
        <div className="p-3 border border-admin-border rounded-xs bg-admin-surface/30 flex justify-between items-center">
          <div>
            <div className="text-xs font-medium text-admin-text">Signed_Terms_and_GDPR_Declaration.pdf</div>
            <div className="text-[11px] text-admin-text-muted mt-0.5">DPA Article 6(1)(f) Legitimate Interest Assessment on file</div>
          </div>
          <span className="font-mono text-[10px] text-admin-text-faint">{formatDateTime(detail.matter.opened_at)}</span>
        </div>
      </div>
    </div>
  );
}
