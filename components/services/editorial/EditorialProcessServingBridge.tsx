import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface EditorialProcessServingBridgeProps {
  bridge: NonNullable<FlagshipServiceConfig["processServingBridge"]>;
  variant?: "light" | "stone" | "dark";
}

export default function EditorialProcessServingBridge({
  bridge,
  variant = "stone",
}: EditorialProcessServingBridgeProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className={`py-12 border-t border-b ${ruleClass}`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-8">
        <div className="space-y-3 max-w-3xl">
          <span className="text-xs tracking-[0.25em] uppercase font-light text-[#A58A5C] block">
            PROCESS SERVING · CPR PART 6 INTEGRATION
          </span>
          <h3 className={`text-2xl sm:text-3xl font-extralight tracking-tight ${headingTextClass}`}>
            {bridge.heading}
          </h3>
          <p className={`text-sm font-light leading-relaxed ${mutedTextClass}`}>
            {bridge.body}
          </p>
        </div>

        <Link
          href={bridge.href}
          className={`inline-flex items-center space-x-3 text-xs tracking-[0.2em] uppercase font-light ${headingTextClass} hover:text-[#A58A5C] border-b border-current hover:border-[#A58A5C] pb-1 transition-colors flex-shrink-0 group`}
        >
          <span>{bridge.linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
