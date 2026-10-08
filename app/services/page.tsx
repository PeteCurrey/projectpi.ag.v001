import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

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
    },
    {
      number: "02",
      title: "Strategic Intelligence & OSINT",
      description:
        "Open-source intelligence, deep digital research, corporate profiling, and executive integrity vetting.",
      services: intelligenceServices,
    },
    {
      number: "03",
      title: "Legal & Litigation Support",
      description:
        "CPR-compliant civil evidence gathering, witness proofs of evidence, and High Court dispute resolution.",
      services: legalServices,
    },
    {
      number: "04",
      title: "Field & Surveillance Operations",
      description:
        "Covert physical observation, operative deployment under strict legal necessity, and evidential recording.",
      services: fieldServices,
    },
  ];

  return (
    <div className="bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* Services Masthead */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <TFTSTextReveal mode="lines">
            <div className="space-y-6 max-w-4xl">
              <span className="text-[11px] uppercase tracking-[0.22em] font-[300] text-ink-muted block">
                Practice Catalogue · 20 Specialist Capabilities
              </span>
              <h1 className="text-display-md font-[200] tracking-tight leading-[1.04] text-ink">
                Investigative Capabilities &amp; Disciplines
              </h1>
              <p className="text-base sm:text-lg text-ink-muted font-[300] leading-relaxed max-w-3xl">
                Every capability operates under strict British legal standards, Civil Procedure Rules, and absolute procedural integrity. We design bespoke mandates to establish definitive facts.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* Disciplines Master Catalogue */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24">
          {disciplines.map((disc) => (
            <div key={disc.number} className="space-y-8">
              {/* Discipline Header */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between pb-6 border-b border-rule gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-[300] text-ink-muted">
                    DISCIPLINE {disc.number}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
                    {disc.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted max-w-md font-[300] leading-relaxed">
                  {disc.description}
                </p>
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
