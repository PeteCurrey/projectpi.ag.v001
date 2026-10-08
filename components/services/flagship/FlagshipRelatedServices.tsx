import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";

interface FlagshipRelatedServicesProps {
  relatedSlugs: string[];
  currentSlug: string;
}

export default function FlagshipRelatedServices({
  relatedSlugs,
  currentSlug,
}: FlagshipRelatedServicesProps) {
  // Contextual related list
  const relatedList = relatedSlugs
    .map((slug) => servicesData[slug])
    .filter((svc) => svc !== undefined);

  // Determine prev / next service in the catalogue
  const allSlugs = [
    "corporate-investigations",
    "corporate-fraud-investigations",
    "fraud-investigations",
    "employee-investigations",
    "due-diligence",
    "intelligence",
    "osint-investigations",
    "digital-investigations",
    "asset-tracing",
    "people-tracing",
    "background-investigations",
    "litigation-support",
    "evidence-gathering",
    "witness-enquiries",
    "private-surveillance",
    "covert-surveillance",
    "undercover-investigations",
    "insurance-investigations",
  ];
  const currentIndex = allSlugs.indexOf(currentSlug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : allSlugs[0];

  const prevService = servicesData[prevSlug];
  const nextService = servicesData[nextSlug];

  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-oliveGrey/50 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
              PRACTICE NETWORK · CROSS-DISCIPLINARY
            </span>
            <h2 className="text-3xl sm:text-4xl font-[300] text-warmWhite">
              Related Capabilities
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-mono tracking-widest uppercase text-stone-muted hover:text-brass transition-colors"
          >
            All Capabilities &rarr;
          </Link>
        </div>

        {/* Related Services Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedList.slice(0, 6).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="p-8 border border-oliveGrey/60 bg-obsidian/60 hover:bg-obsidian-surface/70 hover:border-brass/40 transition-all duration-300 rounded-xs flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-brass/70 tracking-widest uppercase block">
                  {service.category} · DISCIPLINE {service.disciplineNumber}
                </span>

                <h3 className="text-xl font-[200] text-warmWhite group-hover:text-brass transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-stone-muted leading-relaxed font-light line-clamp-3">
                  {service.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-oliveGrey/40 flex items-center justify-between text-xs font-mono text-stone group-hover:text-warmWhite">
                <span>SPECIFICATION</span>
                <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Previous / Next Service Pagination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-oliveGrey/50">
          {prevService && (
            <Link
              href={`/services/${prevService.slug}`}
              className="p-6 border border-oliveGrey/50 hover:border-brass/40 bg-obsidian/40 hover:bg-obsidian-surface/40 transition-all rounded-xs flex items-center space-x-4 group"
            >
              <ArrowLeft className="w-4 h-4 text-stone-muted group-hover:text-brass transition-colors group-hover:-translate-x-1" />
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase text-stone-muted tracking-widest block">
                  PREVIOUS CAPABILITY
                </span>
                <span className="text-sm font-[200] text-warmWhite group-hover:text-brass transition-colors">
                  {prevService.title}
                </span>
              </div>
            </Link>
          )}

          {nextService && (
            <Link
              href={`/services/${nextService.slug}`}
              className="p-6 border border-oliveGrey/50 hover:border-brass/40 bg-obsidian/40 hover:bg-obsidian-surface/40 transition-all rounded-xs flex items-center justify-between group text-right sm:text-right"
            >
              <div className="space-y-1 w-full text-left sm:text-right">
                <span className="text-[9px] font-mono uppercase text-stone-muted tracking-widest block">
                  NEXT CAPABILITY
                </span>
                <span className="text-sm font-[200] text-warmWhite group-hover:text-brass transition-colors">
                  {nextService.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-muted group-hover:text-brass transition-colors group-hover:translate-x-1 ml-4 flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
