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

export default function InvestigationsComposition({ service, images }: CompositionProps) {
  return (
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* 1. ARCHITECTURAL MASTHEAD */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          {/* Breadcrumb & Practice Label */}
          <div className="flex items-center space-x-2 text-xs font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink">{service.displayHeadline || service.semanticH1}</span>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-5xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[200] tracking-tight leading-[1.06] text-ink">
              {service.semanticH1}
            </h1>
            <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
              {service.subProposition}
            </p>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRIC PHOTOGRAPHIC SPREAD & OPERATIONAL CONTEXT */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Integrated Architectural Plate */}
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden border border-rule">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              className="object-cover grayscale contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute bottom-3 left-4 text-[10px] tracking-[0.16em] uppercase font-[300] text-paper/90 bg-ink/70 px-2.5 py-1">
              {images.hero.caption}
            </div>
          </div>

          {/* Context & Analytical Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Instruction Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight leading-snug">
                {service.theProblem.heading}
              </h2>
            </div>
            <div className="space-y-6 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
              {service.theProblem.statement && (
                <p className="text-ink font-[300] text-base sm:text-lg leading-relaxed">
                  {service.theProblem.statement}
                </p>
              )}
              {service.theProblem.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              {service.theProblem.scenarios && service.theProblem.scenarios.length > 0 && (
                <div className="pt-6 border-t border-rule space-y-4">
                  <span className="text-xs font-[300] uppercase tracking-[0.18em] text-ink block">
                    Observed Circumstances & Mandate Triggers
                  </span>
                  <div className="space-y-3">
                    {service.theProblem.scenarios.map((scenario, idx) => (
                      <div key={idx} className="border-b border-rule pb-3">
                        <div className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {scenario}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES LEDGER */}
      <section className="py-20 md:py-28 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Methodological Scope
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

      {/* 4. WORK PRODUCT & LEGAL GOVERNANCE */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Evidential Standard
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
                  <div className="text-sm font-[200] text-ink">Deliverable {idx + 1}</div>
                  <div className="text-ink-muted leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTRUCTING BODIES & DIRECT INTAKE */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Confidential Instruction
            </span>
            <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
              Initiate an enquiry in complete confidence.
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              All initial discussions are conducted under non-disclosure obligations. Direct consultation with practice directors.
            </p>
          </div>
          <div className="space-y-4 shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Begin Confidential Instruction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[11px] text-ink-muted font-[300]">
              Central London Suite · enquiries@tfts.co.uk
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
