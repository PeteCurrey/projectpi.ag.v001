"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipHeroProps {
  service: FlagshipServiceConfig;
}

export default function FlagshipHero({ service }: FlagshipHeroProps) {
  const accentBorder =
    service.accentColor === "oxblood"
      ? "border-oxblood/50"
      : service.accentColor === "oliveGrey"
      ? "border-oliveGrey"
      : "border-brass/40";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-oliveGrey/70 bg-obsidian">
      {/* Background Architectural/Cinematic Media */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 opacity-25 contrast-125 filter grayscale"
        />
        {/* Layered Architectural Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col justify-between min-h-[80vh]">
        {/* Breadcrumb & Institutional Eyebrow */}
        <div className="flex flex-wrap items-center justify-between border-b border-oliveGrey/40 pb-6 gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-3 text-[11px] font-mono tracking-widest uppercase">
            <Link href="/" className="text-stone-muted hover:text-warmWhite transition-colors">
              HOME
            </Link>
            <span className="text-oliveGrey">/</span>
            <Link href="/services" className="text-stone-muted hover:text-warmWhite transition-colors">
              SERVICES
            </Link>
            <span className="text-oliveGrey">/</span>
            <span className="text-brass">DISCIPLINE {service.disciplineNumber}</span>
          </nav>

          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-stone-muted">
            <Lock className="w-3 h-3 text-brass/70" />
            <span className="uppercase">{service.eyebrow}</span>
          </div>
        </div>

        {/* Central Display & Proposition */}
        <div className="my-auto py-12 max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-brass block">
              TFTS · SPECIALIST PRACTICE
            </span>
            {/* Semantic H1 */}
            <h1 className="text-sm md:text-base font-mono uppercase tracking-[0.25em] text-stone-muted block">
              {service.semanticH1}
            </h1>
            {/* Display Headline */}
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-warmWhite tracking-tight leading-[1.08] font-serif uppercase">
              {service.displayHeadline}
            </p>
          </div>

          <p className="text-stone text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed tracking-wide">
            {service.subProposition}
          </p>

          {/* Dual Action Cluster */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={`/confidential-enquiry?service=${encodeURIComponent(service.slug)}`}
              className="inline-flex items-center justify-center space-x-3 bg-warmWhite hover:bg-brass text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#approach"
              className="inline-flex items-center justify-center space-x-3 bg-obsidian-surface/80 hover:bg-obsidian-elevated text-stone hover:text-warmWhite border border-oliveGrey hover:border-brass/50 px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs"
            >
              <span>OUR METHODOLOGY</span>
            </a>
          </div>
        </div>

        {/* Institutional Compliance Badges */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t ${accentBorder} text-[11px] font-mono text-stone-muted`}>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">LEGAL BASIS</div>
            <div>Legitimate Interests (UK GDPR)</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">COURT STANDARD</div>
            <div>CPR Part 31 / 32 Admissible</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">DISCRETION</div>
            <div>Legal Privilege Compatible</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">JURISDICTION</div>
            <div>London, UK &amp; International</div>
          </div>
        </div>
      </div>
    </section>
  );
}
