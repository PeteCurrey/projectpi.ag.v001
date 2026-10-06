import React from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export default function ConfidentialConsultationBanner() {
  return (
    <section className="py-24 md:py-32 bg-obsidian-surface/30 border-b border-oliveGrey/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center space-x-2">
            <Lock className="w-3 h-3 text-brass/70" />
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
              CONFIDENTIAL ENQUIRY
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite leading-[1.2]">
            Some matters should not be
            <br />
            <span className="italic text-stone-light">discussed in public.</span>
          </h2>

          <p className="text-base text-stone-muted font-light leading-relaxed max-w-2xl mx-auto">
            If you have a matter that requires discretion, begin a confidential enquiry. You are not
            submitting a form — you are beginning a professional conversation. We will respond directly
            and in confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-3 bg-warmWhite hover:bg-brass text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <p className="text-[10px] font-mono tracking-widest text-stone-muted/70 uppercase">
            All enquiries are treated as confidential.
          </p>
        </div>
      </div>
    </section>
  );
}
