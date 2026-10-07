import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { researchStore } from "@/lib/admin/research/store";
import DedicatedResearchWorkspacePage from "@/app/admin/research/workspace/page";

interface ResearchProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterResearchPage({ params }: ResearchProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter } = detail;

  // Pre-load findings, pivots, and current objective scoped to this Matter
  const initialFindings = researchStore.getFindings(matter.reference);
  const initialPivots = researchStore.getPivots(matter.reference);
  const currentObjective = researchStore.getObjective(matter.reference);

  return (
    <div className="-m-6">
      <DedicatedResearchWorkspacePage
        initialCaseRef={matter.reference}
        initialFindings={initialFindings}
        initialPivots={initialPivots}
        initialObjective={currentObjective?.objective || matter.investigation_objective}
      />
    </div>
  );
}
