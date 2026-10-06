import type { Metadata } from "next";
import AdminPageHeader from "@/app/admin/components/AdminPageHeader";
import { Globe, Search, Database, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "OSINT Toolkit — Admin",
  robots: "noindex, nofollow",
};

const OSINT_CATEGORIES = [
  {
    category: "Corporate & Director Registries",
    tools: [
      { name: "Companies House Service (UK)", url: "https://find-and-update.company-information.service.gov.uk/", desc: "Officers, PSC filings, charges, and accounts." },
      { name: "OpenCorporates", url: "https://opencorporates.com/", desc: "Global corporate registry cross-referencing." },
      { name: "Gazette (Official Public Record)", url: "https://www.thegazette.co.uk/", desc: "Insolvency notices, state honours, corporate declarations." },
    ],
  },
  {
    category: "Land & Property Tracing",
    tools: [
      { name: "HM Land Registry", url: "https://eservices.landregistry.gov.uk/", desc: "Title deeds, freehold/leasehold plans, price paid history." },
      { name: "ScotLIS (Registers of Scotland)", url: "https://scotlis.ros.gov.uk/", desc: "Land and property data for Scottish jurisdictions." },
    ],
  },
  {
    category: "Court & Legal Records",
    tools: [
      { name: "National Archives Case Law", url: "https://caselaw.nationalarchives.gov.uk/", desc: "Judgments from UK Supreme Court, High Court, and tribunals." },
      { name: "BAILII", url: "https://www.bailii.org/", desc: "British and Irish Legal Information Institute database." },
      { name: "Individual Insolvency Register", url: "https://www.insolvencydirect.bis.gov.uk/eiir/", desc: "Bankruptcy orders, debt relief orders, and IVAs." },
    ],
  },
  {
    category: "Digital Footprint & Domains",
    tools: [
      { name: "Nominet WHOIS (.uk)", url: "https://www.nominet.uk/whois/", desc: "Official .uk domain registration records." },
      { name: "Wayback Machine", url: "https://archive.org/web/", desc: "Historical website captures and deleted content." },
    ],
  },
];

export default function OsintToolkitPage() {
  return (
    <div className="p-6 space-y-6">
      <AdminPageHeader
        label="Research / OSINT Toolkit"
        title="Open-Source Intelligence Directory"
        description="Standardized UK investigative intelligence endpoints, statutory registries, and corporate trace tools."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OSINT_CATEGORIES.map((cat, idx) => (
          <div key={idx} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-admin-text-muted mb-4 border-b border-admin-border pb-2 flex items-center justify-between">
              <span>{cat.category}</span>
              <Database className="w-3.5 h-3.5 text-admin-text-faint" />
            </h3>
            <div className="space-y-3">
              {cat.tools.map((tool, tIdx) => (
                <div key={tIdx} className="p-3 bg-admin-surface/30 border border-admin-border rounded-xs hover:bg-admin-surface/60 transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-xs text-admin-text">{tool.name}</span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-admin-accent hover:text-admin-accent-hover text-[11px] font-mono flex items-center gap-1"
                    >
                      Launch <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-admin-text-muted mt-1">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
