import React from "react";
import Link from "next/link";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

interface LocationPageData {
  slug: string;
  cityName: string;
  regionName: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subheadline: string;
  coverageAreas: string[];
  intro: string;
  context: string;
  capabilities: { title: string; body: string }[];
  schema: {
    "@type": string;
    name: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    areaServed: string;
  };
}

interface LocationPageTemplateProps {
  data: LocationPageData;
}

export default function LocationPageTemplate({ data }: LocationPageTemplateProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.schema.name,
    description: data.metaDescription,
    telephone: "+44 (0) 20 7946 0912",
    address: {
      "@type": "PostalAddress",
      addressLocality: data.schema.addressLocality,
      addressRegion: data.schema.addressRegion,
      addressCountry: data.schema.addressCountry,
    },
    areaServed: data.schema.areaServed,
    priceRange: "£££",
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
            <span className="text-ink">{data.cityName}</span>
          </div>

          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Regional Jurisdiction · {data.regionName}
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

      {/* 2. JURISDICTION CONTEXT */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Jurisdiction
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Court Proceedings in {data.cityName}
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6">
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.intro}</p>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">{data.context}</p>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL CAPABILITY */}
      <section className="py-20 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Local Operational Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Deployment across {data.cityName}
            </h2>
          </div>

          <div className="divide-y divide-rule">
            {data.capabilities.map((cap, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                  <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="md:col-span-4 text-xl font-[200] text-ink">
                    {cap.title}
                  </h3>
                  <p className="md:col-span-7 text-sm font-[300] text-ink-muted leading-relaxed">
                    {cap.body}
                  </p>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TERRITORIAL COVERAGE */}
      <section className="py-16 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Territorial Scope
            </span>
            <h2 className="text-xl font-[200] text-ink tracking-tight">
              Districts &amp; Areas Served
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0">
            {data.coverageAreas.map((area, idx) => (
              <div key={idx} className="border-b border-rule py-2 text-xs font-[300] text-ink">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Urgent Service Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight">
              Instruct a process server in {data.cityName}.
            </h2>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Same-day process serving across {data.cityName} and {data.regionName}. CPR-compliant proofs of service guaranteed.
            </p>
            <div className="space-y-4 pt-2">
              <Link
                href={`/confidential-enquiry?service=process-serving&location=${encodeURIComponent(data.cityName)}`}
                className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
              >
                Request Service Quotation
              </Link>
              <div className="text-[11px] text-ink-muted font-[300]">
                Regional Operations Desk · enquiries@tfts.co.uk
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
