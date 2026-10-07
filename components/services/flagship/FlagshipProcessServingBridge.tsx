import React from "react";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipProcessServingBridgeProps {
  bridge: NonNullable<FlagshipServiceConfig["processServingBridge"]>;
}

export default function FlagshipProcessServingBridge({
  bridge,
}: FlagshipProcessServingBridgeProps) {
  return (
    <section className="py-16 md:py-20 border-b border-oliveGrey/60 bg-obsidian-surface/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="border border-brass/30 bg-obsidian p-8 sm:p-10 lg:p-12 rounded-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-etched">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center space-x-2 text-brass">
              <Scale className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-ultra uppercase">
                OPERATIONAL BRIDGE · CPR PART 6 EXECUTION
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
              {bridge.heading}
            </h3>

            <p className="text-xs sm:text-sm text-stone-muted leading-relaxed font-light">
              {bridge.body}
            </p>
          </div>

          <Link
            href={bridge.href}
            className="inline-flex items-center space-x-3 bg-obsidian-surface hover:bg-brass text-warmWhite hover:text-obsidian px-6 py-3.5 text-xs tracking-widest uppercase font-mono border border-brass/50 hover:border-brass transition-all duration-300 rounded-xs flex-shrink-0 group"
          >
            <span>{bridge.linkText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
