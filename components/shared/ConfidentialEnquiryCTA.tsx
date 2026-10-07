"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ConfidentialEnquiryCTAProps {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  origin?: string; // for pre-populating the enquiry form
  variant?: "dark" | "light";
}

export default function ConfidentialEnquiryCTA({
  heading = "BEGIN A CONFIDENTIAL ENQUIRY",
  body = "Instructions are received in confidence. All initial enquiries are without obligation.",
  ctaLabel = "BEGIN A CONFIDENTIAL ENQUIRY",
  origin,
  variant = "dark",
}: ConfidentialEnquiryCTAProps) {
  const href = origin
    ? `/confidential-enquiry?from=${encodeURIComponent(origin)}`
    : "/confidential-enquiry";

  if (variant === "light") {
    return (
      <section className="border border-stone/20 bg-obsidian-surface/40 px-8 py-10 md:px-12 md:py-14">
        <div className="max-w-2xl">
          <p className="font-light text-2xl text-warmWhite leading-snug mb-3">
            {heading}
          </p>
          <p className="text-stone text-sm leading-relaxed mb-8">{body}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-light px-7 py-4 hover:bg-brass/90 transition-colors"
          >
            {ctaLabel}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-obsidian border-t border-stone/10 px-8 py-16 md:px-16 md:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-px h-12 bg-brass mx-auto mb-10" />
        <h2 className="font-light text-3xl md:text-4xl text-warmWhite leading-tight mb-5">
          {heading}
        </h2>
        <p className="text-stone text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
          {body}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-3 bg-brass text-obsidian text-xs tracking-widest uppercase font-light px-9 py-5 hover:bg-brass/90 transition-colors"
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <p className="text-stone/40 text-xs mt-8 tracking-wider uppercase">
          All enquiries handled in strict confidence
        </p>
      </div>
    </section>
  );
}
