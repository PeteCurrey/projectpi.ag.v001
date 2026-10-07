import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialAudienceProps {
  audience: FlagshipServiceConfig["audience"];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialAudience({
  audience,
  variant = "light",
}: EditorialAudienceProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
          INSTRUCTING BODIES · PRACTICE NETWORK
        </span>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-[1.15] ${headingTextClass}`}>
          {audience.title}
        </h2>
        <p className={`text-sm sm:text-base font-light leading-relaxed ${mutedTextClass}`}>
          {audience.summary}
        </p>
      </div>

      {/* Large Typographic Links with Horizontal Rules (Rule 15) */}
      <div className={`border-t ${ruleClass}`}>
        {audience.profiles.map((profile, idx) => {
          const content = (
            <div className={`py-8 sm:py-10 border-b ${ruleClass} group transition-colors flex flex-col md:flex-row md:items-baseline justify-between gap-4`}>
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-light text-[#A58A5C] tracking-widest">
                    0{idx + 1}
                  </span>
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-extralight uppercase tracking-tight ${headingTextClass} group-hover:text-[#A58A5C] transition-colors`}>
                    {profile.role}
                  </h3>
                </div>
                <p className={`text-xs sm:text-sm font-light leading-relaxed ${mutedTextClass} pl-8`}>
                  {profile.context}
                </p>
              </div>

              {profile.slug ? (
                <div className="flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-light text-[#A58A5C] group-hover:text-[#111111] transition-colors pl-8 md:pl-0 flex-shrink-0">
                  <span>PRACTICE BRIEF</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              ) : (
                <span className={`text-xs tracking-[0.2em] uppercase font-light ${mutedTextClass} pl-8 md:pl-0 flex-shrink-0`}>
                  DIRECT MANDATE
                </span>
              )}
            </div>
          );

          if (profile.slug) {
            return (
              <Link key={idx} href={`/professional-clients/${profile.slug}`} className="block">
                {content}
              </Link>
            );
          }

          return <div key={idx}>{content}</div>;
        })}
      </div>
    </div>
  );
}
