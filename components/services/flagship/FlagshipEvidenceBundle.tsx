import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";

interface FlagshipEvidenceBundleProps {
  evidence: FlagshipServiceConfig["evidence"];
  serviceSlug: string;
}

export default function FlagshipEvidenceBundle({
  evidence,
  serviceSlug,
}: FlagshipEvidenceBundleProps) {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Statement & Standards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                EVIDENTIARY OUTPUT · COURT COMPLIANCE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-serif text-warmWhite">
              {evidence.title}
            </h2>

            <p className="text-sm text-stone-muted font-light leading-relaxed">
              {evidence.standards}
            </p>

            <div className="p-4 border border-oliveGrey/60 bg-obsidian-surface/40 rounded-xs space-y-2 text-xs font-mono text-stone-muted">
              <div className="flex items-center space-x-2 text-brass">
                <ShieldCheck className="w-4 h-4" />
                <span className="tracking-wider uppercase">CHAIN OF CUSTODY CERTIFICATION</span>
              </div>
              <p className="text-[11px] font-sans font-light leading-relaxed">
                All physical and digital exhibits are chronologically logged, cryptographically hashed, and preserved under ISO/IEC 27037 standards to withstand judicial scrutiny.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`/confidential-enquiry?service=${encodeURIComponent(serviceSlug)}`}
                className="inline-flex items-center space-x-3 text-xs tracking-widest uppercase font-mono text-brass hover:text-warmWhite border-b border-brass/40 pb-1 transition-colors"
              >
                <span>REQUEST EVIDENTIARY CONSULTATION</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Deliverables Stack */}
          <div className="lg:col-span-7 bg-obsidian-surface/60 border border-brass/40 p-8 sm:p-12 rounded-xs space-y-6 shadow-etched">
            <div className="flex items-center justify-between border-b border-oliveGrey/50 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brass">
                PRIMARY WORK PRODUCT DELIVERABLES
              </span>
              <span className="text-[9px] font-mono text-stone-muted">COURT-READY DOSSIER</span>
            </div>

            <div className="space-y-4">
              {evidence.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-brass/10 border border-brass/50 flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-brass" />
                  </div>
                  <p className="text-xs sm:text-sm text-warmWhite font-light leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-oliveGrey/40 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-stone-muted">
              <span>LEGAL PROFESSIONAL PRIVILEGE FORMATTED</span>
              <span>CPR PART 31 / 32 COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
