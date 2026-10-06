import React from "react";
import { Metadata } from "next";
import { Lock, ShieldCheck, Key, Phone, Mail, Building, MapPin } from "lucide-react";
import ConfidentialEnquiryForm from "@/components/enquiry/ConfidentialEnquiryForm";

export const metadata: Metadata = {
  title: "Confidential Enquiry & Private Consultation | London UK",
  description: "Discreet encrypted enquiry portal for legal counsel, corporate executives, and private offices. Mayfair, London consulting rooms by appointment.",
  alternates: {
    canonical: "https://private-intelligence.co.uk/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Header */}
      <section className="py-24 md:py-32 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              SECURE CONSULTATION INTAKE · LONDON MAYFAIR
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Confidential Enquiry
            </h1>
            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              Some matters should not be discussed in public. We operate encrypted channels and direct
              director-level consultations to assess your circumstances in absolute privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 Cols: The Premium Form */}
            <div className="lg:col-span-8">
              <ConfidentialEnquiryForm />
            </div>

            {/* Right 4-5 Cols: Alternative Channels & Discretion Rules */}
            <div className="lg:col-span-4 space-y-8">
              {/* Direct Alternative Channels Card */}
              <div className="bg-obsidian-surface border border-oliveGrey/80 p-8 rounded-xs space-y-6 shadow-etched">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
                  ALTERNATIVE ENCRYPTED CHANNELS
                </span>

                <div className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-stone-muted uppercase block">
                      DUTY PARTNER SECURE LINE
                    </span>
                    <p className="text-warmWhite font-mono text-sm">+44 (0)20 7946 0188</p>
                    <p className="text-stone-dark text-[11px]">Direct to operational partner. Safe to request call-back.</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-oliveGrey/60">
                    <span className="text-[10px] font-mono text-stone-muted uppercase block">
                      ENCRYPTED DISPATCH INBOX
                    </span>
                    <p className="text-warmWhite font-mono text-xs">confidential@private-intelligence.co.uk</p>
                    <p className="text-stone-dark text-[11px]">Monitored 24/7 on air-gapped terminal.</p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-oliveGrey/60">
                    <span className="text-[10px] font-mono text-stone-muted uppercase block">
                      SIGNAL PROTOCOL DISPATCH
                    </span>
                    <p className="text-warmWhite font-mono text-xs">+44 (0)7700 900 188 (Signal Only)</p>
                    <p className="text-stone-dark text-[11px]">End-to-end encrypted messaging & voice.</p>
                  </div>
                </div>
              </div>

              {/* Consultation Presence */}
              <div className="bg-obsidian-surface border border-oliveGrey/80 p-8 rounded-xs space-y-4 shadow-etched">
                <div className="flex items-center space-x-2 text-brass">
                  <Building className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">
                    CONSULTING ROOMS
                  </span>
                </div>
                <h3 className="text-lg font-light text-warmWhite font-serif">
                  Central London Chambers
                </h3>
                <p className="text-xs text-stone leading-relaxed font-light">
                  Mayfair, London W1. Consultations are conducted in private meeting suites
                  strictly by prior appointment. Video consultations can be arranged via secure,
                  encrypted conferencing links.
                </p>
              </div>

              {/* Non-Disclosure Declaration */}
              <div className="bg-obsidian/70 border border-brass/30 p-6 rounded-xs space-y-3">
                <div className="flex items-center space-x-2 text-brass">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">
                    PRIVILEGE & NON-DISCLOSURE
                  </span>
                </div>
                <p className="text-[11px] text-stone-muted leading-relaxed font-light">
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
