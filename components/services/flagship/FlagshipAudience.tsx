import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipAudienceProps {
  audience: FlagshipServiceConfig["audience"];
}

export default function FlagshipAudience({ audience }: FlagshipAudienceProps) {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-[1px] bg-brass" />
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
              INSTRUCTING BODIES · PROFESSIONAL CONTEXT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite">
            {audience.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-muted font-light leading-relaxed">
            {audience.summary}
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audience.profiles.map((profile, idx) => (
            <div
              key={idx}
              className="p-8 border border-oliveGrey/60 bg-obsidian/60 hover:bg-obsidian-surface/60 hover:border-brass/40 transition-all duration-300 rounded-xs flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono text-brass/70 tracking-ultra">
                    CLIENT PROFILE 0{idx + 1}
                  </span>
                  {profile.slug && (
                    <ArrowUpRight className="w-4 h-4 text-oliveGrey group-hover:text-brass transition-colors" />
                  )}
                </div>

                <h3 className="text-xl font-light text-warmWhite font-serif">
                  {profile.role}
                </h3>

                <p className="text-xs sm:text-sm text-stone-muted leading-relaxed font-light">
                  {profile.context}
                </p>
              </div>

              {profile.slug ? (
                <div className="pt-4 border-t border-oliveGrey/40">
                  <Link
                    href={`/professional-clients/${profile.slug}`}
                    className="text-xs font-mono tracking-wider text-brass hover:text-warmWhite flex items-center space-x-2 transition-colors uppercase"
                  >
                    <span>View Institutional Brief</span>
                    <span>→</span>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-oliveGrey/40 text-[10px] font-mono text-stone-muted uppercase tracking-wider">
                  DIRECT MANDATE
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
