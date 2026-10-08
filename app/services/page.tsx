import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSViewportMedia from "@/components/experience/TFTSViewportMedia";
import TFTSParallax from "@/components/experience/TFTSParallax";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";

export const metadata: Metadata = {
  title: "Specialist Capabilities & Practice Index | TFTS",
  description:
    "Exhaustive index of corporate investigations, OSINT, litigation support, asset tracing, and covert surveillance capabilities. London and UK-wide operations.",
  alternates: {
    canonical: getCanonicalUrl("/services"),
  },
};

export default function ServicesIndexPage() {
  const allServices = Object.values(servicesData);
  const corporateServices = allServices.filter((s) => s.category === "CORPORATE");
  const intelligenceServices = allServices.filter((s) => s.category === "INTELLIGENCE");
  const legalServices = allServices.filter((s) => s.category === "LEGAL");
  const fieldServices = allServices.filter((s) => s.category === "FIELD");

  const disciplines = [
    {
      number: "01",
      title: "Corporate Investigations",
      description:
        "Internal misconduct, corporate fraud, executive malfeasance, procurement manipulation, and commercial risk.",
      services: corporateServices,
      bannerImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85",
      bannerCaption: "Corporate headquarters review suites · London & international",
    },
    {
      number: "02",
      title: "Strategic Intelligence & OSINT",
      description:
        "Open-source intelligence, deep digital research, corporate profiling, and executive integrity vetting.",
      services: intelligenceServices,
      bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85",
      bannerCaption: "Digital footprint mapping & open source intelligence desk",
    },
    {
      number: "03",
      title: "Legal & Litigation Support",
      description:
        "CPR-compliant civil evidence gathering, witness proofs of evidence, and High Court dispute resolution.",
      services: legalServices,
      bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2400&q=85",
      bannerCaption: "Royal Courts of Justice · Chancery & Commercial Court litigation support",
    },
    {
      number: "04",
      title: "Field & Surveillance Operations",
      description:
        "Covert physical observation, operative deployment under strict legal necessity, and evidential recording.",
      services: fieldServices,
      bannerImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85",
      bannerCaption: "Mobile surveillance operations & urban reconnaissance",
    },
  ];

  return (
    <div className="bg-paper text-ink selection:bg-ink selection:text-paper">

      {/* ── 1. CINEMATIC MASTHEAD ── */}
      <section className="relative h-[65vh] overflow-hidden">
        <TFTSParallax speed={35} className="absolute inset-0">
          <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2800&q=90"
              alt="City of London financial district architecture — commercial capabilities directory"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ filter: "contrast(1.08) brightness(0.72) saturate(0.85)" }}
            />
          </TFTSImageReveal>
        </TFTSParallax>

        {/* Gradient fade to paper */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/30 to-black/40" />

        {/* Content bottom-anchored */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <TFTSTextReveal mode="lines">
            <div className="space-y-4 max-w-4xl">
              <span className="text-[11px] uppercase tracking-[0.22em] font-[300] text-paper/80 block">
                Practice Catalogue · 20 Specialist Capabilities
              </span>
              <h1 className="text-display-md lg:text-display-lg font-[200] tracking-tight leading-[1.02] text-paper/95">
                Investigative Capabilities &amp; Disciplines.
              </h1>
              <p className="text-base sm:text-lg text-paper/80 font-[300] leading-relaxed max-w-3xl">
                Every capability operates under strict British legal standards, Civil Procedure Rules, and absolute procedural integrity.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. DISCIPLINES MASTER CATALOGUE WITH SPATIAL BANNERS ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-28">
          {disciplines.map((disc, idx) => (
            <div key={disc.number} className="space-y-10">

              {/* Discipline Header Strip */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-rule gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-[300] text-brass tracking-[0.2em] uppercase">
                    DISCIPLINE {disc.number}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
                    {disc.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted max-w-md font-[300] leading-relaxed">
                  {disc.description}
                </p>
              </div>

              {/* Cinematic Discipline Plate */}
              <div className="relative aspect-[21/7] w-full overflow-hidden border border-rule/50">
                <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
                  <Image
                    src={disc.bannerImage}
                    alt={disc.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    className="object-cover"
                    style={{ filter: "contrast(1.08) brightness(0.8) saturate(0.85)" }}
                  />
                </TFTSImageReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-[10px] tracking-[0.2em] uppercase font-[300] text-warmWhite">
                  {disc.bannerCaption}
                </div>
              </div>

              {/* Pure Typographic Ledger */}
              <div className="divide-y divide-rule border-b border-rule">
                {disc.services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-paper-stone/50 px-2"
                  >
                    <div className="md:col-span-4 text-lg sm:text-xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                      {service.title}
                    </div>
                    <div className="md:col-span-7 text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
                      {service.summary}
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Special Feature: Process Serving */}
          <div className="border border-rule p-8 sm:p-12 bg-paper-stone flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.2em] font-[300] text-ink-muted block">
                Civil Procedure Rules · Part 6
              </span>
              <h3 className="text-2xl font-[200] text-ink">
                Specialist Legal Process Serving
              </h3>
              <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
                Nationwide service of statutory demands, bankruptcy petitions, claim forms, and freezing injunctions.
              </p>
            </div>
            <Link
              href="/services/process-serving"
              className="inline-flex items-center space-x-2 border border-ink px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none shrink-0"
            >
              <span>View Process Serving Hub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Confidential Intake Block */}
      <section className="py-20 border-t border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-baseline justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Bespoke Instruction
            </span>
            <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
              Cross-disciplinary inquiry or complex instruction?
            </h2>
            <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
              Many instructions require hybrid solutions bridging digital forensics, corporate due diligence, and mobile surveillance. We design tailored mandates to achieve definitive certainty.
            </p>
          </div>
          <div className="space-y-3 shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Initiate Confidential Instruction</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
