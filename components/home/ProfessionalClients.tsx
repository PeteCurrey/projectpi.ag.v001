import React from "react";
import Link from "next/link";
import { Scale, ShieldCheck, Building2, Coins, ArrowRight } from "lucide-react";

export default function ProfessionalClients() {
  const sectors = [
    {
      code: "SECTOR 01",
      title: "LAW FIRMS",
      icon: Scale,
      headline: "Investigative support for disputes, litigation and sensitive matters.",
      description:
        "Providing litigation partners, barristers, and general counsel with CPR-compliant witness statements, asset tracing for freezing injunctions (Part 25), debtor location, and factual trial evidence.",
      focus: ["Commercial Litigation", "Civil Fraud & Asset Recovery", "Insolvency Litigation", "Contentious Probate"],
      servicesLink: "/services/legal",
    },
    {
      code: "SECTOR 02",
      title: "INSURERS",
      icon: ShieldCheck,
      headline: "Evidence-led investigation of suspicious claims and activity.",
      description:
        "Partnering with Lloyd's syndicates, composite insurers, and self-insured PLCs to expose exaggerated disability claims, staged losses, and organized fraud under Section 57 'Fundamental Dishonesty' standards.",
      focus: ["High-Exposure Personal Injury", "Commercial Property Loss", "Cargo & Marine Claims", "Syndicate Special Risks"],
      servicesLink: "/services/insurance-investigations",
    },
    {
      code: "SECTOR 03",
      title: "CORPORATE",
      icon: Building2,
      headline: "Fraud, misconduct, due diligence and commercial risk.",
      description:
        "Advising C-suite executives, audit committees, and boards on internal procurement theft, intellectual property leakage, executive non-compete violations, and whistleblower investigations.",
      focus: ["Executive Misconduct", "Procurement & Vendor Fraud", "IP Exfiltration", "Trade Secret Protection"],
      servicesLink: "/services/corporate-investigations",
    },
    {
      code: "SECTOR 04",
      title: "PRIVATE CAPITAL",
      icon: Coins,
      headline: "Intelligence supporting investment, acquisitions and high-value decisions.",
      description:
        "Supporting private equity funds, venture capital sponsors, family offices, and institutional lenders with deep-source investigative due diligence, founder background vetting, and sovereign risk analysis.",
      focus: ["Pre-Acquisition M&A", "Founder Integrity Vetting", "Cross-Border Joint Ventures", "Offshore Wealth Tracing"],
      servicesLink: "/services/due-diligence",
    },
  ];

  return (
    <section className="py-28 md:py-36 bg-obsidian-pure border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-oliveGrey/60 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              INSTITUTIONAL CLIENT BASE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Built for Professional Instruction
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone max-w-md font-light leading-relaxed">
            We are structured to serve commercial, institutional, and legal professionals.
            Our caseload is defined by high-stakes corporate disputes, complex litigation, and strategic capital decisions.
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.title}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/70 transition-all duration-300 p-8 flex flex-col justify-between group rounded-xs shadow-etched"
              >
                <div className="space-y-6">
                  {/* Top Eyebrow */}
                  <div className="flex items-center justify-between border-b border-oliveGrey/60 pb-3">
                    <span className="text-[10px] font-mono text-brass tracking-widest">
                      {sector.code}
                    </span>
                    <Icon className="w-5 h-5 text-stone-muted group-hover:text-brass transition-colors" />
                  </div>

                  {/* Title & Headline */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-wide text-warmWhite font-serif group-hover:text-warmWhite transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-xs text-stone-light font-light leading-snug">
                      {sector.headline}
                    </p>
                  </div>

                  <p className="text-xs text-stone-muted leading-relaxed font-light">
                    {sector.description}
                  </p>

                  {/* Key Practice Areas */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone block mb-2">
                      INSTRUCTION MANDATES
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone">
                      {sector.focus.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span className="w-1 h-1 bg-brass/60 rounded-xs" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-oliveGrey/60">
                  <Link
                    href={sector.servicesLink}
                    className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase font-medium text-warmWhite group-hover:text-brass transition-colors"
                  >
                    <span>View Capabilities</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Positioning Declaration */}
        <div className="mt-12 p-6 bg-obsidian-surface border border-oliveGrey/80 text-center rounded-xs">
          <p className="text-xs text-stone-muted font-light leading-relaxed max-w-3xl mx-auto">
            <strong className="text-warmWhite uppercase tracking-wider font-normal">
              Commercial Positioning & Mandate Thresholds:
            </strong>{" "}
            We focus exclusively on substantial matters requiring deep analytical methodology,
            proportionate field deployment, and court-admissible standards. Typical instruction fees range from
            approximately £1,000 to £25,000+ depending on operational complexity, jurisdictions, and technical scope.
          </p>
        </div>
      </div>
    </section>
  );
}
