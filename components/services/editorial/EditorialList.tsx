"use client";

import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialListProps {
  capabilities: FlagshipServiceConfig["capabilities"];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialList({
  capabilities,
  variant = "light",
}: EditorialListProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="max-w-3xl space-y-4">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          CAPABILITIES · OPERATIONAL SCOPE
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          {capabilities.title}
        </h2>
        <p className={`text-sm sm:text-base font-light leading-relaxed ${mutedTextClass}`}>
          {capabilities.summary}
        </p>
      </div>

      {/* Editorial List with Horizontal Rules (Rule 12) */}
      <div className={`border-t ${ruleClass}`}>
        {capabilities.items.map((item) => (
          <div
            key={item.number}
            className={`py-8 sm:py-10 border-b ${ruleClass} group transition-all duration-300`}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-xs font-light text-[#A58A5C] tracking-widest block">
                  {item.number}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className={`text-xl sm:text-2xl font-light tracking-tight ${headingTextClass} group-hover:translate-x-1 transition-transform duration-300`}>
                  {item.title}
                </h3>
              </div>

              {/* Detail */}
              <div className="md:col-span-7">
                <p className={`text-sm font-light leading-relaxed ${mutedTextClass}`}>
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
