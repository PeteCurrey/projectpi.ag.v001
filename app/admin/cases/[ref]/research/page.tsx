import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { researchStore } from "@/lib/admin/research/store";
import DedicatedResearchWorkspacePage from "@/app/admin/research/workspace/page";

interface Props {
  params: Promise<{ ref: string }>;
}

export default async function CaseWorkspaceResearchTab({ params }: Props) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  // Pre-load findings and objective for this matter
  const initialFindings = researchStore.getFindings(detail.matter.reference);
  const initialPivots = researchStore.getPivots(detail.matter.reference);
  const currentObjective = researchStore.getObjective(detail.matter.reference);

  return (
    <div className="-m-6">
      <DedicatedResearchWorkspacePage
        initialCaseRef={detail.matter.reference}
        initialFindings={initialFindings}
        initialPivots={initialPivots}
        initialObjective={currentObjective?.objective}
      />
    </div>
  );
}
