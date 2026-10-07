import React from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

interface FlagshipCTAProps {
  serviceTitle: string;
  serviceSlug: string;
}

export default function FlagshipCTA({ serviceTitle, serviceSlug }: FlagshipCTAProps) {
  return (
    <section className="py-24 md:py-36 bg-obsidian-surface/40 border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto border border-brass/50 bg-obsidian p-10 sm:p-14 lg:p-16 rounded-xs shadow-brassPlaque text-center space-y-8">
          <div className="flex items-center justify-center space-x-2 text-brass">
            <Lock className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono tracking-ultra uppercase">
              CONFIDENTIAL INTAKE · INITIAL SCOPING
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite leading-[1.2]">
            Discuss {serviceTitle.toLowerCase()} in strict confidence.
          </h2>

          <p className="text-stone-muted text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Every instruction begins with an initial consultation to evaluate factual viability, define proportionate terms of reference, and advise on immediate risk containment. We do not charge for initial confidential discussions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/confidential-enquiry?service=${encodeURIComponent(serviceSlug)}`}
              className="inline-flex items-center space-x-3 bg-warmWhite hover:bg-brass text-obsidian px-9 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-obsidian-surface hover:bg-obsidian-elevated text-stone hover:text-warmWhite border border-oliveGrey hover:border-brass/50 px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs"
            >
              <span>DIRECT CONTACT</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-stone-muted/80 uppercase tracking-widest">
            <span>STRICT NON-DISCLOSURE</span>
            <span>·</span>
            <span>ENCRYPTED DISPATCH</span>
            <span>·</span>
            <span>LONDON &amp; UK-WIDE OPERATIONS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
