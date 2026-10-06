"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, ShieldCheck, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-oliveGrey/70">
      {/* Cinematic Architectural Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85"
          alt="London architectural facade at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 opacity-30 contrast-125 filter grayscale"
        />
        {/* Layered Obsidian Gradients for Architectural Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col justify-between min-h-[85vh]">
        {/* Eyebrow & Status Flag */}
        <div className="flex items-center justify-between border-b border-oliveGrey/40 pb-6">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-brass rounded-xs" />
            <span className="text-[10px] md:text-xs uppercase font-mono tracking-ultra text-stone">
              UNITED KINGDOM · INTERNATIONAL OPERATIONS
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono tracking-widest text-stone-muted">
            <Lock className="w-3 h-3 text-brass/70" />
            <span>ESTABLISHED & SELECTIVE</span>
          </div>
        </div>

        {/* Hero Central Editorial Block */}
        <div className="my-auto py-12 max-w-4xl space-y-8">
          <div className="space-y-3">
            <span className="text-xs md:text-sm font-light uppercase tracking-[0.3em] text-brass block">
              PRIVATE INTELLIGENCE & INVESTIGATIONS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-warmWhite tracking-tight leading-[1.05] font-serif">
              Intelligence for decisions. <br />
              <span className="italic font-normal text-stone-light">Investigations for certainty.</span>
            </h1>
          </div>

          <p className="text-stone text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed tracking-wide">
            A discreet, highly capable private intelligence firm serving serious personal, corporate,
            legal, and financial matters where the answer matters and uncertainty has consequences.
          </p>

          {/* Action Cluster */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-3 bg-warmWhite hover:bg-brass text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center space-x-3 bg-obsidian-surface/80 hover:bg-obsidian-elevated text-stone hover:text-warmWhite border border-oliveGrey hover:border-brass/50 px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs"
            >
              <span>EXPLORE OUR CAPABILITIES</span>
            </Link>
          </div>
        </div>

        {/* Hero Bottom Institutional Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-oliveGrey/40 text-[11px] font-mono text-stone-muted">
          <div>
            <span className="text-stone block uppercase tracking-widest text-[10px] mb-1">PRACTICE STANDARDS</span>
            <span>BS 102000 & RIPA COMPLIANT</span>
          </div>
          <div>
            <span className="text-stone block uppercase tracking-widest text-[10px] mb-1">CLIENT PRIVILEGE</span>
            <span>LEGAL COUNSEL INSTRUCTION</span>
          </div>
          <div>
            <span className="text-stone block uppercase tracking-widest text-[10px] mb-1">JURISDICTIONS</span>
            <span>UK-WIDE & GLOBAL REACH</span>
          </div>
          <div>
            <span className="text-stone block uppercase tracking-widest text-[10px] mb-1">COMMERCIAL SCOPE</span>
            <span>COMPLEX MATTERS £1K – £25K+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
