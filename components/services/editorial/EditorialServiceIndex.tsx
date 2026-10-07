import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { servicesData } from "@/lib/data/servicesData";

interface EditorialServiceIndexProps {
  relatedSlugs: string[];
  currentSlug: string;
  variant?: "light" | "stone" | "dark";
}

export default function EditorialServiceIndex({
  relatedSlugs,
  currentSlug,
  variant = "stone",
}: EditorialServiceIndexProps) {
  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  const relatedList = relatedSlugs
    .map((slug) => servicesData[slug])
    .filter((svc) => svc !== undefined);

  // All 18 flagship services in sequence
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
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#D6D3CB] gap-4">
        <div className="space-y-2">
          <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
            PRACTICE NETWORK
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extralight tracking-tight ${headingTextClass}`}>
            Related Capabilities
          </h2>
        </div>
        <Link
          href="/services"
          className="text-xs tracking-[0.2em] uppercase font-light text-[#6F706A] hover:text-[#111111] transition-colors"
        >
          All Capabilities &rarr;
        </Link>
      </div>

      {/* Editorial Service Index Rows (Rule 16) */}
      <div className={`border-t ${ruleClass}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {relatedList.slice(0, 6).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className={`py-6 border-b ${ruleClass} group flex items-baseline justify-between transition-colors`}
            >
              <div className="space-y-1 pr-6">
                <span className={`text-[10px] tracking-widest uppercase font-light ${mutedTextClass} block`}>
                  {service.category}
                </span>
                <h3 className={`text-xl sm:text-2xl font-extralight ${headingTextClass} group-hover:text-[#A58A5C] transition-colors`}>
                  {service.title}
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-[#6F706A] group-hover:text-[#A58A5C] group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Previous / Next Service Pagination (Clean Typographic Links) */}
      <div className={`pt-8 border-t ${ruleClass} flex flex-col sm:flex-row items-center justify-between gap-6`}>
        {prevService && (
          <Link
            href={`/services/${prevService.slug}`}
            className="flex items-center space-x-3 text-xs tracking-[0.2em] uppercase font-light text-[#6F706A] hover:text-[#111111] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS: {prevService.title}</span>
          </Link>
        )}

        {nextService && (
          <Link
            href={`/services/${nextService.slug}`}
            className="flex items-center space-x-3 text-xs tracking-[0.2em] uppercase font-light text-[#6F706A] hover:text-[#111111] transition-colors group ml-auto"
          >
            <span>NEXT: {nextService.title}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
