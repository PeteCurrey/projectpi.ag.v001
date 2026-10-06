import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { casesData } from "@/lib/data/casesData";

export default function CaseStudiesSection() {
  return (
    <section className="py-28 md:py-36 bg-obsidian border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-oliveGrey/60 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              EVIDENTIARY CASEWORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Anonymised Case Studies
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone max-w-md font-light leading-relaxed">
            All matters are strictly anonymised in accordance with client confidentiality agreements,
            data protection requirements, and ongoing legal privilege.
          </div>
        </div>

        {/* Case Studies Editorial Stack */}
        <div className="space-y-8">
          {casesData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-obsidian-surface/50 border border-oliveGrey/80 hover:border-brass/60 transition-all duration-300 p-8 lg:p-10 rounded-xs shadow-etched"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Meta & Identification */}
                <div className="lg:col-span-4 space-y-4 lg:border-r lg:border-oliveGrey/60 lg:pr-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-brass font-medium tracking-widest">
                      {item.number}
                    </span>
                    <span className="text-oliveGrey">/</span>
                    <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider">
                      {item.discipline}
                    </span>
                  </div>

                  <h3 className="text-xl font-light text-warmWhite font-serif tracking-wide">
                    {item.title}
                  </h3>

                  <div className="text-xs text-stone-light">
                    <span className="block text-[10px] font-mono uppercase text-stone-muted tracking-widest mb-1">
                      CLIENT SECTOR
                    </span>
                    {item.clientSector}
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/services/${item.relatedServiceSlug}`}
                      className="inline-flex items-center space-x-2 text-xs text-brass hover:text-warmWhite transition-colors font-mono tracking-wider"
                    >
                      <span>RELATED SERVICE</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Right Details Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone">
                  {/* The Question */}
                  <div className="space-y-2 bg-obsidian/60 p-4 border border-oliveGrey/60 rounded-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                      THE QUESTION
                    </span>
                    <p className="text-warmWhite font-normal italic">
                      "{item.question}"
                    </p>
                    <p className="text-stone-muted leading-relaxed text-[11px] pt-1">
                      {item.investigation}
                    </p>
                  </div>

                  {/* Methodology */}
                  <div className="space-y-2 bg-obsidian/60 p-4 border border-oliveGrey/60 rounded-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                      INVESTIGATIVE METHODOLOGY
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-stone">
                      {item.methodology.map((m, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-brass/70">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Findings */}
                  <div className="space-y-2 bg-obsidian/60 p-4 border border-oliveGrey/60 rounded-xs">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone block">
                      VERIFIED FINDINGS
                    </span>
                    <p className="text-stone-light leading-relaxed">
                      {item.findings}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="space-y-2 bg-obsidian/60 p-4 border border-oliveGrey/60 rounded-xs border-l-2 border-l-brass">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                      COMMERCIAL & LEGAL OUTCOME
                    </span>
                    <p className="text-warmWhite leading-relaxed font-light">
                      {item.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Cases Button */}
        <div className="mt-12 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center space-x-3 text-xs tracking-widest uppercase font-light text-stone hover:text-warmWhite transition-colors py-2 px-5 border border-oliveGrey hover:border-brass rounded-xs"
          >
            <span>Browse Full Casework Archive</span>
            <ArrowRight className="w-3.5 h-3.5 text-brass" />
          </Link>
        </div>
      </div>
    </section>
  );
}
