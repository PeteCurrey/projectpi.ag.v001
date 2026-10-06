import React from "react";
import Link from "next/link";
import { Globe, ShieldAlert, ExternalLink, Lock, AlertTriangle } from "lucide-react";
import AdminPageHeader from "../components/AdminPageHeader";

export const metadata = {
  title: "Intelligence & Research Tools | PI Operations",
  robots: "noindex, nofollow",
};

export default function AdminToolsPage() {
  const tools = [
    {
      name: "Companies House Service",
      category: "Corporate Intelligence",
      description: "Official UK registry of companies, officers, PSCs, charges and accounts.",
      url: "https://find-and-update.company-information.service.gov.uk",
      sensitivity: "PUBLIC_REGISTER",
    },
    {
      name: "HM Land Registry",
      category: "Asset Tracing",
      description: "Title registers, title plans, and flood risk documentation for England & Wales.",
      url: "https://www.gov.uk/search-property-information-land-registry",
      sensitivity: "FEE_PAYABLE",
    },
    {
      name: "The Gazette (Official Public Record)",
      category: "Insolvency & Probate",
      description: "Statutory notices, corporate winding-up petitions, bankruptcies and probate notices.",
      url: "https://www.thegazette.co.uk",
      sensitivity: "PUBLIC_REGISTER",
    },
    {
      name: "Trust Online (Registry Trust)",
      category: "Credit & Judgments",
      description: "Official statutory registry of County Court Judgments (CCJs), High Court judgments, and orders.",
      url: "https://www.trustonline.org.uk",
      sensitivity: "FEE_PAYABLE",
    },
    {
      name: "Electoral Roll / Directory Search",
      category: "People Tracing",
      description: "Open electoral register and UK address verification databases.",
      url: "https://www.192.com",
      sensitivity: "RESTRICTED",
    },
    {
      name: "FCA Financial Services Register",
      category: "Regulatory",
      description: "Verification of regulated financial firms, individuals, and statutory warnings.",
      url: "https://register.fca.org.uk",
      sensitivity: "PUBLIC_REGISTER",
    },
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <AdminPageHeader
        label="INTERNAL OSINT & INVESTIGATIVE DIRECTORY"
        title="Intelligence Sources & Research Tool Registry"
        description="Authorised OSINT, corporate registries and public database tools for operative research."
      />

      {/* COMPLIANCE & OPERATIONAL SECURITY WARNING */}
      <div className="p-4 bg-amber-50 border border-amber-300 rounded-sm flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-1">
          <p className="font-semibold uppercase tracking-wider font-mono">
            External Research Services & Data Protection Warning
          </p>
          <p className="leading-relaxed">
            External research services process queries outside the firm&apos;s infrastructure. Listing in this directory does not constitute an endorsement or data-sharing agreement. Do not submit client confidential data, subject personal details, or sensitive matter identifiers to third-party services unless the specific service has been approved for that purpose and the processing is lawful and authorised under a documented legitimate interest assessment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white border border-admin-border rounded-sm shadow-admin-card p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-admin-text-faint">{tool.category}</span>
                <h3 className="text-sm font-semibold text-admin-text mt-0.5">{tool.name}</h3>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-admin-surface border border-admin-border text-admin-text-secondary">
                {tool.sensitivity}
              </span>
            </div>

            <p className="text-xs text-admin-text-muted leading-relaxed">
              {tool.description}
            </p>

            <div className="pt-2 border-t border-admin-border flex justify-between items-center text-xs">
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200">
                APPROVED FOR MANUAL SEARCH
              </span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-admin-accent hover:underline flex items-center gap-1"
              >
                Launch External Service <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
