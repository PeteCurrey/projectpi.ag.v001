import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck, Scale, ShieldCheck, MapPin, Clock } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import ConfidentialEnquiryCTA from "@/components/shared/ConfidentialEnquiryCTA";
import { processServingHub } from "@/lib/data/processServingData";

export const metadata: Metadata = {
  title: processServingHub.metaTitle,
  description: processServingHub.metaDescription,
};

export default function ProcessServingHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TFTS Process Serving UK",
    description: processServingHub.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "TFTS — Tactical Field Intelligence Service",
      url: "https://tfts.co.uk",
    },
    areaServed: "United Kingdom",
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
              { label: "PROCESS SERVING" },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 border border-brass/30 px-3 py-1 inline-block">
              COMMERCIAL LEGAL VERTICAL
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-warmWhite leading-[1.15]">
              Process Serving Division
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-light max-w-3xl leading-relaxed">
              {processServingHub.intro}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/confidential-enquiry?service=process-serving"
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                REQUEST AN INSTRUCTION QUOTE
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#documents"
                className="inline-flex items-center gap-2 border border-oliveGrey/80 hover:border-brass/60 text-stone-light text-xs tracking-widest uppercase px-6 py-4 transition-colors"
              >
                EXPLORE DOCUMENT TYPES
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Strategic Positioning */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
              PRECISION LITIGATION SUPPORT
            </span>
            <h2 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
              When Service Cannot Fail
            </h2>
            <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
              {processServingHub.position}
            </p>
            <p className="text-stone-muted text-xs sm:text-sm leading-relaxed font-light">
              Under Civil Procedure Rules Part 6 and the Insolvency Rules 2016, technical defects in service can cause fatal procedural delays, invalidation of statutory demands, and substantial wasted cost orders. We provide immediate, auditable, and unassailable evidence of service across London and the UK.
            </p>
          </div>

          <div className="lg:col-span-5 bg-obsidian-surface border border-oliveGrey/70 p-8 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-ultra text-brass">
              OPERATIONAL GUARANTEES
            </h3>
            <ul className="space-y-3">
              {processServingHub.trustPoints.map((tp, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-light font-light">
                  <span className="w-1.5 h-1.5 bg-brass rounded-full mt-1.5 shrink-0" />
                  <span>{tp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Document Types Cluster */}
      <section id="documents" className="py-20 bg-obsidian-surface/30 border-t border-oliveGrey/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
              DOCUMENT CLUSTERS & WORKFLOWS
            </span>
            <h2 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
              Specialist Service Categories
            </h2>
            <p className="text-stone-muted text-xs sm:text-sm font-light">
              Each document type adheres to specific statutory requirements and evidentiary thresholds. Select your matter requirement below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processServingHub.documentTypes.map((doc, idx) => (
              <Link
                key={idx}
                href={`/services/process-serving/${doc.slug}`}
                className="group p-8 bg-obsidian-surface/60 border border-oliveGrey/70 hover:border-brass/70 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-brass tracking-wider">
                      DOC {String(idx + 1).padStart(2, "0")}
                    </span>
                    <ArrowRight className="w-4 h-4 text-stone-muted group-hover:text-brass transition-colors group-hover:translate-x-1 duration-200" />
                  </div>
                  <h3 className="text-xl font-serif text-warmWhite group-hover:text-brass transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-stone-muted leading-relaxed font-light">
                    {doc.body}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-oliveGrey/40 flex items-center justify-between text-[11px] font-mono text-stone-muted group-hover:text-warmWhite">
                  <span>VIEW SPECIFICATION</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Geographical Hubs */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            REGIONAL CENTRES & COURT JURISDICTIONS
          </span>
          <h2 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
            Key Regional Process Serving Hubs
          </h2>
          <p className="text-stone-muted text-xs sm:text-sm font-light">
            Dedicated field coverage across the major Business & Property Courts centres of England and Wales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              city: "London",
              slug: "london",
              desc: "Rolls Building, Royal Courts of Justice, Chancery Lane, Greater London.",
            },
            {
              city: "Manchester",
              slug: "manchester",
              desc: "Business & Property Courts Manchester, Greater Manchester, Cheshire.",
            },
            {
              city: "Birmingham",
              slug: "birmingham",
              desc: "BPC Birmingham, West Midlands, Coventry, Black Country.",
            },
            {
              city: "Leeds",
              slug: "leeds",
              desc: "BPC Leeds, West Yorkshire, Bradford, Harrogate, York.",
            },
          ].map((loc, idx) => (
            <Link
              key={idx}
              href={`/process-server/${loc.slug}`}
              className="group p-6 bg-obsidian-surface/40 border border-oliveGrey/60 hover:border-brass/70 transition-all space-y-3"
            >
              <div className="flex items-center gap-2 text-brass">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider">
                  REGIONAL JURISDICTION
                </span>
              </div>
              <h3 className="text-lg font-serif text-warmWhite group-hover:text-brass transition-colors">
                {loc.city} Process Server
              </h3>
              <p className="text-xs text-stone-muted font-light leading-relaxed">
                {loc.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ConfidentialEnquiryCTA
        heading="INSTRUCT OUR PROCESS SERVING DIVISION"
        body="Submit your documents with complete confidence. Same-day emergency attendance available."
        origin="/services/process-serving"
      />
    </div>
  );
}
