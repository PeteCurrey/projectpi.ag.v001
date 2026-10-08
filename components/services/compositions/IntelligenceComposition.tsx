"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";
import { ServiceEditorialImages } from "@/lib/data/editorialImagesData";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSViewportMedia from "@/components/experience/TFTSViewportMedia";
import TFTSParallax from "@/components/experience/TFTSParallax";

interface CompositionProps {
  service: FlagshipServiceConfig;
  images: ServiceEditorialImages;
}

export default function IntelligenceComposition({ service, images }: CompositionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper overflow-x-hidden">
      {/* ─── 1. WIDESCREEN ENVIRONMENTAL GLASS OVERLAY HERO ─────────────────── */}
      <header className="relative border-b border-rule/50 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.24em] uppercase font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Disciplines
            </Link>
            <span>/</span>
            <span>Strategic Intelligence & OSINT Practice</span>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-5xl space-y-6">
            <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block">
              Forensic OSINT & Digital Information Geometry
            </span>
            <TFTSTextReveal
              as="h1"
              mode="line"
              className="text-display-md lg:text-display-lg font-[200] text-ink leading-[1.02]"
            >
              {service.semanticH1}
            </TFTSTextReveal>
            <TFTSTextReveal
              as="p"
              mode="line"
              delay={0.15}
              className="text-lg md:text-xl font-[300] text-ink-muted max-w-3xl leading-relaxed"
            >
              {service.subProposition}
            </TFTSTextReveal>
          </div>

          {/* Panoramic Archival/Glass Architectural Plate */}
          <TFTSParallax speed={25}>
            <div className="relative w-full aspect-[21/9] max-h-[520px] overflow-hidden border border-rule/50">
              <TFTSViewportMedia
                src={images.hero.src}
                alt={images.hero.alt}
                aspectClass="h-full"
                scaleOnScroll={true}
                priority={true}
                caption={images.hero.caption}
                imageFilter="contrast(1.08) brightness(0.76) saturate(0.85)"
              />
            </div>
          </TFTSParallax>
        </div>
      </header>

      {/* ─── 2. ANALYTICAL CONTEXT & DATA GEOMETRY ──────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-3">
              <span className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                Intelligence Mandate
              </span>
            </div>

            <div className="lg:col-span-9 space-y-10">
              <TFTSTextReveal
                as="h2"
                mode="line"
                className="text-display-sm font-[200] text-ink leading-[1.08] max-w-[840px]"
              >
                {service.theProblem.heading}
              </TFTSTextReveal>

              {service.theProblem.statement && (
                <p className="text-xl md:text-2xl font-[200] text-ink/80 leading-relaxed max-w-3xl">
                  {service.theProblem.statement}
                </p>
              )}

              <div className="space-y-6 text-base md:text-lg font-[300] text-ink-muted leading-relaxed max-w-3xl">
                {service.theProblem.narrative.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Observed Triggers */}
              {service.theProblem.scenarios && service.theProblem.scenarios.length > 0 && (
                <div className="pt-8 border-t border-rule/40 space-y-6">
                  <span className="text-[11px] font-[300] uppercase tracking-[0.22em] text-ink block">
                    Information Asymmetry & Investigation Triggers
                  </span>
                  <div className="divide-y divide-rule/30 border-y border-rule/30">
                    {service.theProblem.scenarios.map((scenario, idx) => (
                      <div key={idx} className="py-4 text-sm md:text-base font-[300] text-ink-muted">
                        {scenario}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. LAYERED CAPABILITY LEDGER (NO CARDS) ────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40 bg-paper-stone/30">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-12 border-b border-rule/40">
            <div>
              <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block mb-3">
                Information Disciplines
              </span>
              <h2 className="text-3xl md:text-5xl font-[200] text-ink tracking-tight">
                {service.capabilities.title}
              </h2>
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-[300] text-ink-muted">
              0{service.capabilities.items.length} Intelligence Vectors
            </span>
          </div>

          <div className="divide-y divide-rule/40">
            {service.capabilities.items.map((item, idx) => (
              <div
                key={idx}
                className="group py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-baseline transition-colors hover:bg-paper-stone/50 px-2"
              >
                <div className="md:col-span-1 text-[11px] font-[300] tracking-[0.22em] uppercase text-ink-muted">
                  {item.number || `0${idx + 1}`}
                </div>
                <div className="md:col-span-4 text-2xl md:text-3xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                  {item.title}
                </div>
                <div className="md:col-span-7 text-sm md:text-base font-[300] text-ink-muted leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. ANALYTICAL RESEARCH METHODOLOGY ──────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-3">
              <span className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                Forensic Sequence
              </span>
              <h2 className="text-3xl md:text-4xl font-[200] text-ink tracking-tight mt-4">
                {service.approach.title}
              </h2>
            </div>

            <div className="lg:col-span-9 space-y-16">
              {service.approach.steps.map((step, idx) => (
                <div key={idx} className="border-b border-rule/40 pb-12 space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                      PHASE {step.number}
                    </span>
                    <span className="h-[1px] w-8 bg-rule" />
                    <h3 className="text-xl md:text-2xl font-[200] text-ink">
                      {step.name}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg font-[300] text-ink-muted leading-relaxed max-w-3xl pl-0 md:pl-16">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. EVIDENTIAL DOSSIER OUTPUT ────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40 bg-paper-stone/20">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-3">
              <span className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                Work Product
              </span>
              <h2 className="text-3xl md:text-4xl font-[200] text-ink tracking-tight mt-4">
                {service.evidence.title}
              </h2>
            </div>

            <div className="lg:col-span-9 space-y-12">
              <p className="text-lg md:text-xl font-[200] text-ink leading-relaxed max-w-3xl">
                {service.evidence.standards}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {service.evidence.deliverables.map((item, idx) => (
                  <div key={idx} className="border-t border-rule/40 pt-6 space-y-2">
                    <span className="text-[10px] tracking-[0.24em] uppercase font-[300] text-ink block">
                      Deliverable 0{idx + 1}
                    </span>
                    <p className="text-base md:text-lg font-[200] text-ink leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Data Protection Footing */}
              <div className="pt-8 border-t border-rule/40 text-xs font-[300] text-ink-muted space-y-2">
                <span className="text-[10px] tracking-[0.24em] uppercase text-ink block mb-2">
                  Lawful Processing & Source Verification
                </span>
                <p>
                  All intelligence is gathered through lawful open-source interrogation, corporate registries,
                  and proprietary analytical methodologies under UK GDPR legitimate interest balancing tests.
                  Strictly zero unlawful intercept or prohibited database breaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FREQUENTLY ADDRESSED QUESTIONS ───────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-3">
              <span className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                Evidential Clarity
              </span>
              <h2 className="text-3xl md:text-4xl font-[200] text-ink tracking-tight mt-4">
                Operational FAQs
              </h2>
            </div>

            <div className="lg:col-span-9 divide-y divide-rule/40 border-y border-rule/40">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="py-6">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full text-left flex items-start justify-between gap-4 py-2 group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg md:text-xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                        {faq.question}
                      </span>
                      <span className="p-1 text-ink-muted group-hover:text-ink transition-colors mt-1">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pt-4 pb-2 text-sm md:text-base font-[300] text-ink-muted leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. DIRECT INTAKE CODA ───────────────────────────────────────────── */}
      <footer className="py-24 md:py-36">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block">
                Confidential Instruction
              </span>
              <h2 className="text-display-sm lg:text-display-md font-[200] text-ink leading-[1.04]">
                Initiate strategic research.
              </h2>
              <p className="text-base md:text-lg font-[300] text-ink-muted max-w-2xl leading-relaxed">
                Instructions accepted from corporate leadership, General Counsel, family offices,
                and litigation teams facing decisive information gaps.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-4">
              <Link
                href="/confidential-enquiry"
                className="inline-flex items-center justify-between border border-britishGreen px-8 py-4 text-[11px] tracking-[0.24em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-all duration-300 rounded-none w-full"
              >
                <span>Submit Confidential Mandate</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <div className="text-[10px] tracking-[0.2em] uppercase font-[300] text-ink-muted text-right">
                Direct Dispatch: enquiries@tfts.co.uk
              </div>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
