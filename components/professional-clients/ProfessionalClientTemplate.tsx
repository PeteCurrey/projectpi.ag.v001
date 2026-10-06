import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import FAQSection from "@/components/shared/FAQSection";
import ConfidentialEnquiryCTA from "@/components/shared/ConfidentialEnquiryCTA";
import { ProfessionalClientPage } from "@/lib/data/professionalClientsData";

interface ProfessionalClientTemplateProps {
  data: ProfessionalClientPage;
}

export default function ProfessionalClientTemplate({ data }: ProfessionalClientTemplateProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${data.headline} | Private Intelligence`,
    description: data.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "Private Intelligence & Investigations",
      url: "https://private-intelligence.co.uk",
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
              { label: "PROFESSIONAL CLIENTS", href: "/professional-clients" },
              { label: data.clientType.toUpperCase() },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 border border-brass/30 px-3 py-1 inline-block">
              INSTITUTIONAL CLIENT PARTNERSHIP
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-warmWhite leading-[1.15]">
              {data.headline}
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-light max-w-3xl leading-relaxed">
              {data.subheadline}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href={`/confidential-enquiry?clientType=${encodeURIComponent(data.slug)}`}
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                {data.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/professional-clients"
                className="inline-flex items-center gap-2 border border-oliveGrey/80 hover:border-brass/60 text-stone-light text-xs tracking-widest uppercase px-6 py-4 transition-colors"
              >
                ALL PROFESSIONAL DISCIPLINES
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Content Body */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-8 space-y-16">
            {/* Intro Narrative */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                01 · THE PROFESSIONAL MANDATE
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Context & Operational Need
              </h2>
              <p className="text-stone-light text-sm sm:text-base leading-relaxed font-light">
                {data.intro}
              </p>
              <p className="text-stone-muted text-xs sm:text-sm leading-relaxed font-light">
                {data.context}
              </p>
            </div>

            {/* Services Utilised */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                02 · PRIMARY ENGAGEMENT DISCIPLINES
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Tailored Services for {data.clientType}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.servicesUsed.map((srv, idx) => (
                  <Link
                    key={idx}
                    href={srv.slug}
                    className="p-6 bg-obsidian-surface/50 border border-oliveGrey/60 hover:border-brass/60 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-brass">
                          SERVICE {String(idx + 1).padStart(2, "0")}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-muted group-hover:text-brass transition-colors" />
                      </div>
                      <h3 className="text-lg font-serif text-warmWhite group-hover:text-brass transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-stone-muted font-light leading-relaxed">
                        {srv.body}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* How We Work */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                03 · GOVERNANCE & METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                Engagement Framework
              </h2>
              <div className="p-8 bg-obsidian-surface/60 border border-oliveGrey/80">
                <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-light">
                  {data.howWeWork}
                </p>
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
                04 · REPORTING & EVIDENTIARY STANDARDS
              </span>
              <h2 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
                What You Receive
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
            <div className="p-6 sm:p-8 bg-obsidian-surface border border-brass/40 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-brass uppercase tracking-ultra block">
                  PROFESSIONAL DESK
                </span>
                <h3 className="text-xl font-serif text-warmWhite">
                  Instruct Our Practice
                </h3>
                <p className="text-xs text-stone-muted font-light leading-relaxed">
                  Confidential briefing for {data.clientType.toLowerCase()}. We sign NDAs and provide immediate case analysis.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs font-mono text-stone-light border-y border-oliveGrey/60 py-4">
                <div className="flex justify-between">
                  <span className="text-stone-muted">ENGAGEMENT:</span>
                  <span className="text-warmWhite font-medium">Direct or Sub-Agency</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">COMPLIANCE:</span>
                  <span className="text-warmWhite font-medium">CPR & DPA 2018</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-muted">PRIVILEGE:</span>
                  <span className="text-warmWhite font-medium">Litigation Structure</span>
                </div>
              </div>

              <Link
                href={`/confidential-enquiry?clientType=${encodeURIComponent(data.slug)}`}
                className="block text-center bg-brass text-obsidian text-xs tracking-widest uppercase font-medium py-3.5 hover:bg-brass/90 transition-colors"
              >
                BEGIN CONFIDENTIAL INSTRUCTION
              </Link>
            </div>

            <div className="p-6 bg-obsidian-surface/40 border border-oliveGrey/60 space-y-4">
              <div className="flex items-center gap-2 text-stone-light">
                <FileText className="w-4 h-4 text-brass" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-warmWhite">
                  Sector Verification
                </h4>
              </div>
              <p className="text-xs text-stone-muted font-light leading-relaxed">
                We accept instructions strictly from verified professional practices, corporate entities, regulated firms, or vetted private clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={data.faqs} />

      {/* CTA */}
      <ConfidentialEnquiryCTA
        heading={`INSTRUCT US FOR ${data.clientType.toUpperCase()}`}
        body="Submit your matter confidentially. A partner or case director will contact you promptly."
        origin={`/professional-clients/${data.slug}`}
      />
    </div>
  );
}
