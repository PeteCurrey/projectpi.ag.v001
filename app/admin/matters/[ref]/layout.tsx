import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import StatusBadge from "@/app/admin/components/StatusBadge";
import PriorityIndicator from "@/app/admin/components/PriorityIndicator";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import {
  FolderOpen,
  Activity,
  Users,
  ClipboardList,
  CheckSquare,
  FlaskConical,
  Brain,
  ShieldCheck,
  FileText,
  MessageSquare,
  MapPin,
  Eye,
  Stamp,
  FileBarChart,
  Receipt,
  ScrollText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Matter Workspace — Admin",
  robots: "noindex, nofollow",
};

interface MatterLayoutProps {
  children: React.ReactNode;
  params: Promise<{ ref: string }>;
}

export default async function MatterWorkspaceLayout({
  children,
  params,
}: MatterLayoutProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, clientName, leadInvestigatorName } = detail;

  const baseHref = `/admin/matters/${matter.reference}`;

  const tabs = [
    { label: "Overview", href: baseHref, icon: FolderOpen },
    { label: "Timeline", href: `${baseHref}/timeline`, icon: Activity, count: detail.events.length },
    { label: "Subjects", href: `${baseHref}/subjects`, icon: Users, count: detail.subjects.length },
    { label: "Assignments", href: `${baseHref}/assignments`, icon: ClipboardList, count: detail.assignments.length },
    { label: "Tasks", href: `${baseHref}/tasks`, icon: CheckSquare, count: detail.tasks.length },
    { label: "Research", href: `${baseHref}/research`, icon: FlaskConical },
    { label: "Intelligence", href: `${baseHref}/intelligence`, icon: Brain },
    { label: "Evidence", href: `${baseHref}/evidence`, icon: ShieldCheck, count: detail.evidence.length },
    { label: "Documents", href: `${baseHref}/documents`, icon: FileText, count: detail.documents.length },
    { label: "Messages", href: `${baseHref}/messages`, icon: MessageSquare, count: detail.messages.length },
    { label: "Field Ops", href: `${baseHref}/field-ops`, icon: MapPin },
    { label: "Surveillance", href: `${baseHref}/surveillance`, icon: Eye },
    { label: "Process Serving", href: `${baseHref}/process-serving`, icon: Stamp },
    { label: "Reports", href: `${baseHref}/reports`, icon: FileBarChart },
    { label: "Commercial", href: `${baseHref}/commercial`, icon: Receipt },
    { label: "Audit", href: `${baseHref}/audit`, icon: ScrollText },
  ];

  const conf = matter.confidentiality || "STANDARD";
  const confStyles =
    conf === "HIGHLY_CONFIDENTIAL"
      ? "bg-red-50 text-red-700 border-red-200"
      : conf === "CONFIDENTIAL"
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-admin-surface text-admin-text-secondary border-admin-border";

  return (
    <div className="flex flex-col min-h-full">
      <AdminPageHeader
        label={`MATTER ${matter.reference} · ${matter.matter_type.replace(/_/g, " ")}`}
        title={matter.title}
        description={`Instructing Client: ${clientName} · Lead Investigator: ${leadInvestigatorName}`}
        actions={
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono px-2 py-0.5 border rounded-xs uppercase tracking-wider font-semibold ${confStyles}`}
            >
              {conf.replace(/_/g, " ")}
            </span>
            <StatusBadge status={matter.status} />
            <div className="px-2 py-1 bg-white border border-admin-border rounded-xs">
              <PriorityIndicator priority={matter.priority} showLabel />
            </div>
            <Link
              href="/admin/matters"
              className="px-2.5 py-1 text-xs font-mono bg-admin-surface border border-admin-border text-admin-text-muted hover:text-admin-text rounded-xs transition-colors"
            >
              ← Matters
            </Link>
          </div>
        }
      />

      {/* 16-Tab Navigation Bar */}
      <div className="bg-admin-surface border-b border-admin-border px-6 overflow-x-auto">
        <nav className="flex space-x-1 py-1 text-xs font-medium">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex items-center gap-1.5 px-3 py-1.5 text-admin-text-secondary hover:text-admin-text hover:bg-admin-hover rounded-xs transition-colors whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 shrink-0 text-admin-text-muted" />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && tab.count > 0 && (
                  <span className="text-[10px] font-mono px-1 py-0.2 bg-white border border-admin-border rounded-xs text-admin-text-muted">
                    {tab.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Workspace Body */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
