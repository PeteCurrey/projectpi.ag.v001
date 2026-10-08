"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EditorialImageItem } from "@/lib/data/editorialImagesData";

interface EditorialHeroProps {
  categoryLabel: string;
  displayHeadline: string;
  subProposition: string;
  serviceSlug: string;
  heroImage: EditorialImageItem;
}

export default function EditorialHero({
  categoryLabel,
  displayHeadline,
  subProposition,
  serviceSlug,
  heroImage,
}: EditorialHeroProps) {
  return (
    <section className="bg-[#F5F3EE] text-[#111111] pt-12 md:pt-20 pb-16 md:pb-24 border-b border-[#D6D3CB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Meta Line: Clean Service Category (Rule 08, 11) */}
        <div className="flex items-center justify-between pb-8 md:pb-12 border-b border-[#D6D3CB]">
          <span className="text-xs tracking-[0.25em] uppercase font-light text-[#6F706A]">
            {categoryLabel}
          </span>
          <nav aria-label="Breadcrumb" className="text-xs tracking-[0.2em] uppercase font-light text-[#6F706A]">
            <Link href="/services" className="hover:text-[#111111] transition-colors">
              SERVICES
            </Link>
          </nav>
        </div>

        {/* Main Editorial Proposition Block */}
        <div className="py-12 md:py-20 max-w-5xl space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-[1.05] text-[#111111] uppercase">
            {displayHeadline}
          </h1>

          <p className="text-lg sm:text-xl font-light text-[#6F706A] leading-relaxed max-w-3xl">
            {subProposition}
          </p>

          <div className="pt-4">
            <Link
              href={`/confidential-enquiry?service=${encodeURIComponent(serviceSlug)}`}
              className="inline-flex items-center space-x-3 text-xs tracking-[0.22em] uppercase font-light text-[#111111] hover:text-[#A58A5C] border-b border-[#111111] hover:border-[#A58A5C] pb-1.5 transition-colors group"
            >
              <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111111] group-hover:text-[#A58A5C] group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>

        {/* Major Editorial Image Composition (Rule 08, 09) */}
        <div className="mt-8 relative w-full h-[50vh] sm:h-[65vh] lg:h-[75vh] overflow-hidden bg-[#E8E5DE]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center contrast-105"
          />
        </div>

        {/* Image Caption */}
        {heroImage.caption && (
          <div className="pt-3 text-[11px] font-light tracking-wide text-[#6F706A]">
            {heroImage.caption}
          </div>
        )}
      </div>
    </section>
  );
}
