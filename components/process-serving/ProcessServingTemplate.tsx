import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Scale, FileText, CheckCircle2 } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import FAQSection from "@/components/shared/FAQSection";
import ConfidentialEnquiryCTA from "@/components/shared/ConfidentialEnquiryCTA";
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
    <div className="bg-obsidian min-h-screen text-warmWhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-oliveGrey/70 relative overflow-hidden bg-gradient-to-b from-obsidian-surface/60 to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <Breadcrumbs
            items={[
              { label: "SERVICES", href: "/services" },
              { label: "PROCESS SERVING", href: "/services/process-serving" },
              { label: data.documentCategory.toUpperCase() },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 border border-brass/30 px-3 py-1">
                {data.documentCategory}
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-stone-muted">
                STATUTORY BASIS: {data.legalBasis}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-warmWhite leading-[1.15]">
              {data.title}
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-light max-w-3xl leading-relaxed">
              {data.subtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/confidential-enquiry?service=process-serving&matter=${encodeURIComponent(data.slug)}`}
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                REQUEST AN INSTRUCTION QUOTE
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/services/process-serving"
                className="inline-flex items-center gap-2 border border-oliveGrey/80 hover:border-brass/60 text-stone-light text-xs tracking-widest uppercase px-6 py-4 transition-colors"
              >
                ALL PROCESS SERVING SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Accreditations Strip */}
      <TrustStrip />

      {/* Main Narrative & Legal Architecture */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* The Purpose / Context */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                01 · THE PROCEDURAL IMPERATIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                When Delivery Cannot Fail
              </h2>
              <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
                {data.intro}
              </p>
              <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
                {data.whatItIs}
              </p>
            </div>

            {/* Legal / Statutory Context */}
            <div className="p-8 bg-obsidian-surface/60 border border-oliveGrey/80 space-y-4">
              <div className="flex items-center gap-2 text-brass">
                <Scale className="w-4 h-4" />
                <span className="text-[11px] font-mono tracking-wider uppercase font-medium">
                  Statutory & Procedural Governance
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone leading-relaxed font-light">
                {data.legalContext}
              </p>
            </div>

            {/* Step-by-Step Approach */}
            <div className="space-y-8">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                02 · METHODOLOGY & RIGOUR
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Operational Protocol
              </h2>
              <div className="space-y-6">
                {data.ourApproach.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-obsidian-surface/30 border border-oliveGrey/50 flex flex-col sm:flex-row gap-4 sm:gap-6"
                  >
                    <span className="text-xs font-mono text-brass shrink-0 sm:pt-0.5">
                      STAGE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-base font-serif text-warmWhite">
                        {step.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-muted leading-relaxed font-light">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                03 · WHAT YOU RECEIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Evidential Output
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.whatYouReceive.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-obsidian-surface/40 border border-oliveGrey/40"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-light font-light leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Instruction Box */}
            <div className="p-6 sm:p-8 bg-obsidian-surface border border-brass/40 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-brass uppercase tracking-ultra block">
                  INSTRUCTION PORTAL
                </span>
                <h3 className="text-xl font-serif text-warmWhite">
                  Instruct On This Matter
                </h3>
                <p className="text-xs text-stone-muted font-light leading-relaxed">
                  Rapid quotation and intake for solicitors, insolvency practitioners, and corporate clients.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-stone-light border-y border-oliveGrey/60 py-4">
                <div className="flex justify-between">
                  <span className="text-stone-muted">SERVICE LEVEL:</span>
                  <span className="text-warmWhite font-medium">Standard or Urgent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">COVERAGE:</span>
                  <span className="text-warmWhite font-medium">England & Wales</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">EVIDENCE:</span>
                  <span className="text-warmWhite font-medium">Proof of Service</span>
                </div>
              </div>

              <Link
                href={`/confidential-enquiry?service=process-serving&matter=${encodeURIComponent(data.slug)}`}
                className="block text-center bg-brass text-obsidian text-xs tracking-widest uppercase font-medium py-3.5 hover:bg-brass/90 transition-colors"
              >
                BEGIN CONFIDENTIAL INSTRUCTION
              </Link>
            </div>

            {/* Who Instructs Box */}
            <div className="p-6 bg-obsidian-surface/40 border border-oliveGrey/60 space-y-4">
              <div className="flex items-center gap-2 text-stone-light">
                <FileText className="w-4 h-4 text-brass" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-warmWhite">
                  Instructing Bodies
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-stone-muted font-light">
                {data.whoInstructs.map((client, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-brass rounded-full" />
                    <span>{client}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Process Services */}
            <div className="p-6 bg-obsidian-surface/40 border border-oliveGrey/60 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-warmWhite">
                Related Process Services
              </h4>
              <div className="space-y-2">
                {data.relatedPages.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={`/services/process-serving/${rel.slug}`}
                    className="group flex items-center justify-between text-xs text-stone-light hover:text-brass py-2 border-b border-oliveGrey/30 last:border-0 transition-colors"
                  >
                    <span>{rel.title}</span>
                    <ArrowRight className="w-3 h-3 text-stone-muted group-hover:text-brass transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={data.faqs} />

      {/* Global Call to Action */}
      <ConfidentialEnquiryCTA
        heading={`INSTRUCT ON ${data.documentCategory.toUpperCase()}`}
        body="Submit your documents or instructions securely. A specialist case director will confirm receipt and schedule service."
        origin={`/services/process-serving/${data.slug}`}
      />
    </div>
  );
}
