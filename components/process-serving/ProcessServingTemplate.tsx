import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProcessServingPageData } from "@/lib/data/processServingData";
import { getSiteUrl, BRAND_PREFERRED } from "@/lib/config/brand";

interface ProcessServingTemplateProps {
  data: ProcessServingPageData;
}

export default function ProcessServingTemplate({ data }: ProcessServingTemplateProps) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.title,
    description: data.metaDescription,
    serviceType: "Legal Process Serving",
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_PREFERRED,
      url: siteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

  return (
    <article className="bg-paper text-ink selection:bg-ink selection:text-paper min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. MASTHEAD */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="flex items-center space-x-2 text-xs font-[300] text-ink-muted">
            <Link href="/services" className="hover:text-ink transition-colors">
              Services
            </Link>
            <span>/</span>
            <Link href="/services/process-serving" className="hover:text-ink transition-colors">
              Process Serving
            </Link>
            <span>/</span>
            <span className="text-ink">{data.documentCategory}</span>
          </div>

          <div className="max-w-5xl space-y-6">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              CPR Part 6 · Statutory Basis: {data.legalBasis}
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[200] tracking-tight leading-[1.06] text-ink">
              {data.title}
            </h1>
            <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
              {data.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROCEDURAL CONTEXT */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              The Procedural Imperative
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              When Delivery Cannot Fail
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
            <p>{data.intro}</p>
            <p>{data.whatItIs}</p>
            <div className="pt-4 border-t border-rule space-y-2 text-xs">
              <span className="text-ink font-[300] uppercase tracking-wider block">
                Statutory Governance
              </span>
              <p className="text-ink-muted">{data.legalContext}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL PROTOCOL */}
      <section className="py-20 md:py-28 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Methodology & Rigour
            </span>
            <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
              Operational Protocol
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {data.ourApproach.map((step, idx) => (
              <div key={idx} className="space-y-3 border-t border-rule pt-6">
                <div className="text-xs font-[300] text-ink-muted">Stage {idx + 1}</div>
                <h3 className="text-xl font-[200] text-ink">
                  {step.heading}
                </h3>
                <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK PRODUCT DELIVERABLES */}
      <section className="py-20 md:py-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Evidential Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Certificate & Affidavit of Service
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              Court-ready proofs compliant with Civil Procedure Rule requirements.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-[300]">
              {data.whatYouReceive.map((item, idx) => (
                <div key={idx} className="border-t border-rule pt-4 space-y-1.5">
                  <div className="text-sm font-[200] text-ink">Output {idx + 1}</div>
                  <div className="text-ink-muted leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT INSTRUCTION */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Urgent Service Request
            </span>
            <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
              Instruct on {data.documentCategory}.
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              Rapid scheduling across England & Wales. Immediate confirmation upon execution.
            </p>
          </div>
          <div className="space-y-4 shrink-0">
            <Link
              href={`/confidential-enquiry?service=process-serving&matter=${encodeURIComponent(data.slug)}`}
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Request Service Quotation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[11px] text-ink-muted font-[300]">
              Central London & Nationwide Dispatches · enquiries@tfts.co.uk
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
