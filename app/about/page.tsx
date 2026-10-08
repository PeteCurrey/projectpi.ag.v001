import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSParallax from "@/components/experience/TFTSParallax";
import TFTSViewportMedia from "@/components/experience/TFTSViewportMedia";

export const metadata: Metadata = {
  title: "The Firm & Establishment | TFTS — Tactical Field Intelligence Service",
  description:
    "An established UK private intelligence and investigations consultancy operating from central London. Discretion, proportionality, and empirical certainty for serious matters.",
  alternates: {
    canonical: getCanonicalUrl("/about"),
  },
};

const pillars = [
  {
    title: "Absolute Discretion",
    body: "Work product structured to support Legal Professional Privilege. Compartmentalised operatives with zero operational exposure for the client.",
  },
  {
    title: "Evidentiary Rigour",
    body: "All evidence procured strictly within the Civil Procedure Rules (CPR 31/32), ensuring complete admissibility in High Court proceedings.",
  },
  {
    title: "Statutory Compliance",
    body: "Full alignment with the Data Protection Act 2018, UK GDPR, RIPA principles, and the British Standard BS 102000 code of conduct.",
  },
  {
    title: "Institutional Scope",
    body: "Serving solicitors, insurers, boards, insolvency practitioners, and family offices on mandates ranging from £1,000 to £25,000+.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink min-h-screen">

      {/* ── 1. OPENING — Full-viewport hero image with natural atmospheric grading ── */}
      <section className="relative h-screen overflow-hidden">
        <TFTSParallax speed={40} className="absolute inset-0">
          <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2800&q=90"
              alt="London Thames panorama — Canary Wharf financial district from the river in atmospheric evening light"
              fill
              className="object-cover"
              style={{ filter: "contrast(1.08) brightness(0.76) saturate(0.85)" }}
              sizes="100vw"
              priority
            />
          </TFTSImageReveal>
        </TFTSParallax>
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/30 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-12 pb-20">
          <TFTSTextReveal mode="lines">
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-paper/80 block">
                THE ESTABLISHMENT · LONDON
              </span>
              <h1 className="text-display-xl font-[200] text-paper/95 tracking-tight leading-[1.04]">
                The Firm.
              </h1>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. MANDATE NARRATIVE — Asymmetric 12-col grid ── */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left 7 cols */}
            <div className="lg:col-span-7 space-y-8">
              <TFTSTextReveal mode="lines">
                <div className="space-y-6">
                  <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                    Operating where conventional research ends
                  </span>
                  <h2 className="text-display-sm font-[200] text-ink leading-tight">
                    A private firm you have discovered, not a service trying to sell itself to you.
                  </h2>
                </div>
              </TFTSTextReveal>
              <TFTSTextReveal mode="lines">
                <div className="space-y-5 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
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
                  <p className="text-ink font-[300]">
                    Our ethos is defined by quiet restraint, architectural precision, and absolute discretion.
                    We believe that the most formidable intelligence firms leave no public footprint,
                    safeguard client identity at all costs, and deliver evidence that is unassailable under judicial cross-examination.
                  </p>
                </div>
              </TFTSTextReveal>
            </div>

            {/* Right 5 cols */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule/50">
                <TFTSImageReveal mode="wipe-up" className="absolute inset-0 w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=1200&q=80"
                    alt="London classical colonnade and stone architectural perspective"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    style={{ filter: "contrast(1.08) brightness(0.85) saturate(0.85)" }}
                  />
                </TFTSImageReveal>
              </div>
              <p className="text-[11px] tracking-[0.18em] uppercase font-[300] text-ink-muted">
                Mayfair, London W1 · Strictly By Appointment
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. CINEMATIC SPATIAL BREAK — Operational Review Suite ── */}
      <div className="border-b border-rule">
        <TFTSViewportMedia
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2800&q=90"
          alt="Quiet contemporary corporate governance and intelligence review suite with clean linear architectural perspective"
          aspectClass="aspect-[21/9]"
          scaleOnScroll={true}
          imageFilter="contrast(1.08) brightness(0.78) saturate(0.85)"
          caption="Corporate governance & investigative review suite · Mayfair consulting rooms"
          sizes="100vw"
        />
      </div>

      {/* ── 4. FOUR PILLARS — Typographic ledger ── */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-3xl mb-16 space-y-4">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Operational Governance
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Foundational Principles
              </h2>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule">
            {pillars.map((pillar, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="md:col-span-4 text-xl font-[200] text-ink">
                    {pillar.title}
                  </h3>
                  <p className="md:col-span-7 text-sm font-[300] text-ink-muted leading-relaxed">
                    {pillar.body}
                  </p>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA — Editorial, bg-paper-stone ── */}
      <section className="py-24 md:py-32 bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="max-w-3xl space-y-8">
              <h2 className="text-display-sm font-[200] text-ink">
                Initiate a Discreet Consultation.
              </h2>
              <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-xl">
                Discuss your requirements in complete confidence with our senior consulting directors.
              </p>
              <div>
                <Link
                  href="/confidential-enquiry"
                  className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
                >
                  Begin Confidential Consultation
                </Link>
              </div>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

    </div>
  );
}
