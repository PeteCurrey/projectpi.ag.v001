import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialEvidenceProps {
  evidence: FlagshipServiceConfig["evidence"];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialEvidence({
  evidence,
  variant = "dark",
}: EditorialEvidenceProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="space-y-16">
      {/* Section Header (Rule 14, 20) */}
      <div className="max-w-3xl space-y-4">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          DELIVERABLES · EVIDENCE
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          What You Receive
        </h2>
        <div className={`space-y-2 text-sm sm:text-base font-light leading-relaxed ${mutedTextClass}`}>
          <p>Structured findings. Referenced source material. Clear factual conclusions.</p>
          <p>Evidence and reporting are structured according to the agreed instruction.</p>
        </div>
      </div>

      {/* Deliverables Rows with Clean Horizontal Rules (Rule 14) */}
      <div className={`border-t ${ruleClass}`}>
        {evidence.deliverables.map((item, idx) => (
          <div
            key={idx}
            className={`py-6 sm:py-8 border-b ${ruleClass} flex items-start space-x-6`}
          >
            <span className="text-xs font-light text-[#A58A5C] tracking-widest pt-0.5 flex-shrink-0">
              0{idx + 1}
            </span>
            <p className={`text-sm sm:text-base font-light leading-relaxed ${headingTextClass}`}>
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* Accurate Legal Guidance Note (Rule 20) */}
      <div className={`pt-6 border-t ${ruleClass} text-xs font-light leading-relaxed ${mutedTextClass} max-w-3xl`}>
        Prepared for use in appropriate legal and commercial contexts. Where appropriate, findings can be supplied in a form suitable for review by instructing legal advisers.
      </div>
    </div>
  );
}
