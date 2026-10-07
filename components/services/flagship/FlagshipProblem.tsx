import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipProblemProps {
  problem: FlagshipServiceConfig["theProblem"];
  accentColor?: FlagshipServiceConfig["accentColor"];
}

export default function FlagshipProblem({ problem, accentColor }: FlagshipProblemProps) {
  const accentBar =
    accentColor === "oxblood"
      ? "bg-oxblood"
      : accentColor === "oliveGrey"
      ? "bg-oliveGrey"
      : "bg-brass";

  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className={`w-6 h-[1px] ${accentBar}`} />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                THE PROBLEM · OPERATIONAL CONTEXT
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif text-warmWhite leading-[1.18]">
              {problem.heading}
            </h2>

            <blockquote className="border-l-2 border-brass/50 pl-6 py-1 text-base sm:text-lg text-stone-light font-light italic leading-relaxed">
              {problem.statement}
            </blockquote>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-stone-muted font-light leading-relaxed">
              {problem.narrative.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Right Column: Typical Scenarios */}
          <div className="lg:col-span-6 bg-obsidian border border-oliveGrey/70 p-8 sm:p-10 rounded-xs space-y-6 shadow-etched">
            <div className="flex items-center justify-between border-b border-oliveGrey/50 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                REPRESENTATIVE INSTRUCTION TRIGGERS
              </span>
              <span className="text-[9px] font-mono text-stone-muted">COMMON SCENARIOS</span>
            </div>

            <p className="text-xs text-stone-muted font-light">
              Instructions frequently arise in contexts where direct internal inquiry or standard database reviews are either impossible or commercially hazardous:
            </p>

            <ul className="space-y-4 pt-2">
              {problem.scenarios.map((scen, idx) => (
                <li key={idx} className="flex items-start space-x-4 text-xs sm:text-sm text-stone-light font-light">
                  <span className="text-[10px] font-mono text-brass/70 mt-1 flex-shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{scen}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-oliveGrey/40 text-[10px] font-mono text-stone-muted">
              ALL INSTRUCTIONS TREATED UNDER STRICT NON-DISCLOSURE PROTOCOLS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
