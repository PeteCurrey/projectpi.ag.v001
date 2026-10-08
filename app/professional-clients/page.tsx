import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { professionalClientsHub } from "@/lib/data/professionalClientsData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSParallax from "@/components/experience/TFTSParallax";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSViewportMedia from "@/components/experience/TFTSViewportMedia";

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

      {/* ── MASTHEAD — Cinematic institutional entrance with natural grading ── */}
      <section className="relative h-[65vh] overflow-hidden">
        <TFTSParallax speed={30} className="absolute inset-0">
          <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2800&q=90"
              alt="City of London financial institution architectural entrance — institutional client advisory"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "contrast(1.08) brightness(0.75) saturate(0.85)" }}
            />
          </TFTSImageReveal>
        </TFTSParallax>

        {/* Gradient — bleeds seamlessly into paper below */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/30 to-black/40" />

        {/* Type anchored to bottom */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <TFTSTextReveal mode="lines">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-paper/80 block">
                INSTITUTIONAL &amp; LEGAL SECTORS
              </span>
              <h1 className="text-display-xl font-[200] text-paper/95 tracking-tight leading-[1.04]">
                {professionalClientsHub.headline}
              </h1>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── INTRO & ASYMMETRIC SPATIAL NARRATIVE ── */}
      <section className="bg-paper py-16 md:py-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Privilege, Rigour &amp; Direct Engagement
              </span>
              <TFTSTextReveal mode="lines">
                <p className="text-xl sm:text-2xl font-[200] text-ink max-w-3xl leading-relaxed">
                  {professionalClientsHub.intro}
                </p>
              </TFTSTextReveal>
              <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-2xl">
                We design operational parameters strictly aligned with solicitors&apos; litigation directions,
                insolvency recovery mandates, and corporate board fiduciary requirements. Every piece of work
                product is formatted for direct filing and sworn exhibit admissibility.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-rule/50">
                <TFTSImageReveal mode="wipe-up" className="absolute inset-0 w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80"
                    alt="Classical London legal chambers architecture"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    style={{ filter: "contrast(1.08) brightness(0.85) saturate(0.85)" }}
                  />
                </TFTSImageReveal>
              </div>
              <p className="text-[10px] tracking-[0.18em] uppercase font-[300] text-ink-muted">
                Inner Temple &amp; Chancery Lane vicinity · London WC2
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTOR LEDGER ── */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">

          <TFTSTextReveal mode="lines">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Instruction Profiles
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Select Your Practice Area
              </h2>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule border-t border-rule">
            {professionalClientsHub.sectors.map((sector, idx) => (
              <Link
                key={idx}
                href={`/professional-clients/${sector.slug}`}
                className="group flex items-baseline justify-between py-7 hover:bg-paper-stone/40 transition-colors px-2"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl sm:text-3xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                    {sector.title}
                  </span>
                </div>
                <span className="text-xl text-ink-muted group-hover:text-ink transition-colors select-none">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CINEMATIC SPATIAL ACCENT ── */}
      <div className="border-t border-rule">
        <TFTSViewportMedia
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2800&q=90"
          alt="Canary Wharf commercial banking towers along the River Thames"
          aspectClass="aspect-[21/9]"
          scaleOnScroll={true}
          imageFilter="contrast(1.08) brightness(0.74) saturate(0.85)"
          caption="Financial district operations & cross-border asset tracking · London"
          sizes="100vw"
        />
      </div>

      {/* ── CTA ── */}
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
