import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ConfidentialEnquiryWorkflow from "@/components/enquiry/ConfidentialEnquiryWorkflow";
import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Begin a Confidential Enquiry | TFTS — Tactical Field Intelligence Service",
  description:
    "Secure instruction portal for solicitors, insolvency practitioners, corporate executives, and select private clients. UK-wide operations.",
  alternates: {
    canonical: getCanonicalUrl("/confidential-enquiry"),
  },
};

export default function ConfidentialEnquiryPage() {
  return (
    <div className="bg-paper min-h-screen text-ink selection:bg-ink selection:text-paper">
      {/* Editorial architectural header */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-6">
          <Breadcrumbs items={[{ label: "Confidential Enquiry" }]} />

          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Confidential Instruction Intake
            </span>

            <h1 className="text-display-md font-[200] text-ink tracking-tight leading-[1.08]">
              Begin a Confidential Enquiry
            </h1>

            <p className="text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
              All communications are handled with strict professional discretion and Data Protection Act 2018 controls. Legal professional privilege applies where instructed directly by legal counsel in connection with legal advice or contemplation of litigation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Workflow Form Container */}
      <section className="py-16 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Suspense
          fallback={
            <div className="text-ink-muted text-xs font-[300] text-center py-20">
              Loading intake protocol...
            </div>
          }
        >
          <ConfidentialEnquiryWorkflow />
        </Suspense>
      </section>
    </div>
  );
}
