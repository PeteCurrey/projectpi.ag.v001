import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getSubjectsByMatter } from "@/lib/admin/fixtures/subjects";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseIntelligencePage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const subjects = getSubjectsByMatter(detail.matter.id);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
        <h2 className="text-sm font-semibold text-admin-text">Intelligence Graph & Entity Association</h2>
        <p className="text-xs text-admin-text-muted">Entity relationship structures, linked offshore interests, and corroborated background records.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Subject Linkages</span>
          <div className="mt-3 space-y-2">
            {subjects.map((s) => (
              <div key={s.id} className="p-2.5 bg-admin-surface border border-admin-border rounded-xs text-xs">
                <div className="font-semibold text-admin-text">{s.name}</div>
                <div className="text-[11px] text-admin-text-muted mt-0.5">Role: {s.role} · Verification: {s.confidence_rating}</div>
                {s.employer && <div className="text-[11px] text-admin-accent mt-0.5 font-mono">Entity: {s.employer}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card">
          <span className="admin-label">Corporate & Cross-Border Traces</span>
          <div className="mt-3 space-y-2 text-xs">
            <div className="p-2.5 bg-admin-surface border border-admin-border rounded-xs">
              <span className="font-mono text-[10px] text-admin-accent uppercase block">Jurisdiction: United Kingdom</span>
              <span className="font-medium text-admin-text">Companies House Cross-Directorship Analysis</span>
              <p className="text-[11px] text-admin-text-muted mt-1">Cross-referencing confirmed 2 active directorships and 1 dissolved PSC register filing.</p>
            </div>
            <div className="p-2.5 bg-admin-surface border border-admin-border rounded-xs">
              <span className="font-mono text-[10px] text-admin-accent uppercase block">Jurisdiction: Overseas</span>
              <span className="font-medium text-admin-text">Nominee Ownership Traces</span>
              <p className="text-[11px] text-admin-text-muted mt-1">Pending corroboration from international registry cross-queries.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
