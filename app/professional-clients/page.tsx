import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { professionalClientsHub } from "@/lib/data/professionalClientsData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSParallax from "@/components/experience/TFTSParallax";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

export const metadata: Metadata = {
  title: professionalClientsHub.metaTitle,
  description: professionalClientsHub.metaDescription,
  alternates: {
    canonical: getCanonicalUrl("/professional-clients"),
  },
};

export default function ProfessionalClientsHubPage() {
  return (
    <div className="bg-paper min-h-screen text-ink">

      {/* ── MASTHEAD — full-viewport image with type ──────────────────── */}
      <section className="relative h-[60vh] overflow-hidden">
        <TFTSParallax speed={30} className="absolute inset-0">
          <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2800&q=90"
              alt="City of London skyline — institutional and legal client hub"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "grayscale(100%) contrast(1.06) brightness(0.75)" }}
            />
          </TFTSImageReveal>
        </TFTSParallax>

        {/* Gradient — bleeds into paper below */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/90 via-paper/30 to-transparent" />

        {/* Type anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <TFTSTextReveal mode="lines">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-paper/60 block">
                INSTITUTIONAL &amp; LEGAL SECTORS
              </span>
              <h1 className="text-display-xl font-[200] text-paper/95 tracking-tight leading-[1.04]">
                {professionalClientsHub.headline}
              </h1>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────── */}
      <section className="bg-paper py-16 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <p className="text-lg sm:text-xl font-[200] text-ink max-w-3xl leading-relaxed">
              {professionalClientsHub.intro}
            </p>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── SECTOR LEDGER ─────────────────────────────────────────────── */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">

          <TFTSTextReveal mode="lines">
            <h2 className="text-display-sm font-[200] text-ink">
              Select Your Practice Area
            </h2>
          </TFTSTextReveal>

          <div className="divide-y divide-rule border-t border-rule">
            {professionalClientsHub.sectors.map((sector, idx) => (
              <Link
                key={idx}
                href={`/professional-clients/${sector.slug}`}
                className="group flex items-baseline justify-between py-6 hover:bg-paper-stone/40 transition-colors px-1"
              >
                <span className="text-2xl sm:text-3xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                  {sector.title}
                </span>
                <span className="text-xl text-ink-muted group-hover:text-ink transition-colors select-none">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-paper-stone border-t border-rule py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="space-y-6 max-w-3xl">
              <h2 className="text-display-sm font-[200] text-ink">
                Engage Our Firm Professionally.
              </h2>
              <p className="text-sm font-[300] text-ink-muted leading-relaxed">
                Whether a single urgent service or complex contentious litigation support, our team delivers complete certainty.
              </p>
              <div className="pt-2">
                <Link
                  href="/confidential-enquiry"
                  className="inline-block border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
                >
                  Begin a Confidential Enquiry
                </Link>
              </div>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

    </div>
  );
}
