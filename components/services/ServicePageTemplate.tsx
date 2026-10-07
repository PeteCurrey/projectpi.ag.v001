import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Lock, Check, HelpCircle, FileText, ArrowUpRight } from "lucide-react";
import { ServiceDetail } from "@/lib/data/servicesData";
import { getSiteUrl, BRAND_PREFERRED, TELEPHONE } from "@/lib/config/brand";

interface ServicePageTemplateProps {
  service: ServiceDetail;
}

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const siteUrl = getSiteUrl();

  // Schema.org structured data for this specific service
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

    "areaServed": "United Kingdom",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": service.whatWeInvestigate.capabilities.map((cap, idx) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": cap.name,
          "description": cap.detail
        }
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <article className="min-h-screen bg-obsidian text-warmWhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 01 HERO SECTION */}
      <section className="relative py-24 md:py-36 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb / Discipline Header */}
          <div className="flex items-center space-x-3 text-[11px] font-mono text-stone-muted tracking-widest uppercase mb-8">
            <Link href="/services" className="hover:text-warmWhite transition-colors">
              SERVICES
            </Link>
            <span className="text-oliveGrey">/</span>
            <span className="text-brass">DISCIPLINE {service.disciplineNumber} · {service.category}</span>
          </div>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight leading-[1.08] uppercase">
              {service.title}
            </h1>

            <p className="text-xl sm:text-2xl text-stone-light font-light leading-relaxed max-w-3xl">
              {service.heroProposition}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-muted">
              <div className="flex items-center space-x-2 bg-obsidian px-3 py-1.5 border border-oliveGrey/60 rounded-xs">
                <Lock className="w-3.5 h-3.5 text-brass" />
                <span>LEGAL PROFESSIONAL PRIVILEGE COMPATIBLE</span>
              </div>
              <div className="flex items-center space-x-2 bg-obsidian px-3 py-1.5 border border-oliveGrey/60 rounded-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-brass" />
                <span>PREPARED FOR LEGAL & COMMERCIAL CONTEXTS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 THE QUESTION */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
                02 · THE CIRCUMSTANCES
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
                {service.theQuestion.subtitle}
              </h2>
              <p className="text-sm text-stone font-light leading-relaxed">
                {service.theQuestion.description}
              </p>
            </div>

            <div className="lg:col-span-7 bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-muted block">
                COMMON INSTRUCTION SCENARIOS
              </span>
              <ul className="space-y-3.5">
                {service.theQuestion.scenarios.map((scen, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-light font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 flex-shrink-0" />
                    <span>{scen}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 WHAT WE INVESTIGATE */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              03 · DETAILED CAPABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
              What We Investigate
            </h2>
            <p className="text-sm text-stone font-light">
              {service.whatWeInvestigate.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.whatWeInvestigate.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-obsidian-surface/70 border border-oliveGrey/80 hover:border-brass/60 p-8 rounded-xs space-y-3 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono text-brass">0{idx + 1}</span>
                  <h3 className="text-lg font-light text-warmWhite tracking-wide">
                    {cap.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone leading-relaxed font-light">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 OUR APPROACH */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              04 · THE PROCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
              Our Investigative Approach
            </h2>
            <p className="text-sm text-stone font-light">
              {service.ourApproach.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.ourApproach.stages.map((stage) => (
              <div
                key={stage.step}
                className="bg-obsidian-surface/50 border border-oliveGrey/80 p-6 rounded-xs space-y-4"
              >
                <div className="text-xl font-mono text-brass font-light">
                  {stage.step}
                </div>
                <h3 className="text-base font-light text-warmWhite">
                  {stage.title}
                </h3>
                <p className="text-xs text-stone-muted leading-relaxed font-light">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 WHAT YOU RECEIVE */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
                05 · WORK PRODUCT & EVIDENCE
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
                What You Receive
              </h2>
              <p className="text-sm text-stone font-light leading-relaxed">
                We deliver structured, objective work product ready for immediate deployment
                by senior decision makers, barristers, and boards of directors.
              </p>
            </div>

            <div className="lg:col-span-7 bg-obsidian-surface/80 border border-brass/40 p-8 sm:p-10 rounded-xs space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                EVIDENTIARY DELIVERABLES BUNDLE
              </span>
              <div className="space-y-4">
                {service.whatYouReceive.items.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-warmWhite">
                    <Check className="w-4 h-4 text-brass mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 WHO WE WORK WITH */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              06 · CLIENT PROFILE
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
              Who We Work With
            </h2>
            <p className="text-sm text-stone font-light">
              {service.whoWeWorkWith.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whoWeWorkWith.clientTypes.map((client, idx) => (
              <div
                key={idx}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-brass">
                  PROFILE 0{idx + 1}
                </div>
                <h3 className="text-lg font-light text-warmWhite">
                  {client.title}
                </h3>
                <p className="text-xs text-stone leading-relaxed font-light">
                  {client.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 RELATED SERVICES */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-oliveGrey/60 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
                07 · CONNECTED CAPABILITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-warmWhite">
                Related Services
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-mono uppercase tracking-widest text-brass hover:text-warmWhite transition-colors"
            >
              View Full Practice Index →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.relatedServices.map((rel, idx) => (
              <Link
                key={idx}
                href={`/services/${rel.slug}`}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/70 p-6 rounded-xs group flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
                    {rel.discipline}
                  </span>
                  <h3 className="text-base font-light text-warmWhite group-hover:text-brass transition-colors">
                    {rel.title}
                  </h3>
                </div>
                <div className="pt-4 mt-4 border-t border-oliveGrey/40 flex items-center justify-between text-xs text-stone">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 08 FAQ SECTION */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
              08 · QUESTIONS & LEGAL CLARITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-warmWhite">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-stone font-light">
              Clear, transparent answers regarding statutory boundaries, evidentiary admissibility, and instructions.
            </p>
          </div>

          <div className="max-w-4xl space-y-6">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-obsidian-surface/60 border border-oliveGrey/80 p-8 rounded-xs space-y-3"
              >
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-4 h-4 text-brass mt-1 flex-shrink-0" />
                  <h3 className="text-base sm:text-lg font-light text-warmWhite">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-stone leading-relaxed font-light pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 CONFIDENTIAL ENQUIRY CTA (NEVER "GET A FREE QUOTE") */}
      <section className="py-24 md:py-36 bg-obsidian border-b border-oliveGrey/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="border border-brass/50 bg-obsidian-surface p-10 sm:p-14 lg:p-16 rounded-xs shadow-brassPlaque">
            <div className="max-w-3xl space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
                09 · CONFIDENTIAL INTAKE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight uppercase">
                Discuss the matter in confidence.
              </h2>
              <p className="text-stone text-sm sm:text-base font-light leading-relaxed">
                Every instruction regarding {service.title.toLowerCase()} is conducted under strict
                non-disclosure protocols. We evaluate urgency, assess evidentiary viability,
                and advise on the proportionate next steps.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-4 text-xs tracking-widest uppercase font-light transition-all duration-300 rounded-xs shadow-etched group"
                >
                  <span>BEGIN CONFIDENTIAL ENQUIRY</span>
                  <ArrowRight className="w-4 h-4 text-obsidian group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="text-xs font-mono text-stone-muted flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5 text-brass" />
                  <span>DISCREET RESPONSE WITHIN HOURS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
