import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Binary, Scale, Eye, Lock, ShieldCheck } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";

export const metadata: Metadata = {
  title: "Specialist Capabilities & Practice Index | Private Intelligence Firm",
  description: "Exhaustive index of corporate investigations, OSINT, litigation support, asset tracing, and covert surveillance capabilities. London and UK-wide operations.",
  alternates: {
    canonical: "https://private-intelligence.co.uk/services",
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
      code: "ROOM I",
      title: "Corporate Investigations",
      icon: Building2,
      description: "Inquiries into internal misconduct, corporate fraud, supplier collusion, and commercial risk.",
      services: corporateServices,
    },
    {
      number: "02",
      code: "ROOM II",
      title: "Strategic Intelligence & OSINT",
      icon: Binary,
      description: "Finding what conventional searches miss through deep OSINT, asset tracing, and subject location.",
      services: intelligenceServices,
    },
    {
      number: "03",
      code: "ROOM III",
      title: "Legal & Litigation Support",
      icon: Scale,
      description: "CPR-compliant civil evidence gathering, witness proofs, and trial support for dispute counsel.",
      services: legalServices,
    },
    {
      number: "04",
      code: "ROOM IV",
      title: "Field & Surveillance Operations",
      icon: Eye,
      description: "Covert physical observation, mobile surveillance, and real-world activity verification.",
      services: fieldServices,
    },
  ];

  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Services Header */}
      <section className="py-24 md:py-32 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              PRACTICE TAXONOMY · 20 CORE CAPABILITIES
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Investigative Capabilities
            </h1>
            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              Every indexable capability operates under strict British legal standards, Civil Procedure Rules,
              and absolute discretion. We do not operate generic, one-size-fits-all investigation services.
            </p>
          </div>
        </div>
      </section>

      {/* Disciplines & Services Master Directory */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
          {disciplines.map((disc) => {
            const Icon = disc.icon;
            return (
              <div key={disc.number} className="space-y-8">
                {/* Discipline Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-oliveGrey gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-xs font-mono text-brass">
                      <span>{disc.code}</span>
                      <span className="text-oliveGrey">/</span>
                      <span className="text-stone-muted">DISCIPLINE {disc.number}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-light text-warmWhite font-serif">
                      {disc.title}
                    </h2>
                  </div>
                  <p className="text-xs text-stone max-w-md font-light leading-relaxed">
                    {disc.description}
                  </p>
                </div>

                {/* Services Grid for Discipline */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {disc.services.map((service) => (
                    <div
                      key={service.slug}
                      className="bg-obsidian-surface/60 border border-oliveGrey/80 hover:border-brass/70 p-8 rounded-xs flex flex-col justify-between group transition-all duration-300 shadow-etched"
                    >
                      <div className="space-y-4">
                        <span className="text-[10px] font-mono text-brass uppercase tracking-widest block">
                          SPECIFICATION {service.slug}
                        </span>
                        <h3 className="text-xl font-light text-warmWhite font-serif group-hover:text-warmWhite transition-colors">
                          <Link href={`/services/${service.slug}`}>
                            {service.title}
                          </Link>
                        </h3>
                        <p className="text-xs text-stone-muted leading-relaxed font-light">
                          {service.summary}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-oliveGrey/50 flex items-center justify-between">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-brass transition-colors"
                        >
                          <span>FULL BRIEF</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <span className="text-[10px] font-mono text-stone-dark uppercase">
                          UK · INTL
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Confidential Consultation Prompt */}
      <section className="py-20 border-t border-oliveGrey/70 bg-obsidian-pure">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif uppercase">
              Matter not listed or requiring cross-disciplinary inquiry?
            </h2>
            <p className="text-xs sm:text-sm text-stone font-light leading-relaxed">
              Many instructions involve hybrid requirements bridging digital forensics, corporate due diligence,
              and mobile surveillance. We design bespoke mandates to achieve certainty.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-3.5 text-xs tracking-widest uppercase font-medium rounded-xs shadow-etched"
              >
                <span>INITIATE CONFIDENTIAL CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
