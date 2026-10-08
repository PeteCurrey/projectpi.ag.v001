"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipHeroProps {
  service: FlagshipServiceConfig;
}

export default function FlagshipHero({ service }: FlagshipHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-oliveGrey/70 bg-obsidian-pure">
      {/* Background Cinematic Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ filter: "contrast(1.1) brightness(0.68) saturate(0.85)" }}
        />
        {/* Multi-layer contrast shielding — matches homepage masthead */}
        <div className="absolute inset-0 bg-obsidian-pure/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 py-24 flex flex-col justify-between min-h-[80vh]">
        {/* Breadcrumb & Institutional Eyebrow */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-6 gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-3 text-[10px] font-[300] tracking-[0.22em] uppercase">
            <Link href="/" className="text-warmWhite/50 hover:text-warmWhite transition-colors duration-300">
              HOME
            </Link>
            <span className="text-warmWhite/20">/</span>
            <Link href="/services" className="text-warmWhite/50 hover:text-warmWhite transition-colors duration-300">
              SERVICES
            </Link>
            <span className="text-warmWhite/20">/</span>
            <span className="text-brass-light">DISCIPLINE {service.disciplineNumber}</span>
          </nav>

          <div className="text-[10px] font-[300] tracking-[0.22em] uppercase text-warmWhite/40">
            {service.eyebrow}
          </div>
        </div>

        {/* Central Display & Proposition */}
        <div className="my-auto py-12 max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-brass-light block">
              TFTS · SPECIALIST PRACTICE
            </span>
            {/* Semantic H1 — screen-reader accessible, visually subordinate */}
            <h1 className="text-sm md:text-base font-[300] uppercase tracking-[0.22em] text-warmWhite/50 block">
              {service.semanticH1}
            </h1>
            {/* Display Headline */}
            <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[200] text-warmWhite tracking-tight leading-[1.04]">
              {service.displayHeadline}
            </p>
          </div>

          <p className="text-warmWhite/80 text-base sm:text-lg font-[300] max-w-2xl leading-relaxed">
            {service.subProposition}
          </p>

          {/* Dual Action Cluster */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href={`/confidential-enquiry?service=${encodeURIComponent(service.slug)}`}
              className="inline-flex items-center justify-center space-x-3 border border-warmWhite/80 px-8 py-4 text-[11px] tracking-[0.24em] uppercase font-[300] text-warmWhite hover:bg-warmWhite hover:text-obsidian transition-all duration-300 rounded-none"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <span className="text-base leading-none">→</span>
            </Link>

            <a
              href="#approach"
              className="inline-flex items-center justify-center space-x-3 border border-white/20 px-8 py-4 text-[11px] tracking-[0.24em] uppercase font-[300] text-warmWhite/60 hover:border-white/40 hover:text-warmWhite transition-all duration-300 rounded-none"
            >
              <span>OUR METHODOLOGY</span>
            </a>
          </div>
        </div>

        {/* Institutional Compliance Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-[10px] font-[300] tracking-[0.18em] uppercase text-warmWhite/40">
          <div className="space-y-1">
            <div className="text-brass-light/70 text-[9px] uppercase tracking-[0.22em]">LEGAL BASIS</div>
            <div>Legitimate Interests (UK GDPR)</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass-light/70 text-[9px] uppercase tracking-[0.22em]">COURT STANDARD</div>
            <div>CPR Part 31 / 32 Admissible</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass-light/70 text-[9px] uppercase tracking-[0.22em]">DISCRETION</div>
            <div>Legal Privilege Compatible</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass-light/70 text-[9px] uppercase tracking-[0.22em]">JURISDICTION</div>
            <div>London, UK &amp; International</div>
          </div>
        </div>
      </div>
    </section>
  );
}
