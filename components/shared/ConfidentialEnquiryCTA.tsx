"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ConfidentialEnquiryCTAProps {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  origin?: string;
  variant?: "dark" | "light";
}

export default function ConfidentialEnquiryCTA({
  heading = "BEGIN A CONFIDENTIAL ENQUIRY",
  body = "Instructions are received in confidence. All initial enquiries are without obligation.",
  ctaLabel = "BEGIN A CONFIDENTIAL ENQUIRY",
  origin,
}: ConfidentialEnquiryCTAProps) {
  const href = origin
    ? `/confidential-enquiry?from=${encodeURIComponent(origin)}`
    : "/confidential-enquiry";

  return (
    <section className="bg-paper-stone border-t border-rule px-6 py-20 lg:px-12 lg:py-28 text-ink">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between gap-8">
        <div className="max-w-xl space-y-3">
          <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
            Direct Consultation
          </span>
          <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
            {heading}
          </h2>
          <p className="text-xs sm:text-sm font-[300] text-ink-muted leading-relaxed">
            {body}
          </p>
        </div>
        <div className="space-y-4 shrink-0">
          <Link
            href={href}
            className="inline-flex items-center space-x-2 border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <div className="text-[11px] text-ink-muted font-[300]">
            Mayfair Consulting Suite · enquiries@tfts.co.uk
          </div>
        </div>
      </div>
    </section>
  );
}
