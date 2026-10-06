import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  Scale,
  Clock,
  Download,
  Upload,
  MessageSquare,
} from "lucide-react";

interface MatterDetailProps {
  params: Promise<{ matterId: string }>;
}

export const metadata = {
  title: "Matter Dossier | Private Intelligence Client Portal",
  robots: "noindex, nofollow",
};

export default async function ClientMatterDetailPage({ params }: MatterDetailProps) {
  const { matterId } = await params;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
      {/* Dossier Header */}
      <div className="space-y-4 border-b border-oliveGrey/70 pb-6">
        <Link
          href="/client/matters"
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-muted hover:text-brass transition-colors uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO ALL MATTERS
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-brass">{matterId}</span>
              <span className="text-[10px] font-mono uppercase bg-oliveGrey/50 text-stone-light px-2.5 py-0.5 border border-oliveGrey">
                STAGE: FIELDWORK IN PROGRESS
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                CPR 31 SAFE
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
              Insolvency Process Service — High Court Winding-Up Petition
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-brass text-obsidian text-xs font-mono tracking-wider uppercase font-medium px-5 py-2.5 hover:bg-brass/90 transition-colors">
              UPLOAD COURT PAPERS
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Service Attempts (Timeline) + Documents Bundle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contemporaneous Service Activity */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-3">
            <h2 className="text-lg font-serif text-warmWhite">
              Contemporaneous Service Activity & Fieldwork Logs
            </h2>
            <p className="text-xs text-stone-muted font-light leading-relaxed">
              Every physical attendance is logged contemporaneously by GPS-timestamped operational field units.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-obsidian-surface border border-oliveGrey/70 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-brass">ATTEMPT 01 · 05 OCT 2024 · 19:42 BST</span>
                <span className="text-amber-400">SUBJECT NOT PRESENT</span>
              </div>
              <h3 className="text-sm font-serif text-warmWhite">
                Attendance at Registered Residential Address (Kensington, London)
              </h3>
              <p className="text-xs text-stone-light leading-relaxed font-light">
                Field Investigator attended subject premise. Intercom attended by building concierge confirming subject resides on 3rd floor but currently traveling in Europe until Monday morning. Vehicle (Registration LX21 ***) not present in underground allocated bay.
              </p>
              <div className="text-[11px] font-mono text-stone-muted pt-2 border-t border-oliveGrey/40 flex justify-between">
                <span>INVESTIGATOR ID: FIELD-LDN-09</span>
                <span>SHA-256 HASH VERIFIED</span>
              </div>
            </div>

            <div className="p-6 bg-obsidian-surface/40 border border-oliveGrey/50 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-muted">SCHEDULED · 07 OCT 2024 · 07:30 BST</span>
                <span className="text-stone-muted">PENDING RE-ATTENDANCE</span>
              </div>
              <h3 className="text-sm font-serif text-warmWhite">
                Early Morning Personal Tender Strategy
              </h3>
              <p className="text-xs text-stone-muted leading-relaxed font-light">
                Secondary morning deployment planned to achieve personal tender upon return prior to transit to City offices.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Evidentiary Documents & Reports */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-obsidian-surface border border-oliveGrey/70 space-y-4">
            <div className="flex items-center justify-between border-b border-oliveGrey/50 pb-3">
              <h3 className="text-sm font-serif text-warmWhite">
                Evidential File Bundle
              </h3>
              <FileText className="w-4 h-4 text-brass" />
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Petition Form 7.1 Sealed Copy.pdf",
                  size: "2.4 MB",
                  type: "INSTRUCTION DOCUMENT",
                },
                {
                  title: "Pre-Service Address Verification Report.pdf",
                  size: "1.1 MB",
                  type: "INTELLIGENCE REPORT",
                },
                {
                  title: "Field Attendance Log #1 (Concierge Statement).pdf",
                  size: "450 KB",
                  type: "ATTENDANCE RECORD",
                },
              ].map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-obsidian border border-oliveGrey/50 flex items-center justify-between group"
                >
                  <div className="space-y-0.5 overflow-hidden pr-2">
                    <span className="text-xs font-mono text-warmWhite block truncate">
                      {doc.title}
                    </span>
                    <span className="text-[10px] font-mono text-stone-muted">
                      {doc.type} · {doc.size}
                    </span>
                  </div>
                  <button className="text-stone-muted group-hover:text-brass transition-colors p-1">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[10px] font-mono text-stone-muted text-center">
              AUTOMATIC TIME-STAMPED IMMUTABLE ARCHIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
