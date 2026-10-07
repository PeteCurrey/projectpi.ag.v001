import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipCapabilitiesProps {
  capabilities: FlagshipServiceConfig["capabilities"];
}

export default function FlagshipCapabilities({ capabilities }: FlagshipCapabilitiesProps) {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[1px] bg-brass" />
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
              DETAILED CAPABILITIES · OPERATIONAL SCOPE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite">
            {capabilities.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-muted font-light leading-relaxed">
            {capabilities.summary}
          </p>
        </div>

        {/* Editorial Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.items.map((item) => (
            <div
              key={item.number}
              className="p-8 sm:p-10 border border-oliveGrey/60 bg-obsidian-surface/40 hover:bg-obsidian-surface/70 hover:border-brass/50 transition-all duration-300 rounded-xs space-y-4 group"
            >
              <div className="flex items-baseline justify-between border-b border-oliveGrey/40 pb-3">
                <span className="text-xs font-mono text-brass tracking-widest">{item.number}</span>
                <span className="text-[9px] font-mono text-stone-muted uppercase tracking-wider">
                  VERIFIED PROTOCOL
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-light text-warmWhite font-serif group-hover:text-brass transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-muted leading-relaxed font-light">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
