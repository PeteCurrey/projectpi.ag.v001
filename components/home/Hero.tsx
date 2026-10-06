"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-oliveGrey/70">
      {/* Cinematic Architectural Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2400&q=85"
          alt="London architectural facade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 transition-transform duration-1000 opacity-25 contrast-125 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/90 to-obsidian/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />
        <div className="absolute inset-0 grain-overlay opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col justify-between min-h-[85vh]">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-oliveGrey/40 pb-6">
          <div className="flex items-center space-x-3">
            <span className="w-1.5 h-1.5 bg-brass rounded-xs" />
            <span className="text-[10px] md:text-xs uppercase font-mono tracking-ultra text-stone">
              UNITED KINGDOM · INTERNATIONAL OPERATIONS
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono tracking-widest text-stone-muted">
            <Lock className="w-3 h-3 text-brass/70" />
            <span>ESTABLISHED &amp; SELECTIVE</span>
          </div>
        </div>

        {/* Central Editorial Block */}
        <div className="my-auto py-16 max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="text-xs md:text-sm font-mono uppercase tracking-[0.4em] text-brass block">
              TFTS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-warmWhite tracking-tight leading-[1.05] font-serif">
              Private intelligence,
              <br />
              <span className="italic font-normal text-stone-light">
                for matters that require certainty.
              </span>
            </h1>
            <p className="text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase text-stone-muted pt-2">
              TACTICAL FIELD INTELLIGENCE SERVICE
            </p>
          </div>

          <p className="text-stone text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed tracking-wide">
            Investigations, intelligence and specialist field services for legal teams,
            corporate clients, insolvency practitioners and private offices.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center justify-center space-x-3 bg-warmWhite hover:bg-brass text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-medium transition-all duration-300 rounded-xs shadow-etched group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center space-x-3 bg-obsidian-surface/80 hover:bg-obsidian-elevated text-stone hover:text-warmWhite border border-oliveGrey hover:border-brass/50 px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs"
            >
              <span>EXPLORE CAPABILITIES</span>
            </Link>
          </div>
        </div>

        {/* Institutional Metadata Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-oliveGrey/40 text-[11px] font-mono text-stone-muted">
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">OPERATIONS</div>
            <div>England &amp; Wales</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">DISCIPLINES</div>
            <div>6 Practice Areas</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">CLIENTS</div>
            <div>Solicitors &amp; Corporates</div>
          </div>
          <div className="space-y-1">
            <div className="text-brass/80 text-[9px] uppercase tracking-widest">DISCRETION</div>
            <div>Absolute</div>
          </div>
        </div>
      </div>
    </section>
  );
}
