import React from "react";
import Link from "next/link";
import { ArrowRight, Lock, ShieldCheck, KeyRound } from "lucide-react";

export default function ConfidentialConsultationBanner() {
  return (
    <section className="py-28 md:py-36 bg-obsidian-pure border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative border border-brass/50 bg-obsidian-surface p-8 sm:p-14 lg:p-16 rounded-xs shadow-brassPlaque overflow-hidden">
          {/* Subtle Brass Corner Accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brass" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brass" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brass" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brass" />

          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-4 h-4 text-brass" />
              <span className="text-[10px] font-mono uppercase tracking-ultra text-brass">
                DISCREET INTAKE PROTOCOL
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Some matters should not be discussed in public.
            </h2>

            <p className="text-stone text-sm sm:text-base font-light leading-relaxed">
              We provide completely confidential, encrypted consultations for senior counsel,
              chairpersons, family principals, and institutional investors facing sensitive or complex scenarios.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
              >
                <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
                <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center space-x-4 px-4 py-3 bg-obsidian/70 border border-oliveGrey/60 rounded-xs text-[11px] font-mono text-stone-muted">
                <ShieldCheck className="w-4 h-4 text-brass" />
                <span>DIRECT ENCRYPTION · NON-DISCLOSURE GUARANTEED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
