import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Scale, FileText, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "How We Work & Standards | TFTS Operating Methodology",
  description: "Exhaustive operating methodology and legal compliance standards governing private investigations in the UK. RIPA, CPR Part 31, GDPR, and BS 102000.",
  alternates: {
    canonical: getCanonicalUrl("/how-we-work"),
  },
};


export default function HowWeWorkPage() {
  const lifecycle = [
    {
      num: "01",
      title: "UNDERSTAND",
      headline: "Mandate Scoping, Legal Privilege & Objectives",
      text: "Every instruction begins by establishing the core question, operational constraints, and required legal threshold. We evaluate whether the instruction can be structured under Legal Professional Privilege through instructing solicitors, complete a formal Conflict of Interest check, and conduct a documented Legitimate Interests Assessment (LIA) pursuant to the Data Protection Act 2018.",
      deliverable: "Instruction Mandate & Compliance Assessment",
    },
    {
      num: "02",
      title: "INTELLIGENCE",
      headline: "Source Identification & Opportunity Mapping",
      text: "Our analytical desk interrogates global corporate registries, historical records, property databases, and technical web telemetry. We cross-reference disparate data fragments to map beneficial ownership, establish relational links, and isolate critical evidentiary voids that require targeted field, digital, or human investigation.",
      deliverable: "Relational Matrix & Target Intelligence Dossier",
    },
    {
      num: "03",
      title: "INVESTIGATE",
      headline: "Lawful, Proportionate Operational Deployment",
      text: "Appropriate investigative vectors—covert surveillance, digital forensic analysis, witness interviews, or site inspections—are deployed strictly in accordance with UK law. Operatives maintain unbroken operational security, avoid entrapment, and preserve evidence using cryptographic hashing and verified timestamps conforming to ISO/IEC 27037.",
      deliverable: "Contemporaneous Logs & Raw Master Evidence Bundles",
    },
    {
      num: "04",
      title: "REPORT",
      headline: "Evidentiary Synthesis & Decision Briefing",
      text: "Findings are distilled into objective, court-ready dossiers indexed for immediate filing under Civil Procedure Rules Part 31 and Part 32. We present facts without embellishment, quantify confidence levels, and provide strategic counsel to assist legal advocates and boards in deciding their next move.",
      deliverable: "CPR-Compliant Investigation Report & Witness Statements",
    },
  ];

  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              OPERATING METHODOLOGY & STANDARDS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              How We Work
            </h1>
            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              An unyielding commitment to proportionality, legality, and empirical certainty.
              Our methodology is engineered to produce evidence that endures adversarial cross-examination.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Deep Dive */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              THE INVESTIGATIVE LIFECYCLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite font-serif">
              Four Sequential Stages of Every Instruction
            </h2>
          </div>

          <div className="space-y-8">
            {lifecycle.map((stage) => (
              <div
                key={stage.num}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 md:p-12 rounded-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-etched"
              >
                <div className="lg:col-span-3 space-y-2 lg:border-r lg:border-oliveGrey/60 lg:pr-8">
                  <span className="text-3xl font-mono text-brass font-light block">
                    {stage.num}
                  </span>
                  <h3 className="text-2xl font-light text-warmWhite font-serif">
                    {stage.title}
                  </h3>
                  <div className="pt-2 text-[10px] font-mono text-stone-muted uppercase tracking-wider">
                    PHASE {stage.num} MANDATE
                  </div>
                </div>

                <div className="lg:col-span-9 space-y-4">
                  <h4 className="text-lg font-light text-stone-light font-serif">
                    {stage.headline}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone leading-relaxed font-light">
                    {stage.text}
                  </p>
                  <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-warmWhite bg-obsidian/70 p-3 border border-oliveGrey/60 rounded-xs">
                    <span className="text-brass">DELIVERABLE:</span>
                    <span>{stage.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statutory & Legal Frameworks */}
      <section className="py-20 md:py-28 bg-obsidian-pure border-b border-oliveGrey/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              STATUTORY PERIMETER & GOVERNANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite font-serif">
              Legal Compliance Framework
            </h2>
            <p className="text-sm text-stone font-light">
              We operate exclusively within established statutory boundaries, ensuring our work product is legally unassailable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-xs text-stone">
            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STATUTE 01</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">Data Protection Act 2018 / UK GDPR</h3>
              <p className="leading-relaxed font-light">
                All data gathering operations are governed by documented Legitimate Interests Assessments (Article 6(1)(f)). We do not engage in pretexting, 'blagging', or unlawful intercept.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STATUTE 02</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">Civil Procedure Rules (CPR)</h3>
              <p className="leading-relaxed font-light">
                Reports and witness statements strictly conform to CPR Part 31 (Disclosure) and CPR Part 32 (Evidence), including Statements of Truth and exhibit scheduling.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STATUTE 03</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">RIPA Principles of Necessity</h3>
              <p className="leading-relaxed font-light">
                Surveillance deployments are evaluated against proportionality and necessity tests, balancing our client's commercial rights against Article 8 privacy expectations.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STANDARD 04</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">British Standard BS 102000</h3>
              <p className="leading-relaxed font-light">
                Adherence to the national standard for the provision of investigative services, covering operational conduct, transparency, and operative vetting.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STANDARD 05</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">ISO/IEC 27037 Digital Forensics</h3>
              <p className="leading-relaxed font-light">
                Digital evidence is captured using write-blocking hardware, SHA-256 cryptographic hashing, and documented chains of custody to defeat spoliation allegations.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3">
              <span className="text-[10px] font-mono uppercase text-brass block">STANDARD 06</span>
              <h3 className="text-lg font-light text-warmWhite font-serif">Professional Indemnity Insurance</h3>
              <p className="leading-relaxed font-light">
                Backed by £5,000,000 in dedicated professional indemnity coverage tailored specifically to international private intelligence and corporate inquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-obsidian text-center border-t border-oliveGrey/70">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif uppercase">
            Have Specific Legal or Evidentiary Requirements?
          </h2>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            We regularly collaborate directly with instructing litigation solicitors to structure
            investigative parameters within existing court directions or pre-action protocols.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-3.5 text-xs tracking-widest uppercase font-medium rounded-xs shadow-etched"
            >
              <span>DISCUSS INSTRUCTION WITH DIRECTORS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
