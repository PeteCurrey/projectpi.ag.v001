import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipMethodologyProps {
  approach: FlagshipServiceConfig["approach"];
}

export default function FlagshipMethodology({ approach }: FlagshipMethodologyProps) {
  return (
    <section id="approach" className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                STRUCTURED METHODOLOGY · PHASING
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[300] text-warmWhite">
              {approach.title}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-stone-muted font-light leading-relaxed">
              {approach.summary}
            </p>
          </div>
        </div>

        {/* Phased Steps Grid (Dynamic 4 or 5 columns) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            approach.steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
          } gap-0 border border-oliveGrey/60`}
        >
          {approach.steps.map((step, idx) => (
            <div
              key={step.number}
              className={`p-6 sm:p-8 space-y-4 ${
                idx < approach.steps.length - 1
                  ? "border-b md:border-b-0 md:border-r border-oliveGrey/60"
                  : ""
              } bg-obsidian/40 hover:bg-obsidian-surface/50 transition-colors`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-brass/70 tracking-ultra">
                  PHASE {step.number}
                </span>
              </div>

              <h3 className="text-base font-normal tracking-[0.15em] text-warmWhite uppercase font-sans">
                {step.name}
              </h3>

              <p className="text-xs text-stone-muted leading-relaxed font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
