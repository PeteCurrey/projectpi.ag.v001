import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialSplitProps {
  theProblem: FlagshipServiceConfig["theProblem"];
  sectionLabel?: string;
  variant?: "light" | "stone" | "dark";
}

export default function EditorialSplit({
  theProblem,
  sectionLabel = "CONTEXT · OPERATIONAL TRIGGERS",
  variant = "light",
}: EditorialSplitProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* Left Column: Heading & Core Context */}
      <div className="lg:col-span-5 space-y-8">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          {sectionLabel}
        </span>

        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          {theProblem.heading}
        </h2>

        <p className={`text-base sm:text-lg font-light leading-relaxed ${mutedTextClass} border-l-2 border-[#A58A5C] pl-6 py-1`}>
          {theProblem.statement}
        </p>

        <div className="space-y-4 pt-2">
          {theProblem.narrative.map((paragraph, idx) => (
            <p key={idx} className={`text-sm font-light leading-relaxed ${mutedTextClass}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Right Column: Scenarios Ledger (Horizontal Rules, No Cards — Rule 02, 06) */}
      <div className="lg:col-span-7 lg:pl-8 space-y-6">
        <div className={`pb-4 border-b ${ruleClass}`}>
          <span className={`text-xs tracking-[0.2em] uppercase font-light ${mutedTextClass}`}>
            REPRESENTATIVE CIRCUMSTANCES
          </span>
        </div>

        <div className="divide-y divide-[#D6D3CB]">
          {theProblem.scenarios.map((scenario, idx) => (
            <div key={idx} className={`py-5 flex items-start space-x-6 ${isDark ? "divide-[#343832]" : ""}`}>
              <span className="text-xs font-light text-[#A58A5C] tracking-widest pt-0.5 flex-shrink-0">
                0{idx + 1}
              </span>
              <p className={`text-sm sm:text-base font-light leading-relaxed ${headingTextClass}`}>
                {scenario}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
