import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";
import { ServiceEditorialImages } from "@/lib/data/editorialImagesData";

interface CompositionProps {
  service: FlagshipServiceConfig;
  images: ServiceEditorialImages;
}

export default function IntelligenceComposition({ service, images }: CompositionProps) {
  return (
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* 1. EDITORIAL MONOGRAPH HEADLINE */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex items-center space-x-2 text-xs font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink">{service.displayHeadline || service.semanticH1}</span>
          </div>

          <div className="max-w-5xl space-y-6">
            <span className="text-[11px] tracking-[0.24em] uppercase font-[300] text-ink-muted block">
              Strategic Intelligence Monograph
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[200] tracking-tight leading-[1.06] text-ink">
              {service.semanticH1}
            </h1>
            <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
              {service.subProposition}
            </p>
          </div>
        </div>
      </section>

      {/* 2. FULL-BLEED ARCHIVAL/INFRASTRUCTURE PLATE */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="relative w-full aspect-[21/9] max-h-[500px] overflow-hidden border border-rule">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              className="object-cover grayscale contrast-[1.05]"
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-6 text-[10px] tracking-[0.16em] uppercase font-[300] text-paper/90 bg-ink/70 px-3 py-1">
              {images.hero.caption}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ANALYTICAL DOCTRINE & CONTEXT */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Intelligence Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              {service.theProblem.heading}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
            {service.theProblem.statement && (
              <p className="text-ink font-[300] text-base sm:text-lg leading-relaxed">
                {service.theProblem.statement}
              </p>
            )}
            {service.theProblem.narrative.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ANALYTICAL TAXONOMY (CAPABILITIES) */}
      <section className="py-20 md:py-28 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Collection Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
              {service.capabilities.title}
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              {service.capabilities.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {service.capabilities.items.map((item, idx) => (
              <div key={idx} className="space-y-3 border-t border-rule pt-6">
                <h3 className="text-xl font-[200] text-ink">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DATA GOVERNANCE & SOURCE INTEGRITY */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Provenance Doctrine
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              {service.evidence.title}
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              {service.evidence.standards}
            </p>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-[300]">
              {service.evidence.deliverables.map((item, idx) => (
                <div key={idx} className="border-t border-rule pt-4 space-y-1.5">
                  <div className="text-sm font-[200] text-ink">Output {idx + 1}</div>
                  <div className="text-ink-muted leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONFIDENTIAL INSTRUCTION */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Direct Instruction
            </span>
            <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
              Request an intelligence brief.
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              Confidential briefing for strategic transactions, contentious litigation, or executive profiling.
            </p>
          </div>
          <div className="space-y-4 shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Initiate Confidential Briefing</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[11px] text-ink-muted font-[300]">
              Mayfair Consulting Suite · enquiries@tfts.co.uk
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
