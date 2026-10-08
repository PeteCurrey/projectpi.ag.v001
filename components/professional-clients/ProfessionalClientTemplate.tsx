import React from "react";
import Link from "next/link";
import { ProfessionalClientPage } from "@/lib/data/professionalClientsData";
import { getSiteUrl, BRAND_PREFERRED } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

interface ProfessionalClientTemplateProps {
  data: ProfessionalClientPage;
}

export default function ProfessionalClientTemplate({ data }: ProfessionalClientTemplateProps) {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.headline} | TFTS`,
    description: data.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_PREFERRED,
      url: siteUrl,
    },
    areaServed: "United Kingdom",
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
            <Link href="/professional-clients" className="hover:text-ink transition-colors">
              Professional Clients
            </Link>
            <span>/</span>
            <span className="text-ink">{data.clientType}</span>
          </div>

          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Institutional Partnership · {data.clientType}
              </span>
              <h1 className="text-display-xl font-[200] tracking-tight leading-[1.04] text-ink">
                {data.headline}
              </h1>
              <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
                {data.subheadline}
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* 2. MANDATE CONTEXT */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              The Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Operational Scope &amp; Legal Context
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.intro}</p>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.context}</p>
          </div>
        </div>
      </section>

      {/* 3. ENGAGEMENT DISCIPLINES */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Engagement Disciplines
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Tailored Services for {data.clientType}
            </h2>
          </div>

          <div className="divide-y divide-rule">
            {data.servicesUsed.map((srv, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group">
                  <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="md:col-span-4">
                    <Link
                      href={srv.slug}
                      className="text-xl font-[200] text-ink group-hover:text-ink-muted transition-colors"
                    >
                      {srv.title}
                    </Link>
                  </div>
                  <p className="md:col-span-6 text-sm font-[300] text-ink-muted leading-relaxed">
                    {srv.body}
                  </p>
                  <div className="md:col-span-1 text-right">
                    <Link
                      href={srv.slug}
                      className="text-sm font-[200] text-ink-muted hover:text-ink transition-colors"
                      aria-label={`View ${srv.title}`}
                    >
                      &rarr;
                    </Link>
                  </div>
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
              Engagement Framework
            </span>
            <h2 className="text-2xl font-[200] text-ink tracking-tight">
              Reporting &amp; Evidentiary Standards
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              {data.howWeWork}
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

      {/* 5. CTA */}
      <section className="py-20 bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Confidential Instruction
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Instruct our practice for {data.clientType}.
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Direct consultation with practice partners. Initial assessment under mutual non-disclosure.
            </p>
            <div className="space-y-4 pt-2">
              <Link
                href={`/confidential-enquiry?clientType=${encodeURIComponent(data.slug)}`}
                className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
              >
                {data.cta || "Begin Confidential Instruction"}
              </Link>
              <div className="text-[11px] text-ink-muted font-[300]">
                Mayfair Consulting Suite · enquiries@tfts.co.uk
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
