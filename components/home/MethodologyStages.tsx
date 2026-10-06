import React from "react";
import Link from "next/link";
import { ArrowRight, Compass, Shield, Search, FileCheck } from "lucide-react";

export default function MethodologyStages() {
  const stages = [
    {
      number: "01",
      title: "UNDERSTAND",
      icon: Compass,
      subtitle: "Mandate, Objectives & Legal Parameters",
      summary: "We establish the question, objectives, constraints and desired outcome.",
      details: [
        "Rigorous preliminary consultation with principals or instructing legal counsel",
        "Definition of Critical Information Requirements (CIRs) and success thresholds",
        "Structuring instructions under legal professional privilege where appropriate",
        "Formulating operational risk assessments and Data Protection Act (GDPR) compliance",
      ],
    },
    {
      number: "02",
      title: "INTELLIGENCE",
      icon: Search,
      subtitle: "Source Identification & Opportunity Mapping",
      summary: "We identify available information, sources, relationships and investigative opportunities.",
      details: [
        "Cross-referencing corporate registries, international asset databases, and public records",
        "Deep OSINT extraction across technical web infrastructure and communication trails",
        "Mapping beneficial ownership webs, undisclosed relationships, and nominee networks",
        "Pinpointing evidentiary gaps requiring field, digital, or human investigation",
      ],
    },
    {
      number: "03",
      title: "INVESTIGATE",
      icon: Shield,
      subtitle: "Lawful & Proportionate Deployment",
      summary: "Appropriate field, digital or analytical methods are deployed proportionately and lawfully.",
      details: [
        "Deploying specialized mobile/static surveillance teams adhering to strict RIPA principles",
        "Conducting digital forensic reconstructions and cryptographic evidentiary captures",
        "Discreet witness tracing and voluntary cognitive statement interviews",
        "Continuous operational security (OPSEC) ensuring target containment",
      ],
    },
    {
      number: "04",
      title: "REPORT",
      icon: FileCheck,
      subtitle: "Objective Evidence & Decision Support",
      summary: "Clear findings, evidence and intelligence are presented without unnecessary interpretation.",
      details: [
        "Compiling court-ready dossiers indexed for Civil Procedure Rules (CPR) compliance",
        "Time-stamped photographic and video logs with verified cryptographic chain of custody",
        "Executive briefings for boards of directors, general counsel, and forensic accountants",
        "Strategic recommendations for asset freezing, litigation, or regulatory referral",
      ],
    },
  ];

  return (
    <section className="py-28 md:py-36 bg-obsidian border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-oliveGrey/60 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              OPERATIONAL METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight font-serif">
              How We Work
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone max-w-md font-light leading-relaxed">
            Four sequential stages governing every instruction. Methodical, unassailable,
            and engineered to produce empirical certainty under legal scrutiny.
          </p>
        </div>

        {/* Sequential 4-Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.number}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/70 transition-all duration-300 p-8 flex flex-col justify-between group rounded-xs shadow-etched"
              >
                <div className="space-y-6">
                  {/* Stage Number & Icon */}
                  <div className="flex items-center justify-between border-b border-oliveGrey/60 pb-4">
                    <span className="text-2xl font-mono text-brass font-light">
                      {stage.number}
                    </span>
                    <Icon className="w-5 h-5 text-stone-muted group-hover:text-brass transition-colors" />
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-light tracking-wide text-warmWhite font-serif group-hover:text-warmWhite transition-colors">
                      {stage.title}
                    </h3>
                    <div className="text-[11px] font-mono text-stone-muted uppercase tracking-wider">
                      {stage.subtitle}
                    </div>
                  </div>

                  {/* Core Summary */}
                  <p className="text-xs text-warmWhite/90 leading-relaxed font-normal bg-obsidian/60 p-3 border-l border-brass rounded-xs">
                    {stage.summary}
                  </p>

                  {/* Granular Execution Steps */}
                  <ul className="space-y-2 pt-2 text-[11px] text-stone leading-normal">
                    {stage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-brass/70 mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-oliveGrey/40 text-[9px] font-mono text-stone-muted uppercase tracking-widest">
                  PHASE {stage.number} EXECUTION
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Link to Full Methodology Page */}
        <div className="mt-12 text-center">
          <Link
            href="/how-we-work"
            className="inline-flex items-center space-x-3 text-xs tracking-widest uppercase font-light text-stone hover:text-warmWhite transition-colors py-2 px-4 border border-oliveGrey hover:border-brass rounded-xs"
          >
            <span>Read Complete Operating Protocols & Evidentiary Standards</span>
            <ArrowRight className="w-3.5 h-3.5 text-brass" />
          </Link>
        </div>
      </div>
    </section>
  );
}
