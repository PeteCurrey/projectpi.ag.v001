import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import ConfidentialEnquiryCTA from "@/components/shared/ConfidentialEnquiryCTA";
import { professionalClientsHub } from "@/lib/data/professionalClientsData";

export const metadata: Metadata = {
  title: professionalClientsHub.metaTitle,
  description: professionalClientsHub.metaDescription,
};

export default function ProfessionalClientsHubPage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface/60 to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <Breadcrumbs items={[{ label: "PROFESSIONAL CLIENTS" }]} />

          <div className="max-w-4xl space-y-6">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 border border-brass/30 px-3 py-1 inline-block">
              INSTITUTIONAL & LEGAL SECTORS
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light font-serif text-warmWhite leading-[1.15]">
              {professionalClientsHub.headline}
            </h1>

            <p className="text-base sm:text-xl font-light text-stone-light max-w-3xl leading-relaxed">
              {professionalClientsHub.intro}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/confidential-enquiry"
                className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-8 py-4 hover:bg-brass/90 transition-colors"
              >
                BEGIN A CONFIDENTIAL ENQUIRY
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Sectors Grid */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            CLIENT DIRECTORY
          </span>
          <h2 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
            Select Your Practice Area or Entity
          </h2>
          <p className="text-stone-muted text-xs sm:text-sm font-light">
            We operate seamlessly alongside solicitors, corporate leadership, fraud investigators, and investment committees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalClientsHub.sectors.map((sector, idx) => (
            <Link
              key={idx}
              href={`/professional-clients/${sector.slug}`}
              className="group p-8 bg-obsidian-surface/60 border border-oliveGrey/70 hover:border-brass/70 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl">{sector.icon}</span>
                  <ArrowRight className="w-4 h-4 text-stone-muted group-hover:text-brass transition-colors group-hover:translate-x-1 duration-200" />
                </div>
                <h3 className="text-xl font-serif text-warmWhite group-hover:text-brass transition-colors">
                  {sector.title}
                </h3>
              </div>

              <div className="pt-6 mt-6 border-t border-oliveGrey/40 flex items-center justify-between text-[11px] font-mono text-stone-muted group-hover:text-warmWhite">
                <span>VIEW ENGAGEMENT MODEL</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ConfidentialEnquiryCTA
        heading="ENGAGE OUR FIRM PROFESSIONALLY"
        body="Whether a single urgent service or complex contentious litigation support, our team delivers complete certainty."
        origin="/professional-clients"
      />
    </div>
  );
}
