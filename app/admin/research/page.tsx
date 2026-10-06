import type { Metadata } from "next";
import DedicatedResearchWorkspacePage from "./workspace/page";

export const metadata: Metadata = {
  title: "Research Workspace | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminResearchRoutePage() {
  return <DedicatedResearchWorkspacePage />;
}
