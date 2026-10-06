import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function EditorialStatement() {
  return (
    <section className="py-24 md:py-32 bg-obsidian border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Copy Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
                FOUNDATIONAL PRINCIPLE
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-warmWhite tracking-tight leading-[1.15] font-serif">
                WHEN THE ANSWER MATTERS, <br />
                <span className="text-stone">ASSUMPTIONS AREN'T ENOUGH.</span>
              </h2>
            </div>

            <div className="space-y-6 text-stone text-sm sm:text-base leading-relaxed font-light">
              <p>
                In high-value litigation, corporate governance crises, substantial capital deployments,
                and delicate family office matters, decisions are frequently made on fragmentary impressions
                and curated self-disclosure.
              </p>
              <p>
                We do not deal in conjecture, algorithmic guesswork, or automated compliance checklists.
                Our firm establishes empirical facts, forensic intelligence, and court-admissible evidence
                where the perimeter of conventional search ends.
              </p>
              <p className="text-warmWhite font-normal">
                We operate as a discreet extension of your advisory council—deploying targeted human intelligence,
                technical open-source tradecraft, and proportionate field observation to deliver definitive factual clarity.
              </p>
            </div>

            {/* Core Tenets Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-oliveGrey/60 text-xs text-stone-light">
              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 rounded-xs border border-brass/60 flex items-center justify-center mt-0.5 text-brass">
                  ✓
                </span>
                <span>Proportionate & lawful under UK statutory framework</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 rounded-xs border border-brass/60 flex items-center justify-center mt-0.5 text-brass">
                  ✓
                </span>
                <span>Civil Procedure Rules (CPR) compliant evidence</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 rounded-xs border border-brass/60 flex items-center justify-center mt-0.5 text-brass">
                  ✓
                </span>
                <span>Strict compartmentalisation and discretion</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-4 h-4 rounded-xs border border-brass/60 flex items-center justify-center mt-0.5 text-brass">
                  ✓
                </span>
                <span>Independent, unvarnished reporting</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-brass hover:text-warmWhite transition-colors group"
              >
                <span>Read more about our establishment and standards</span>
                <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Architectural Image Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full border border-oliveGrey bg-obsidian-surface p-2 rounded-xs">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1200&q=80"
                  alt="Architectural detail of private London building"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale contrast-125 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 grain-overlay opacity-30" />
              </div>

              {/* Architectural Inscription Plaque */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-obsidian/95 border border-oliveGrey/90 backdrop-blur-md rounded-xs">
                <div className="text-[10px] font-mono uppercase tracking-ultra text-brass mb-1">
                  DISCRETION & GOVERNANCE
                </div>
                <p className="text-xs text-stone font-light leading-relaxed">
                  "Our work begins where public knowledge ends. Discretion is not merely a policy; it is our foundational operating architecture."
                </p>
                <div className="mt-3 pt-2 border-t border-oliveGrey/60 flex justify-between items-center text-[9px] font-mono text-stone-muted">
                  <span>MEMBER, BS 102000 CODE</span>
                  <span>LONDON W1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
