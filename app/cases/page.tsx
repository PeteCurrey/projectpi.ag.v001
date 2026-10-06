import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
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
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              EVIDENTIARY PORTFOLIO · VERIFIED CASEWORK
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Casework Archives
            </h1>
            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              A structured repository of anonymised instructions demonstrating our empirical tradecraft,
              forensic methodology, and measurable outcomes in high-value corporate, legal, and private matters.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Stack */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          {casesData.map((item) => (
            <div
              key={item.id}
              className="bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/70 transition-all p-8 md:p-12 rounded-xs shadow-etched"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Meta */}
                <div className="lg:col-span-4 space-y-6 lg:border-r lg:border-oliveGrey/60 lg:pr-8">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3 text-xs font-mono text-brass font-medium tracking-widest">
                      <span>{item.number}</span>
                      <span className="text-oliveGrey">/</span>
                      <span className="text-stone-muted uppercase">{item.discipline}</span>
                    </div>
                    <h2 className="text-2xl font-light text-warmWhite font-serif tracking-wide pt-2">
                      {item.title}
                    </h2>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-muted block">
                      INSTRUCTING SECTOR
                    </span>
                    <p className="text-stone-light font-light">{item.clientSector}</p>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/services/${item.relatedServiceSlug}`}
                      className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-brass hover:text-warmWhite transition-colors"
                    >
                      <span>CORRESPONDING PRACTICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Right Breakdown */}
                <div className="lg:col-span-8 space-y-6">
                  {/* The Question */}
                  <div className="bg-obsidian/70 border border-oliveGrey/60 p-6 rounded-xs space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                      THE INITIAL QUESTION
                    </span>
                    <p className="text-warmWhite text-base font-light italic">
                      "{item.question}"
                    </p>
                    <p className="text-stone text-xs leading-relaxed pt-1">
                      {item.investigation}
                    </p>
                  </div>

                  {/* Two-column Methodology & Findings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                    <div className="bg-obsidian/70 border border-oliveGrey/60 p-6 rounded-xs space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-muted block">
                        METHODOLOGY DEPLOYED
                      </span>
                      <ul className="space-y-2 text-stone">
                        {item.methodology.map((m, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-brass/70 mt-0.5">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-obsidian/70 border border-oliveGrey/60 p-6 rounded-xs space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-muted block">
                        VERIFIED FINDINGS
                      </span>
                      <p className="text-stone leading-relaxed font-light">
                        {item.findings}
                      </p>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="bg-obsidian/90 border border-brass/40 p-6 rounded-xs border-l-2 border-l-brass space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                      MEASURABLE COMMERCIAL & LEGAL OUTCOME
                    </span>
                    <p className="text-sm text-warmWhite font-light leading-relaxed">
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
      <section className="py-20 border-t border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif uppercase">
            Have a Comparable High-Exposure Scenario?
          </h2>
          <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto font-light leading-relaxed">
            Our directors evaluate incoming instructions within hours. We ensure your matter
            is handled under strict confidentiality from the very first conversation.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-3.5 text-xs tracking-widest uppercase font-medium rounded-xs shadow-etched"
            >
              <span>DISCUSS THE MATTER IN CONFIDENCE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
