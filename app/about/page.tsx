import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Building, Scale, ArrowRight, Award } from "lucide-react";

import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "The Firm & Establishment | TFTS — Tactical Field Intelligence Service",
  description: "An established UK private intelligence and investigations consultancy operating from central London. Discretion, proportionality, and empirical certainty for serious matters.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
};


export default function AboutPage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Editorial Header */}
      <section className="py-24 md:py-36 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              THE ESTABLISHMENT · LONDON HEADQUARTERS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              The Firm
            </h1>
            <p className="text-xl sm:text-2xl text-stone-light font-light leading-relaxed max-w-3xl">
              A private firm you have discovered, not a service that is trying to sell itself to you.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative & Architectural Presence */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-stone font-light leading-relaxed">
              <h2 className="text-2xl sm:text-4xl font-light text-warmWhite font-serif tracking-tight">
                Operating where conventional research ends and certainty is required.
              </h2>
              <p>
                Founded to bridge the divide between commercial risk advisory, forensic intelligence,
                and real-world field tradecraft, our firm exists to establish empirical truth in complex,
                high-exposure situations.
              </p>
              <p>
                We do not operate as a volume consumer agency. We handle instructions where the commercial,
                legal, or reputational stakes are severe: multi-million-pound commercial disputes,
                cross-border asset dissipation, systemic insider fraud, and sensitive family office governance.
              </p>
              <p className="text-warmWhite font-normal">
                Our ethos is defined by quiet restraint, architectural precision, and absolute discretion.
                We believe that the most formidable intelligence firms leave no public footprint,
                safeguard client identity at all costs, and deliver evidence that is unassailable under judicial cross-examination.
              </p>
            </div>

            {/* Right Architectural Plaque Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full border border-oliveGrey bg-obsidian-surface p-2 rounded-xs">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80"
                    alt="Mayfair London establishment facade"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale contrast-125 opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-85" />
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-obsidian/95 border border-oliveGrey/90 backdrop-blur-md rounded-xs">
                  <div className="text-[10px] font-mono uppercase tracking-ultra text-brass mb-1">
                    CENTRAL LONDON CONSULTING SUITE
                  </div>
                  <div className="text-xs text-warmWhite font-light">
                    Mayfair, London W1 · Strictly By Appointment
                  </div>
                  <div className="text-[10px] font-mono text-stone-muted pt-2 border-t border-oliveGrey/60 mt-2">
                    CONFIDENTIALITY AGREEMENTS EXECUTED PRIOR TO INTAKE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplinary Standards & Pillars */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              OPERATIONAL GOVERNANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite font-serif">
              Our Foundational Pillars
            </h2>
            <p className="text-sm text-stone font-light">
              How we distinguish our practice from traditional commercial detective agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-4">
              <Lock className="w-5 h-5 text-brass" />
              <h3 className="text-lg font-light text-warmWhite font-serif">Absolute Discretion</h3>
              <p className="text-xs text-stone leading-relaxed font-light">
                Work product structured to support Legal Professional Privilege. Compartmentalised operatives with zero operational exposure for the client.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-4">
              <Scale className="w-5 h-5 text-brass" />
              <h3 className="text-lg font-light text-warmWhite font-serif">Evidentiary Rigour</h3>
              <p className="text-xs text-stone leading-relaxed font-light">
                All evidence procured strictly within the Civil Procedure Rules (CPR 31/32), ensuring complete admissibility in High Court proceedings.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-4">
              <ShieldCheck className="w-5 h-5 text-brass" />
              <h3 className="text-lg font-light text-warmWhite font-serif">Statutory Compliance</h3>
              <p className="text-xs text-stone leading-relaxed font-light">
                Full alignment with the Data Protection Act 2018, UK GDPR, RIPA principles, and the British Standard BS 102000 code of conduct.
              </p>
            </div>

            <div className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-4">
              <Building className="w-5 h-5 text-brass" />
              <h3 className="text-lg font-light text-warmWhite font-serif">Institutional Scope</h3>
              <p className="text-xs text-stone leading-relaxed font-light">
                Serving solicitors, insurers, boards, insolvency practitioners, and family offices on mandates ranging from £1,000 to £25,000+.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-obsidian text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-light text-warmWhite font-serif uppercase">
            Initiate a Discreet Consultation
          </h2>
          <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
            Discuss your requirements in complete confidence with our senior consulting directors.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-3.5 text-xs tracking-widest uppercase font-medium rounded-xs shadow-etched"
            >
              <span>BEGIN CONFIDENTIAL CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
