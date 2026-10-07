import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { researchStore } from "@/lib/admin/research/store";
import { Brain, ArrowUpRight, ShieldCheck, CheckCircle2, Clock, Globe } from "lucide-react";

interface IntelligenceProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterIntelligencePage({ params }: IntelligenceProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter } = detail;

  // Retrieve promoted research findings and active research items
  const allFindings = researchStore.getFindings(matter.reference);
  const promotedFindings = allFindings.filter((f) => f.promoted_entity_id);
  const corroboratedFindings = allFindings.filter((f) =>
    ["Corroborated", "Verified"].includes(f.confidence)
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Intelligence Repository & Verified Findings</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Aggregated intelligence findings promoted from research with full provenance, source attribution, and evidential chain.
          </p>
        </div>
        <Link
          href={`/admin/matters/${matter.reference}/research`}
          className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5"
        >
          <Brain className="w-3.5 h-3.5 text-admin-accent" />
          Open Research Workspace
        </Link>
      </div>

      {allFindings.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <Brain className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Intelligence Findings Logged</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            Conduct open-source research and corroborate source data in the Research Workspace to promote verified findings into the intelligence record.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allFindings.map((item) => {
            const confidenceStyles =
              item.confidence === "Verified"
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : item.confidence === "Corroborated"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : item.confidence === "Disputed"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-amber-50 text-amber-700 border-amber-200";

            return (
              <div
                key={item.id}
                className="bg-white border border-admin-border rounded-sm p-5 shadow-admin-card space-y-3 hover:border-admin-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-admin-text">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-admin-text-muted">
                      <span>Source: {item.source_type}</span>
                      <span>·</span>
                      <span>Accessed: {item.date_accessed}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 border rounded-xs font-semibold ${confidenceStyles}`}
                  >
                    {item.confidence.toUpperCase()}
                  </span>
                </div>

                <div className="p-3 bg-admin-surface/40 border border-admin-border rounded-xs text-xs text-admin-text-secondary leading-relaxed">
                  {item.finding}
                </div>

                {item.notes && (
                  <p className="text-[11px] text-admin-text-muted italic">
                    Analyst Notes: {item.notes}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-admin-border-subtle text-[11px] font-mono text-admin-text-faint">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    <span className="truncate max-w-[200px]">{item.source_url}</span>
                  </div>
                  {item.promoted_entity_id && (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      PROMOTED ({item.promoted_entity_id})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
