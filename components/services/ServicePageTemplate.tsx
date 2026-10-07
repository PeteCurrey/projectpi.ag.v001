import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceDetail } from "@/lib/data/servicesData";
import { getSiteUrl, BRAND_PREFERRED, TELEPHONE } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

interface ServicePageTemplateProps {
  service: ServiceDetail;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const siteUrl = getSiteUrl();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_PREFERRED,
      url: siteUrl,
      telephone: TELEPHONE,
      priceRange: "££££",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
    },
    areaServed: "United Kingdom",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.whatWeInvestigate.capabilities.map((cap) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: cap.name,
          description: cap.detail,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─── 1. ARCHITECTURAL HERO ────────────────────────────────────────── */}
      <header className="pt-28 md:pt-36 pb-20 md:pb-28 border-b border-rule/50">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 space-y-8">
          <div className="flex items-center space-x-2 text-[10px] tracking-[0.24em] uppercase font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink">{service.title}</span>
          </div>

          <div className="max-w-5xl space-y-6">
            <TFTSTextReveal
              as="h1"
              mode="line"
              className="text-display-md lg:text-display-lg font-[200] tracking-tight leading-[1.02] text-ink"
            >
              {service.title}
            </TFTSTextReveal>
            <TFTSTextReveal
              as="p"
              mode="line"
              delay={0.15}
              className="text-lg md:text-xl font-[300] text-ink-muted max-w-3xl leading-relaxed"
            >
              {service.heroProposition}
            </TFTSTextReveal>
          </div>
        </div>
      </header>

      {/* ─── 2. CONTEXT & MANDATE ─────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block">
              The Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              {service.theQuestion?.subtitle || "Operational Mandate"}
            </h2>
          </div>
          <div className="lg:col-span-9 space-y-6 text-base md:text-lg font-[300] text-ink-muted leading-relaxed max-w-3xl">
            {service.theQuestion?.description && (
              <p>{service.theQuestion.description}</p>
            )}

            {service.theQuestion?.scenarios && service.theQuestion.scenarios.length > 0 && (
              <div className="pt-8 border-t border-rule/40 space-y-4">
                <span className="text-[11px] font-[300] uppercase tracking-[0.22em] text-ink block">
                  Observed Instruction Circumstances
                </span>
                <div className="divide-y divide-rule/30 border-y border-rule/30">
                  {service.theQuestion.scenarios.map((sc: string, idx: number) => (
                    <div key={idx} className="py-3 text-sm md:text-base text-ink-muted">
                      {sc}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 3. CAPABILITIES LEDGER (NO CARDS) ────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40 bg-paper-stone/30">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 pb-12 border-b border-rule/40">
            <div>
              <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block mb-3">
                Methodological Scope
              </span>
              <h2 className="text-3xl md:text-5xl font-[200] text-ink tracking-tight">
                {service.whatWeInvestigate?.subtitle || "Capabilities"}
              </h2>
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-[300] text-ink-muted">
              0{service.whatWeInvestigate?.capabilities.length || 0} Specialisms
            </span>
          </div>

          <div className="divide-y divide-rule/40">
            {service.whatWeInvestigate?.capabilities.map((cap, idx: number) => (
              <div
                key={idx}
                className="group py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16 items-baseline transition-colors hover:bg-paper-stone/50 px-2"
              >
                <div className="md:col-span-1 text-[11px] font-[300] tracking-[0.22em] uppercase text-ink-muted">
                  0{idx + 1}
                </div>
                <div className="md:col-span-4 text-2xl md:text-3xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                  {cap.name}
                </div>
                <div className="md:col-span-7 text-sm md:text-base font-[300] text-ink-muted leading-relaxed">
                  {cap.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. WORK PRODUCT DISCLOSURE ───────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-baseline">
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block">
              Work Product
            </span>
            <h2 className="text-3xl md:text-4xl font-[200] text-ink tracking-tight">
              {service.whatYouReceive?.subtitle || "Deliverables"}
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Evidence and reporting structured according to the agreed instruction.
            </p>
          </div>

          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm font-[300]">
              {service.whatYouReceive?.items.map((item: string, idx: number) => (
                <div key={idx} className="border-t border-rule/40 pt-6 space-y-2">
                  <span className="text-[10px] tracking-[0.24em] uppercase font-[300] text-ink block">
                    Deliverable 0{idx + 1}
                  </span>
                  <div className="text-ink-muted leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CONFIDENTIAL INSTRUCTION CODA ─────────────────────────────── */}
      <footer className="py-24 md:py-36">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 flex flex-col md:flex-row md:items-baseline justify-between gap-12">
          <div className="max-w-2xl space-y-4">
            <span className="text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted block">
              Confidential Instruction
            </span>
            <h2 className="text-display-sm font-[200] text-ink tracking-tight leading-[1.06]">
              Initiate an enquiry in complete confidence.
            </h2>
            <p className="text-base font-[300] text-ink-muted leading-relaxed">
              Direct consultation with senior practice directors under strict non-disclosure obligations.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-8 py-4 text-[11px] tracking-[0.24em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-none"
            >
              <span>Begin Confidential Instruction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
