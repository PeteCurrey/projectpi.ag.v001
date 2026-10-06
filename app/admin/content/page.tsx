import type { Metadata } from "next";
import Link from "next/link";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { LayoutTemplate, Layers, BookOpen, HelpCircle, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Management — Admin",
  robots: "noindex, nofollow",
};

const CMS_MODULES = [
  {
    title: "Investigation Services",
    count: 22,
    href: "/services",
    desc: "Public-facing service descriptions, operational scope notes, and legal justifications.",
    icon: Layers,
  },
  {
    title: "Legal & Investigative Insights",
    count: 6,
    href: "/insights",
    desc: "Authoritative whitepapers, compliance briefing notes, and legal procedure explainers.",
    icon: BookOpen,
  },
  {
    title: "Client Types & Portfolios",
    count: 13,
    href: "/professional-clients",
    desc: "Bespoke service profiles for solicitors, insolvency practitioners, and insurers.",
    icon: FileText,
  },
  {
    title: "Jurisdictional Process Serving",
    count: 4,
    href: "/process-server/london",
    desc: "Local court bailiff & process server coverage across London, Manchester, Leeds, and Birmingham.",
    icon: Globe,
  },
];

export default function ContentManagementPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Content / CMS"
        title="Content Governance & Publication"
        description="Public site information architecture, legal insight articles, and verified practice statements."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CMS_MODULES.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <div key={idx} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-admin-surface border border-admin-border rounded-xs">
                    <Icon className="w-4 h-4 text-admin-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-admin-text">{mod.title}</h3>
                    <span className="text-[10px] font-mono text-admin-text-faint">{mod.count} Published Entries</span>
                  </div>
                </div>
                <Link
                  href={mod.href}
                  target="_blank"
                  className="text-xs font-mono text-admin-accent hover:underline"
                >
                  View Public &rarr;
                </Link>
              </div>
              <p className="text-xs text-admin-text-muted leading-relaxed">{mod.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
