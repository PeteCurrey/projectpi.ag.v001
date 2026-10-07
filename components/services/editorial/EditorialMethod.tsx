import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialMethodProps {
  approach: FlagshipServiceConfig["approach"];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialMethod({
  approach,
  variant = "stone",
}: EditorialMethodProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  const columnsClass =
    approach.steps.length === 5
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          METHODOLOGY · PHASED PROGRESSION
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          {approach.title}
        </h2>
        <p className={`text-sm sm:text-base font-light leading-relaxed ${mutedTextClass}`}>
          {approach.summary}
        </p>
      </div>

      {/* Strong Horizontal Editorial Structure (Rule 13) */}
      <div className={`border-t ${ruleClass} pt-12`}>
        <div className={`grid ${columnsClass} gap-12 lg:gap-8`}>
          {approach.steps.map((step) => (
            <div key={step.number} className="space-y-5">
              <span className="text-xs font-light text-[#A58A5C] tracking-widest block">
                {step.number}
              </span>

              <h3 className={`text-base font-light tracking-[0.15em] uppercase ${headingTextClass}`}>
                {step.name}
              </h3>

              <div className={`w-8 h-[1px] bg-[#A58A5C]/40`} />

              <p className={`text-xs sm:text-sm font-light leading-relaxed ${mutedTextClass}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
