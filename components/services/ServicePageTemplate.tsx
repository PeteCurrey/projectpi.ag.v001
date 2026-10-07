import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceDetail } from "@/lib/data/servicesData";
import { getSiteUrl, BRAND_PREFERRED, TELEPHONE } from "@/lib/config/brand";

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
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. MASTHEAD */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex items-center space-x-2 text-xs font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-ink">{service.title}</span>
          </div>

          <div className="max-w-5xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[200] tracking-tight leading-[1.06] text-ink">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
              {service.heroProposition}
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT & MANDATE */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              The Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              {service.theQuestion?.subtitle || "Operational Mandate"}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
            {service.theQuestion?.description && (
              <p>{service.theQuestion.description}</p>
            )}

            {service.theQuestion?.scenarios && service.theQuestion.scenarios.length > 0 && (
              <div className="pt-6 border-t border-rule space-y-3">
                <span className="text-xs font-[300] uppercase tracking-[0.18em] text-ink block">
                  Observed Instruction Circumstances
                </span>
                <div className="space-y-3">
                  {service.theQuestion.scenarios.map((sc: string, idx: number) => (
                    <div key={idx} className="border-b border-rule pb-3">
                      <div className="text-xs sm:text-sm text-ink-muted leading-relaxed">{sc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="py-20 md:py-28 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Methodological Scope
            </span>
            <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
              {service.whatWeInvestigate?.subtitle || "Capabilities"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {service.whatWeInvestigate?.capabilities.map((cap, idx: number) => (
              <div key={idx} className="space-y-3 border-t border-rule pt-6">
                <h3 className="text-xl font-[200] text-ink">
                  {cap.name}
                </h3>
                <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK PRODUCT */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Work Product
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              {service.whatYouReceive?.subtitle || "Deliverables"}
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              Evidence and reporting structured according to the agreed instruction.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-[300]">
              {service.whatYouReceive?.items.map((item: string, idx: number) => (
                <div key={idx} className="border-t border-rule pt-4 space-y-1.5">
                  <div className="text-sm font-[200] text-ink">Deliverable {idx + 1}</div>
                  <div className="text-ink-muted leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONFIDENTIAL INSTRUCTION */}
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
              Direct consultation with senior practice directors under non-disclosure obligations.
            </p>
          </div>
          <div className="space-y-3 shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Begin Confidential Instruction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
