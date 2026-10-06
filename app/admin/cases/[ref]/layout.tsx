import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import { FIXTURE_CASES, FIXTURE_CLIENTS, FIXTURE_USERS } from "@/lib/admin/fixtures";

export const metadata: Metadata = {
  title: "Case Workspace — Admin",
  robots: "noindex, nofollow",
};

interface CaseLayoutProps {
  children: React.ReactNode;
  params: Promise<{ ref: string }>;
}

export default async function CaseWorkspaceLayout({
  children,
  params,
}: CaseLayoutProps) {
  const { ref } = await params;
  const currentCase = FIXTURE_CASES.find((c) => c.reference.toLowerCase() === ref.toLowerCase());

  if (!currentCase) {
    notFound();
  }

  const client = FIXTURE_CLIENTS.find((c) => c.id === currentCase.client_organisation_id);
  const leadInvestigator = FIXTURE_USERS.find((u) => u.id === currentCase.lead_investigator_id);

  const tabs = [
    { label: "Overview", href: `/admin/cases/${currentCase.reference}` },
    { label: "Research", href: `/admin/cases/${currentCase.reference}/research` },
    { label: "Timeline", href: `/admin/cases/${currentCase.reference}/timeline` },
    { label: "Subjects", href: `/admin/cases/${currentCase.reference}/subjects` },
    { label: "Tasks", href: `/admin/cases/${currentCase.reference}/tasks` },
    { label: "Evidence", href: `/admin/cases/${currentCase.reference}/evidence` },
    { label: "Documents", href: `/admin/cases/${currentCase.reference}/documents` },
    { label: "Intelligence", href: `/admin/cases/${currentCase.reference}/intelligence` },
    { label: "Reports", href: `/admin/cases/${currentCase.reference}/reports` },
    { label: "Audit Log", href: `/admin/cases/${currentCase.reference}/audit` },
  ];

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        label={`MATTER ${currentCase.reference}`}
        title={currentCase.title}
        description={`Client: ${client?.legal_name || "Confidential"} · Lead Investigator: ${leadInvestigator?.name || "Unassigned"}`}
        actions={
          <div className="flex items-center gap-2">
            <StatusBadge status={currentCase.status} />
            <span className="text-[11px] font-mono px-2 py-0.5 border border-admin-border bg-white text-admin-text-secondary rounded-xs">
              PRIORITY: {currentCase.priority}
            </span>
          </div>
        }
      />

      {/* 13-Tab Navigation Bar */}
      <div className="bg-admin-surface border-b border-admin-border px-6 overflow-x-auto">
        <nav className="flex space-x-1 py-1">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className="px-3 py-1.5 text-xs font-medium text-admin-text-secondary hover:text-admin-text hover:bg-admin-hover rounded-xs transition-colors whitespace-nowrap"
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex-1 p-6 bg-admin-bg">{children}</div>
    </div>
  );
}
