import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { casesData } from "@/lib/data/casesData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSParallax from "@/components/experience/TFTSParallax";

export const metadata: Metadata = {
  title: "Anonymised Case Studies & Casework Archive | TFTS",
  description:
    "Anonymised casework briefs detailing investigation questions, methodologies, verified findings, and legal/commercial outcomes across London and global jurisdictions.",
  alternates: {
    canonical: getCanonicalUrl("/cases"),
  },
};

// Curated cinematic evidentiary imagery for each case study
const caseMedia: Record<string, { src: string; alt: string; caption: string }> = {
  "case-001": {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85",
    alt: "Corporate due diligence and founder integrity examination files",
    caption: "Cross-jurisdictional integrity assessment · UAE & Cyprus entities",
  },
  "case-002": {
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85",
    alt: "Canary Wharf and River Thames skyline representing multi-jurisdictional asset tracing",
    caption: "Beneficial ownership tracing · Knightsbridge residential & Antibes maritime assets",
  },
  "case-003": {
    src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=85",
    alt: "Industrial supply chain perimeter representing procurement fraud investigation",
    caption: "Supply chain shrinkage & vendor audit · £4.2M fraudulent aggregate invoices",
  },
  "case-004": {
    src: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=1600&q=85",
    alt: "London morning street perspective representing covert physical surveillance",
    caption: "Section 57 Fundamental Dishonesty audit · High Court defense outcome",
  },
};

export default function CasesPage() {
  return (
    <div className="bg-paper min-h-screen text-ink selection:bg-ink selection:text-paper">

      {/* ── 1. MASTHEAD ── */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
          <TFTSTextReveal mode="lines">
            <div className="space-y-4 max-w-4xl">
              <span className="text-[11px] uppercase tracking-[0.22em] font-[300] text-ink-muted block">
                EVIDENTIARY PORTFOLIO · VERIFIED CASEWORK
              </span>
              <h1 className="text-display-lg font-[200] text-ink tracking-tight leading-[1.02]">
                Casework Archives.
              </h1>
              <p className="text-base sm:text-lg text-ink-muted font-[300] leading-relaxed max-w-3xl">
                A structured repository of anonymised instructions demonstrating our empirical tradecraft,
                forensic methodology, and measurable outcomes in high-value corporate, legal, and private matters.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. CASE STUDIES INTELLIGENCE DOSSIER STACK ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
          {casesData.map((item) => {
            const media = caseMedia[item.id];
            return (
              <article
                key={item.id}
                className="border-b border-rule pb-24 last:border-b-0 space-y-12"
              >
                {/* Dossier Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-rule pb-4 gap-2">
                  <div className="flex items-center space-x-3 text-xs font-[300] tracking-widest">
                    <span className="text-ink font-[400]">{item.number}</span>
                    <span className="text-rule">/</span>
                    <span className="text-brass tracking-[0.2em]">{item.discipline}</span>
                  </div>
                  <div className="text-[11px] font-[300] tracking-[0.18em] uppercase text-ink-muted">
                    INSTRUCTED BY: {item.clientSector}
                  </div>
                </div>

                {/* Spatial Grid: Visual Plate + Evidentiary Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

                  {/* Left Column (5/12): Evidentiary Media Plate */}
                  <div className="lg:col-span-5 space-y-4">
                    {media && (
                      <TFTSParallax speed={20}>
                        <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden border border-rule/50">
                          <TFTSImageReveal mode="wipe-up" className="absolute inset-0 w-full h-full">
                            <Image
                              src={media.src}
                              alt={media.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 40vw"
                              className="object-cover"
                              style={{ filter: "contrast(1.08) brightness(0.85) saturate(0.85)" }}
                            />
                          </TFTSImageReveal>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-4 right-4 text-[9px] tracking-[0.2em] uppercase font-[300] text-warmWhite">
                            {media.caption}
                          </div>
                        </div>
                      </TFTSParallax>
                    )}

                    <div className="pt-2">
                      <Link
                        href={`/services/${item.relatedServiceSlug}`}
                        className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-[300] text-ink hover:text-ink-muted transition-colors"
                      >
                        <span>Examine Corresponding Practice</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column (7/12): Core Evidence & Narrative */}
                  <div className="lg:col-span-7 space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight leading-tight">
                      {item.title}
                    </h2>

                    {/* The Initial Question */}
                    <div className="border-l-2 border-ink pl-6 space-y-2">
                      <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
                        THE INITIAL QUESTION
                      </span>
                      <p className="text-ink text-lg sm:text-xl font-[200] leading-snug">
                        &ldquo;{item.question}&rdquo;
                      </p>
                      <p className="text-ink-muted text-xs sm:text-sm font-[300] leading-relaxed pt-1">
                        {item.investigation}
                      </p>
                    </div>

                    {/* Methodology & Findings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-[300]">
                      <div className="border-t border-rule pt-4 space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-ink-muted block">
                          METHODOLOGY DEPLOYED
                        </span>
                        <ul className="space-y-2 text-ink-muted">
                          {item.methodology.map((m, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-ink mr-1">—</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="border-t border-rule pt-4 space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-ink-muted block">
                          VERIFIED FINDINGS
                        </span>
                        <p className="text-ink-muted leading-relaxed">
                          {item.findings}
                        </p>
                      </div>
                    </div>

                    {/* Outcome Box */}
                    <div className="bg-paper-stone p-6 space-y-2 border-t border-rule">
                      <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
                        MEASURABLE COMMERCIAL &amp; LEGAL OUTCOME
                      </span>
                      <p className="text-sm text-ink font-[300] leading-relaxed">
                        {item.outcome}
                      </p>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── 3. CONFIDENTIAL CONSULTATION PROMPT ── */}
      <section className="py-24 md:py-32 bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl space-y-8">
            <h2 className="text-display-sm font-[200] text-ink leading-[1.08]">
              Have a Comparable High-Exposure Scenario?
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-xl">
              Our directors evaluate incoming instructions within hours. We ensure your matter
              is handled under strict confidentiality from the very first conversation.
            </p>
            <div>
              <Link
                href="/confidential-enquiry"
                className="inline-block border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
              >
                Discuss the Matter in Confidence →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
