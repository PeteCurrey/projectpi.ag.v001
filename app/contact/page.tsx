import React from "react";
import { Metadata } from "next";
import ConfidentialEnquiryForm from "@/components/enquiry/ConfidentialEnquiryForm";
import { getCanonicalUrl, EMAIL_ENQUIRIES } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

export const metadata: Metadata = {
  title: "Confidential Enquiry & Private Consultation | TFTS",
  description:
    "Discreet encrypted enquiry portal for legal counsel, corporate executives, and private offices. Mayfair, London consulting rooms by appointment.",
  alternates: {
    canonical: getCanonicalUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <div className="bg-paper min-h-screen text-ink">
      {/* Masthead */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                SECURE CONSULTATION INTAKE · LONDON MAYFAIR
              </span>
              <h1 className="text-display-xl font-[200] tracking-tight leading-[1.04] text-ink">
                Confidential Enquiry.
              </h1>
              <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
                Some matters should not be discussed in public. We operate encrypted channels and direct
                director-level consultations to assess your circumstances in absolute privacy.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left: Form */}
            <div className="lg:col-span-8">
              <ConfidentialEnquiryForm />
            </div>

            {/* Right: Channels & Discretion — open rule-based, no cards */}
            <div className="lg:col-span-4 border-t border-rule pt-8 space-y-0">

              {/* A. Alternative Encrypted Channels */}
              <div className="space-y-4">
                <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                  ALTERNATIVE ENCRYPTED CHANNELS
                </span>

                {/* Channel 1 */}
                <div className="border-b border-rule pt-4 pb-6 space-y-1">
                  <span className="text-[10px] font-[300] uppercase tracking-wider text-ink-muted block">
                    DUTY PARTNER SECURE LINE
                  </span>
                  <p className="text-sm font-[300] text-ink">+44 (0)20 7946 0188</p>
                  <p className="text-[11px] font-[300] text-ink-muted">
                    Direct to operational partner.
                  </p>
                </div>

                {/* Channel 2 */}
                <div className="border-b border-rule pt-4 pb-6 space-y-1">
                  <span className="text-[10px] font-[300] uppercase tracking-wider text-ink-muted block">
                    ENCRYPTED DISPATCH INBOX
                  </span>
                  <p className="text-sm font-[300] text-ink">{EMAIL_ENQUIRIES}</p>
                  <p className="text-[11px] font-[300] text-ink-muted">
                    Monitored 24/7
                  </p>
                </div>

                {/* Channel 3 */}
                <div className="border-b border-rule pt-4 pb-6 space-y-1">
                  <span className="text-[10px] font-[300] uppercase tracking-wider text-ink-muted block">
                    SIGNAL PROTOCOL
                  </span>
                  <p className="text-sm font-[300] text-ink">+44 (0)7700 900 188 (Signal Only)</p>
                  <p className="text-[11px] font-[300] text-ink-muted">
                    End-to-end encrypted
                  </p>
                </div>
              </div>

              {/* B. Consulting Rooms */}
              <div className="border-t border-rule pt-8 space-y-4">
                <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                  CONSULTING ROOMS
                </span>
                <h3 className="text-xl font-[200] text-ink">
                  Central London Chambers
                </h3>
                <p className="text-sm font-[300] text-ink-muted leading-relaxed">
                  Mayfair, London W1. Consultations are conducted in private meeting suites
                  strictly by prior appointment. Video consultations can be arranged via secure,
                  encrypted conferencing links.
                </p>
              </div>

              {/* C. Privilege & Non-Disclosure */}
              <div className="border-t border-rule pt-8 space-y-4">
                <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                  PRIVILEGE &amp; NON-DISCLOSURE
                </span>
                <p className="text-[11px] font-[300] text-ink-muted leading-relaxed">
                  A mutual duty of confidentiality applies immediately upon receipt of any preliminary
                  mandate. If instructed through external solicitors or barristers, all inquiries are
                  structured under legal professional privilege.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
