import React from "react";
import Link from "next/link";
import { ProcessServingPageData } from "@/lib/data/processServingData";
import { getSiteUrl, BRAND_PREFERRED } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

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
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-rule">
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

          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                CPR Part 6 · Statutory Basis: {data.legalBasis}
              </span>
              <h1 className="text-display-xl font-[200] tracking-tight leading-[1.04] text-ink">
                {data.title}
              </h1>
              <p className="text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
                {data.subtitle}
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* 2. PROCEDURAL CONTEXT */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              The Procedural Imperative
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              When Delivery Cannot Fail
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.intro}</p>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.whatItIs}</p>
            <div className="border-t border-rule pt-4 space-y-2">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink block">
                Statutory Governance
              </span>
              <p className="text-xs font-[300] text-ink-muted leading-relaxed">{data.legalContext}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL PROTOCOL */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Methodology &amp; Rigour
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Operational Protocol
            </h2>
          </div>

          <div className="divide-y divide-rule">
            {data.ourApproach.map((step, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="md:col-span-4 text-xl font-[200] text-ink">
                    {step.heading}
                  </h3>
                  <p className="md:col-span-7 text-sm font-[300] text-ink-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DELIVERABLES */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Evidential Deliverables
            </span>
            <h2 className="text-2xl font-[200] text-ink tracking-tight">
              Certificate &amp; Affidavit of Service
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Court-ready proofs compliant with Civil Procedure Rule requirements.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-rule">
              {data.whatYouReceive.map((item, idx) => (
                <div key={idx} className="py-3 flex items-baseline gap-4">
                  <span className="text-xs font-[300] text-ink-muted shrink-0 w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-[300] text-ink-muted leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO INSTRUCTS */}
      <section className="py-12 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
          <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
            Instructed By
          </span>
          <div className="flex flex-wrap">
            {data.whoInstructs.map((who, idx) => (
              <span
                key={idx}
                className="text-xs font-[300] text-ink-muted border-r border-rule pr-4 mr-4 last:border-0 last:mr-0 mb-3"
              >
                {who}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Common Questions
            </span>
            <h2 className="text-2xl font-[200] text-ink tracking-tight">
              Frequently Asked
            </h2>
          </div>

          <div className="divide-y divide-rule max-w-4xl">
            {data.faqs.map((faq, idx) => (
              <div key={idx} className="py-6 space-y-2">
                <p className="text-sm font-[300] text-ink">{faq.q}</p>
                <p className="text-sm font-[300] text-ink-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RELATED + CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Related pages */}
          {data.relatedPages && data.relatedPages.length > 0 && (
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Related Services
              </span>
              <div className="divide-y divide-rule">
                {data.relatedPages.map((page, idx) => (
                  <Link
                    key={idx}
                    href={`/services/process-serving/${page.slug}`}
                    className="flex items-baseline justify-between py-4 text-sm font-[300] text-ink hover:text-ink-muted transition-colors group"
                  >
                    <span>{page.title}</span>
                    <span className="text-ink-muted font-[200] ml-4">&rarr;</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Urgent Service Request
            </span>
            <h2 className="text-2xl font-[200] text-ink tracking-tight">
              Instruct on {data.documentCategory}.
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Rapid scheduling across England &amp; Wales. Immediate confirmation upon execution.
            </p>
            <div className="space-y-4 pt-2">
              <Link
                href={`/confidential-enquiry?service=process-serving&matter=${encodeURIComponent(data.slug)}`}
                className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
              >
                Request Service Quotation
              </Link>
              <div className="text-[11px] text-ink-muted font-[300]">
                Central London &amp; Nationwide Dispatches · enquiries@tfts.co.uk
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
