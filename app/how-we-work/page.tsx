import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

export const metadata: Metadata = {
  title: "How We Work & Standards | TFTS Operating Methodology",
  description:
    "Exhaustive operating methodology and legal compliance standards governing private investigations in the UK. RIPA, CPR Part 31, GDPR, and BS 102000.",
  alternates: {
    canonical: getCanonicalUrl("/how-we-work"),
  },
};

const lifecycle = [
  {
    num: "01",
    label: "UNDERSTAND",
    title: "Mandate Scoping, Legal Privilege & Objectives",
    body: "Every instruction begins by establishing the core question, operational constraints, and required legal threshold. We evaluate whether the instruction can be structured under Legal Professional Privilege through instructing solicitors, complete a formal Conflict of Interest check, and conduct a documented Legitimate Interests Assessment (LIA) pursuant to the Data Protection Act 2018.",
    deliverable: "Instruction Mandate & Compliance Assessment",
  },
  {
    num: "02",
    label: "INTELLIGENCE",
    title: "Source Identification & Opportunity Mapping",
    body: "Our analytical desk interrogates global corporate registries, historical records, property databases, and technical web telemetry. We cross-reference disparate data fragments to map beneficial ownership, establish relational links, and isolate critical evidentiary voids that require targeted field, digital, or human investigation.",
    deliverable: "Relational Matrix & Target Intelligence Dossier",
  },
  {
    num: "03",
    label: "INVESTIGATE",
    title: "Lawful, Proportionate Operational Deployment",
    body: "Appropriate investigative vectors—covert surveillance, digital forensic analysis, witness interviews, or site inspections—are deployed strictly in accordance with UK law. Operatives maintain unbroken operational security, avoid entrapment, and preserve evidence using cryptographic hashing and verified timestamps conforming to ISO/IEC 27037.",
    deliverable: "Contemporaneous Logs & Raw Master Evidence Bundles",
  },
  {
    num: "04",
    label: "REPORT",
    title: "Evidentiary Synthesis & Decision Briefing",
    body: "Findings are distilled into objective, court-ready dossiers indexed for immediate filing under Civil Procedure Rules Part 31 and Part 32. We present facts without embellishment, quantify confidence levels, and provide strategic counsel to assist legal advocates and boards in deciding their next move.",
    deliverable: "CPR-Compliant Investigation Report & Witness Statements",
  },
];

const statutes = [
  {
    title: "Data Protection Act 2018 / UK GDPR",
    body: "All data gathering operations are governed by documented Legitimate Interests Assessments (Article 6(1)(f)). We do not engage in pretexting, 'blagging', or unlawful intercept.",
  },
  {
    title: "Civil Procedure Rules (CPR)",
    body: "Reports and witness statements strictly conform to CPR Part 31 (Disclosure) and CPR Part 32 (Evidence), including Statements of Truth and exhibit scheduling.",
  },
  {
    title: "RIPA Principles of Necessity",
    body: "Surveillance deployments are evaluated against proportionality and necessity tests, balancing our client's commercial rights against Article 8 privacy expectations.",
  },
  {
    title: "British Standard BS 102000",
    body: "Adherence to the national standard for the provision of investigative services, covering operational conduct, transparency, and operative vetting.",
  },
  {
    title: "ISO/IEC 27037 Digital Forensics",
    body: "Digital evidence is captured using write-blocking hardware, SHA-256 cryptographic hashing, and documented chains of custody to defeat spoliation allegations.",
  },
  {
    title: "Professional Indemnity Insurance",
    body: "Backed by £5,000,000 in dedicated professional indemnity coverage tailored specifically to international private intelligence and corporate inquiries.",
  },
];

export default function HowWeWorkPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* ── 1. OPENING MASTHEAD ── */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Operating Methodology &amp; Standards
              </span>
              <h1 className="text-display-xl font-[200] tracking-tight leading-[1.04] text-ink">
                How We Work.
              </h1>
              <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
                An unyielding commitment to proportionality, legality, and empirical certainty.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. THE 4-STAGE LIFECYCLE — Scroll sequence ── */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-3xl mb-20 space-y-4">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                The Investigative Lifecycle
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Four Sequential Stages of Every Instruction
              </h2>
            </div>
          </TFTSTextReveal>

          <div className="space-y-0 divide-y divide-rule">
            {lifecycle.map((stage, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="text-[80px] md:text-[120px] font-[200] text-ink/[0.08] leading-none select-none">
                      {stage.num}
                    </span>
                  </div>
                  <div className="lg:col-span-4 space-y-2">
                    <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                      {stage.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-[200] text-ink">
                      {stage.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-6 space-y-4 text-sm font-[300] text-ink-muted leading-relaxed">
                    <p>{stage.body}</p>
                    <div className="border-t border-rule pt-4 text-xs font-[300] text-ink">
                      <span className="text-[10px] tracking-[0.18em] uppercase text-ink-muted mr-3">Deliverable</span>
                      {stage.deliverable}
                    </div>
                  </div>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. STATUTORY FRAMEWORK — Typographic ledger ── */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-3xl mb-16 space-y-4">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Statutory Perimeter &amp; Governance
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Legal Compliance Framework
              </h2>
              <p className="text-sm font-[300] text-ink-muted leading-relaxed">
                We operate exclusively within established statutory boundaries, ensuring our work product is legally unassailable.
              </p>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule">
            {statutes.map((statute, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="md:col-span-4 text-xl font-[200] text-ink">
                    {statute.title}
                  </h3>
                  <p className="md:col-span-7 text-sm font-[300] text-ink-muted leading-relaxed">
                    {statute.body}
                  </p>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA ── */}
      <section className="py-24 md:py-32 bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-3xl space-y-8">
              <h2 className="text-display-sm font-[200] text-ink">
                Have Specific Legal or Evidentiary Requirements?
              </h2>
              <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-xl">
                We regularly collaborate directly with instructing litigation solicitors to structure
                investigative parameters within existing court directions or pre-action protocols.
              </p>
              <div>
                <Link
                  href="/confidential-enquiry"
                  className="inline-block border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
                >
                  Discuss Instruction with Directors
                </Link>
              </div>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

    </div>
  );
}
