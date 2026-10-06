import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustStrip from "@/components/shared/TrustStrip";
import ConfidentialEnquiryWorkflow from "@/components/enquiry/ConfidentialEnquiryWorkflow";

import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Begin a Confidential Enquiry | TFTS — Tactical Field Intelligence Service",
  description:
    "Secure, encrypted instruction portal for solicitors, insolvency practitioners, corporate executives, and select private clients. 256-bit encryption.",
  alternates: {
    canonical: getCanonicalUrl("/confidential-enquiry"),
  },
};


export default function ConfidentialEnquiryPage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Editorial architectural header */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface/60 to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
          <Breadcrumbs items={[{ label: "CONFIDENTIAL ENQUIRY" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono tracking-ultra uppercase text-brass bg-brass/10 border border-brass/30 px-3 py-1 inline-block">
              SECURE INTAKE ENVIRONMENT
            </span>

            <h1 className="text-3xl sm:text-5xl font-light font-serif text-warmWhite leading-[1.15]">
              Begin a Confidential Enquiry
            </h1>

            <p className="text-sm sm:text-base font-light text-stone-light leading-relaxed">
              All communications are handled with strict professional discretion and Data Protection Act 2018 controls. Legal professional privilege applies where instructed directly by legal counsel in connection with legal advice or litigation.
            </p>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Main Workflow Form Container */}
      <section className="py-16 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Suspense fallback={<div className="text-stone-muted text-xs font-mono text-center py-20">INITIALISING ENCRYPTED ENVIRONMENT...</div>}>
          <ConfidentialEnquiryWorkflow />
        </Suspense>
      </section>
    </div>
  );
}
