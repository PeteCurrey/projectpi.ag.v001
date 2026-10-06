import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { getSubjectsByMatter } from "@/lib/admin/fixtures/subjects";
import { researchStore } from "@/lib/admin/research/store";
import { ExternalLink, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseIntelligencePage({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);
  if (!detail) notFound();

  const subjects = getSubjectsByMatter(detail.matter.id);
  const promotedFindings = researchStore
    .getFindings(detail.matter.reference)
    .filter((f) => f.saved_to_case);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-admin-border p-4 rounded-sm shadow-admin-card flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold text-admin-text">Intelligence Graph & Attributed Dossier</h2>
          <p className="text-xs text-admin-text-muted">
            Aggregated intelligence findings, corroborated corporate registries, and entity traces for {detail.matter.reference}.
          </p>
        </div>
        <Link
          href={`/admin/cases/${detail.matter.reference}/research`}
          className="px-3 py-1.5 bg-admin-text text-white text-xs font-medium rounded-xs hover:bg-admin-text/90 flex items-center gap-1.5"
        >
          <span>Open Research Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Promoted Research Intelligence */}
      <div className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-admin-border pb-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text font-semibold">
            Promoted Research Findings ({promotedFindings.length})
          </h3>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
            AUDITED DOSSIER
          </span>
        </div>

        {promotedFindings.length === 0 ? (
          <div className="p-6 text-center text-xs text-admin-text-muted">
            No research findings promoted to intelligence yet.{" "}
            <Link
              href={`/admin/cases/${detail.matter.reference}/research`}
              className="text-admin-accent hover:underline"
            >
              Log findings in Research Workspace
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {promotedFindings.map((finding) => (
              <div
                key={finding.id}
                className="p-3.5 bg-admin-surface/50 border border-admin-border rounded-xs text-xs space-y-2 hover:border-admin-accent transition-colors"
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-admin-text text-xs">{finding.title}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded-xs">
                        {finding.confidence}
                      </span>
                      <span className="text-[9px] font-mono px-1 py-0.5 bg-white border border-admin-border rounded-xs text-admin-text-faint">
                        {finding.linked_entity_type}
                      </span>
                    </div>
                    <div className="text-[11px] text-admin-text-muted mt-0.5">
                      Target: <strong className="text-admin-text">{finding.subject_name || "General Matter"}</strong> · Researcher: {finding.researcher}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-admin-text-faint shrink-0">
                    Accessed: {finding.date_accessed}
                  </span>
                </div>

                <p className="text-xs text-admin-text-secondary leading-relaxed bg-white border border-admin-border-subtle p-2.5 rounded-xs">
                  {finding.finding}
                </p>

                <div className="pt-2 border-t border-admin-border-subtle flex justify-between items-center text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-admin-text-muted">PROVENANCE: {finding.source_name}</span>
                    <a
                      href={finding.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-admin-accent hover:underline flex items-center gap-0.5"
                    >
                      {finding.source_url} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <Link
                    href={`/admin/cases/${detail.matter.reference}/research`}
                    className="text-admin-text-muted hover:text-admin-accent flex items-center gap-1"
                  >
                    View in Workspace &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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
