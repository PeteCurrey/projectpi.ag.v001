import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { casesData } from "@/lib/data/casesData";
import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Anonymised Case Studies & Casework Archive | TFTS",
  description: "Anonymised casework briefs detailing investigation questions, methodologies, verified findings, and legal/commercial outcomes across London and global jurisdictions.",
  alternates: {
    canonical: getCanonicalUrl("/cases"),
  },
};

export default function CasesPage() {
  return (
    <div className="bg-paper min-h-screen text-ink selection:bg-ink selection:text-paper">
      {/* Header */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
          <span className="text-[11px] uppercase tracking-[0.22em] font-[300] text-ink-muted block">
            EVIDENTIARY PORTFOLIO · VERIFIED CASEWORK
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-[200] text-ink tracking-tight">
            Casework Archives
          </h1>
          <p className="text-base sm:text-lg text-ink-muted font-[300] leading-relaxed max-w-3xl">
            A structured repository of anonymised instructions demonstrating our empirical tradecraft,
            forensic methodology, and measurable outcomes in high-value corporate, legal, and private matters.
          </p>
        </div>
      </section>

      {/* Case Studies Stack */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          {casesData.map((item) => (
            <div
              key={item.id}
              className="border-b border-rule pb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Meta */}
                <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-rule lg:pr-8">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-xs font-[300] text-ink-muted tracking-widest">
                      <span className="text-ink">{item.number}</span>
                      <span className="text-rule">/</span>
                      <span className="uppercase">{item.discipline}</span>
                    </div>
                    <h2 className="text-2xl font-[200] text-ink tracking-tight pt-2">
                      {item.title}
                    </h2>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
                      INSTRUCTING SECTOR
                    </span>
                    <p className="text-ink font-[300]">{item.clientSector}</p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/services/${item.relatedServiceSlug}`}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-[300] text-ink-muted hover:text-ink transition-colors"
                    >
                      <span>CORRESPONDING PRACTICE</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>

                {/* Right Breakdown */}
                <div className="lg:col-span-8 space-y-8">
                  {/* The Question */}
                  <div className="border-l-2 border-ink pl-6 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
                      THE INITIAL QUESTION
                    </span>
                    <p className="text-ink text-base sm:text-lg font-[200]">
                      &ldquo;{item.question}&rdquo;
                    </p>
                    <p className="text-ink-muted text-xs sm:text-sm font-[300] leading-relaxed pt-1">
                      {item.investigation}
                    </p>
                  </div>

                  {/* Two-column Methodology & Findings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-[300]">
                    <div className="border-t border-rule pt-4 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-ink-muted block">
                        METHODOLOGY DEPLOYED
                      </span>
                      <ul className="space-y-2 text-ink-muted">
                        {item.methodology.map((m, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-ink mr-1">—</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-rule pt-4 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-ink-muted block">
                        VERIFIED FINDINGS
                      </span>
                      <p className="text-ink-muted leading-relaxed">
                        {item.findings}
                      </p>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-paper-stone p-6 space-y-2 border-t border-rule">
                    <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
                      MEASURABLE COMMERCIAL & LEGAL OUTCOME
                    </span>
                    <p className="text-sm text-ink font-[300] leading-relaxed">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Confidential Consultation Prompt */}
      <section className="py-24 md:py-32 bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-display-sm font-[200] text-ink leading-[1.08]">
              Have a Comparable High-Exposure Scenario?
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-xl">
              Our directors evaluate incoming instructions within hours. We ensure your matter
              is handled under strict confidentiality from the very first conversation.
            </p>
            <div>
              <Link
                href="/confidential-enquiry"
                className="inline-block border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
              >
                Discuss the Matter in Confidence →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
