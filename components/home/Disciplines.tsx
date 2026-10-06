import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, Binary, Scale, Eye } from "lucide-react";

export default function Disciplines() {
  const departments = [
    {
      number: "01",
      code: "ROOM I",
      title: "CORPORATE",
      headline: "Investigating risk inside and around the organisation.",
      icon: Building2,
      slug: "corporate-investigations",
      cta: "CORPORATE INVESTIGATIONS",
      capabilities: [
        { name: "Corporate fraud investigations", href: "/services/corporate-fraud-investigations" },
        { name: "Employee misconduct investigations", href: "/services/employee-investigations" },
        { name: "Internal theft & supply shrinkage", href: "/services/undercover-investigations" },
        { name: "Supplier & counterparty investigations", href: "/services/due-diligence" },
        { name: "Corporate due diligence", href: "/services/due-diligence" },
        { name: "Executive background investigations", href: "/services/background-investigations" },
        { name: "Intellectual property theft", href: "/services/evidence-gathering" },
        { name: "Competitor intelligence", href: "/services/intelligence" },
        { name: "Workplace & whistleblowing reviews", href: "/services/employee-investigations" },
      ],
      description:
        "Providing chairpersons, boards of directors, and audit committees with forensic clarity during whistleblowing disclosures, executive malpractice, and complex supply chain corruption.",
    },
    {
      number: "02",
      code: "ROOM II",
      title: "INTELLIGENCE",
      headline: "Finding what conventional searches don't reveal.",
      icon: Binary,
      slug: "intelligence",
      cta: "INTELLIGENCE SERVICES",
      capabilities: [
        { name: "OSINT investigations", href: "/services/osint-investigations" },
        { name: "Digital intelligence & cyber forensics", href: "/services/digital-investigations" },
        { name: "Asset tracing & international recovery", href: "/services/asset-tracing" },
        { name: "People tracing & debtor location", href: "/services/people-tracing" },
        { name: "Corporate & counterparty intelligence", href: "/services/intelligence" },
        { name: "Executive intelligence & integrity checks", href: "/services/background-investigations" },
        { name: "Online investigations & technical attribution", href: "/services/osint-investigations" },
        { name: "Identity verification & KYC deconstruction", href: "/services/due-diligence" },
        { name: "Reputation & disinformation intelligence", href: "/services/intelligence" },
      ],
      description:
        "Harvesting disparate digital fragments, international registries, and human insights to produce actionable intelligence for strategic negotiations and high-stakes decisions.",
    },
    {
      number: "03",
      code: "ROOM III",
      title: "LEGAL",
      headline: "Evidence, intelligence and investigative support for legal matters.",
      icon: Scale,
      slug: "legal",
      cta: "LEGAL INVESTIGATIONS",
      audience: "LAW FIRMS · BARRISTERS · INSURERS · LEGAL TEAMS",
      capabilities: [
        { name: "Litigation support for commercial disputes", href: "/services/litigation-support" },
        { name: "Civil evidence gathering (CPR compliant)", href: "/services/evidence-gathering" },
        { name: "Witness enquiries & statement taking", href: "/services/witness-enquiries" },
        { name: "People tracing for process service", href: "/services/people-tracing" },
        { name: "Asset investigations for freezing orders", href: "/services/asset-tracing" },
        { name: "Pre-action financial viability checks", href: "/services/legal" },
        { name: "Fraud investigations for civil claims", href: "/services/fraud-investigations" },
        { name: "Corporate intelligence for arbitration", href: "/services/intelligence" },
      ],
      description:
        "Partnering directly with leading litigation partners and dispute counsel to assemble admissible evidence bundles, secure reluctant witness statements, and trace concealed assets.",
    },
    {
      number: "04",
      code: "ROOM IV",
      title: "FIELD",
      headline: "When information needs to be established in the real world.",
      icon: Eye,
      slug: "field",
      cta: "FIELD INVESTIGATIONS",
      capabilities: [
        { name: "Covert surveillance operations", href: "/services/covert-surveillance" },
        { name: "Mobile vehicle & foot surveillance", href: "/services/private-surveillance" },
        { name: "Static observation points", href: "/services/field" },
        { name: "Undercover workplace inquiries", href: "/services/undercover-investigations" },
        { name: "Physical site & premises inspections", href: "/services/field" },
        { name: "Activity & capability verification", href: "/services/insurance-investigations" },
        { name: "Insurance fraud investigations", href: "/services/insurance-investigations" },
        { name: "Employee restrictive covenant checks", href: "/services/employee-investigations" },
      ],
      description:
        "Deploying highly disciplined former military and intelligence operatives to document real-world movements, illicit meetings, and physical routines with court-admissible visual proof.",
    },
  ];

  return (
    <section className="py-28 md:py-36 bg-obsidian-pure border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-oliveGrey/60 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              OPERATIONAL TAXONOMY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight font-serif">
              Four Core Disciplines
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone max-w-md font-light leading-relaxed">
            The firm is structured into four distinct investigative departments, each operating
            as a specialized chamber with dedicated methodology, tradecraft, and legal protocols.
          </p>
        </div>

        {/* The 4 Architectural Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.number}
                className="relative bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/60 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between group rounded-xs shadow-etched"
              >
                {/* Department Header */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-oliveGrey/60 pb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono text-brass tracking-widest font-medium">
                        {dept.code}
                      </span>
                      <span className="text-oliveGrey">/</span>
                      <span className="text-xs font-mono text-stone-muted">
                        DEP {dept.number}
                      </span>
                    </div>
                    <Icon className="w-5 h-5 text-stone-muted group-hover:text-brass transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-warmWhite font-serif group-hover:text-warmWhite transition-colors">
                      {dept.title}
                    </h3>
                    <p className="text-sm text-stone-light font-light leading-snug">
                      {dept.headline}
                    </p>
                  </div>

                  {dept.audience && (
                    <div className="py-2 px-3 bg-obsidian/70 border-l-2 border-brass text-[10px] font-mono text-stone tracking-wider uppercase">
                      AUDIENCE: {dept.audience}
                    </div>
                  )}

                  <p className="text-xs text-stone-muted leading-relaxed font-light">
                    {dept.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone block mb-3">
                      KEY INVESTIGATIVE CAPABILITIES
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs text-stone">
                      {dept.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-brass/60 rounded-xs" />
                          <Link
                            href={cap.href}
                            className="hover:text-warmWhite transition-colors truncate"
                          >
                            {cap.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-8 mt-8 border-t border-oliveGrey/60 flex items-center justify-between">
                  <Link
                    href={`/services/${dept.slug}`}
                    className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase font-medium text-warmWhite group-hover:text-brass transition-colors"
                  >
                    <span>{dept.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider">
                    SPECIFICATION 0{dept.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
