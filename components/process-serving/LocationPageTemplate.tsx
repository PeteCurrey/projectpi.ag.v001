import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, CheckCircle2, ShieldCheck, Scale, FileText } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import ConfidentialEnquiryCTA from "@/components/shared/ConfidentialEnquiryCTA";

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
    <div className="bg-obsidian min-h-screen text-warmWhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface/60 to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <Breadcrumbs
            items={[
              { label: "SERVICES", href: "/services" },
              { label: "PROCESS SERVING", href: "/services/process-serving" },
              { label: `${data.cityName.toUpperCase()} PROCESS SERVER` },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2 text-brass">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-ultra uppercase">
                {data.regionName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-warmWhite leading-[1.15]">
              {data.headline}
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-light max-w-3xl leading-relaxed">
              {data.subheadline}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/confidential-enquiry?service=process-serving&location=${encodeURIComponent(data.cityName)}`}
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                REQUEST AN INSTRUCTION QUOTE
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Main Body */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* Regional Legal Context */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                01 · REGIONAL JURISDICTION & LITIGATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Court Proceedings in {data.cityName}
              </h2>
              <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
                {data.intro}
              </p>
              <p className="text-stone-muted text-xs sm:text-sm leading-relaxed font-light">
                {data.context}
              </p>
            </div>

            {/* Regional Capabilities */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                02 · LOCAL OPERATIONAL CAPABILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Deployment in {data.cityName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {data.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-obsidian-surface/50 border border-oliveGrey/60 space-y-3"
                  >
                    <h3 className="text-base font-serif text-warmWhite">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-stone-muted font-light leading-relaxed">
                      {cap.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage Areas */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                03 · TERRITORIAL COVERAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Districts & Surrounding Postcodes Served
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.coverageAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-obsidian-surface/30 border border-oliveGrey/40 text-[11px] font-mono text-stone-light flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-brass rounded-full" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="p-6 sm:p-8 bg-obsidian-surface border border-brass/40 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-brass uppercase tracking-ultra block">
                  REGIONAL DESK
                </span>
                <h3 className="text-xl font-serif text-warmWhite">
                  Instruct in {data.cityName}
                </h3>
                <p className="text-xs text-stone-muted font-light leading-relaxed">
                  Same-day process serving across {data.cityName} and {data.regionName}. CPR-compliant proof of service guaranteed.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-stone-light border-y border-oliveGrey/60 py-4">
                <div className="flex justify-between">
                  <span className="text-stone-muted">JURISDICTION:</span>
                  <span className="text-warmWhite font-medium">{data.cityName} Courts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">URGENT SERVICE:</span>
                  <span className="text-warmWhite font-medium">Available Same-Day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">EVIDENCE:</span>
                  <span className="text-warmWhite font-medium">Affidavit / Certificate</span>
                </div>
              </div>

              <Link
                href={`/confidential-enquiry?service=process-serving&location=${encodeURIComponent(data.cityName)}`}
                className="block text-center bg-brass text-obsidian text-xs tracking-widest uppercase font-medium py-3.5 hover:bg-brass/90 transition-colors"
              >
                BEGIN CONFIDENTIAL INSTRUCTION
              </Link>
            </div>

            <div className="p-6 bg-obsidian-surface/40 border border-oliveGrey/60 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-warmWhite">
                Common Matters Served in {data.cityName}
              </h4>
              <ul className="space-y-2 text-xs text-stone-muted font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-brass rounded-full" />
                  <span>Statutory Demands (Individuals & Companies)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-brass rounded-full" />
                  <span>Bankruptcy & Winding-Up Petitions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-brass rounded-full" />
                  <span>High Court & County Court Claim Forms</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-brass rounded-full" />
                  <span>Emergency Injunctions & Freezing Orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-brass rounded-full" />
                  <span>Substituted Service Supporting Evidence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ConfidentialEnquiryCTA
        heading={`INSTRUCT A PROCESS SERVER IN ${data.cityName.toUpperCase()}`}
        body={`Urgent and scheduled process serving throughout ${data.cityName} and the surrounding region.`}
        origin={`/process-server/${data.slug}`}
      />
    </div>
  );
}
