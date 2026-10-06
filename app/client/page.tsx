import React from "react";
import Link from "next/link";
import {
  FolderKanban,
  FileCheck,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "Client Portal Overview | Private Intelligence & Investigations",
  robots: "noindex, nofollow",
};

export default function ClientPortalOverview() {
  const activeMatters = [
    {
      ref: "MAT-2410-092",
      title: "Insolvency Process Service — High Court Winding-Up Petition",
      type: "PROCESS_SERVING",
      status: "FIELDWORK",
      lastUpdate: "Attempt 01 Completed. Subject residence verified; attendance re-scheduled 07:30.",
      updatedAt: "Today, 11:42",
      unread: 1,
    },
    {
      ref: "MAT-2410-088",
      title: "Corporate Asset Verification & Offshore Tracing",
      type: "ASSET_TRACING",
      status: "REPORTING",
      lastUpdate: "Interim asset bundle prepared. High Court Part 25 schedule attached.",
      updatedAt: "Yesterday, 16:15",
      unread: 0,
    },
    {
      ref: "MAT-2410-079",
      title: "Specialist Debtor Location — Evasive Director",
      type: "TRACING",
      status: "COMPLETED",
      lastUpdate: "Current address established. Certificate of Tracing uploaded.",
      updatedAt: "04 Oct, 09:30",
      unread: 0,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-12">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-oliveGrey/70 pb-8 gap-4">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            CONFIDENTIAL CLIENT ENVIRONMENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-light font-serif text-warmWhite">
            Practice Overview
          </h1>
          <p className="text-xs font-mono text-stone-muted">
            AUTHENTICATED SESSION · VANCE & PARTNERS LLP · SRA REGISTERED
          </p>
        </div>

        <Link
          href="/confidential-enquiry"
          className="inline-flex items-center gap-2 bg-brass text-obsidian text-xs tracking-widest uppercase font-medium px-6 py-3 hover:bg-brass/90 transition-colors"
        >
          INSTRUCT NEW MATTER
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-2">
          <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
            ACTIVE MATTERS
          </span>
          <span className="text-3xl font-serif text-warmWhite font-light">02</span>
          <span className="text-[11px] text-stone-muted font-light block">
            1 in fieldwork · 1 in reporting
          </span>
        </div>

        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-2">
          <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
            REPORTS DELIVERED
          </span>
          <span className="text-3xl font-serif text-brass font-light">14</span>
          <span className="text-[11px] text-stone-muted font-light block">
            Immutable SHA-256 verified
          </span>
        </div>

        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-2">
          <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
            UNREAD ADVICE
          </span>
          <span className="text-3xl font-serif text-warmWhite font-light">01</span>
          <span className="text-[11px] text-stone-muted font-light block">
            Operational update requiring review
          </span>
        </div>

        <div className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 space-y-2">
          <span className="text-[10px] font-mono text-stone-muted uppercase tracking-wider block">
            PRIVILEGE STATUS
          </span>
          <span className="text-sm font-mono text-emerald-400 block pt-2">
            LITIGATION PRIVILEGE
          </span>
          <span className="text-[11px] text-stone-muted font-light block">
            Section 31 CPR safe harbour
          </span>
        </div>
      </div>

      {/* Active Matters Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-oliveGrey/60 pb-3">
          <h2 className="text-lg font-serif text-warmWhite">Active Client Matters</h2>
          <Link
            href="/client/matters"
            className="text-xs font-mono text-brass hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL MATTERS</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-4">
          {activeMatters.map((matter) => (
            <div
              key={matter.ref}
              className="p-6 bg-obsidian-surface/40 border border-oliveGrey/60 hover:border-brass/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-brass">{matter.ref}</span>
                  <span className="text-[10px] font-mono uppercase bg-oliveGrey/40 text-stone-light px-2 py-0.5 border border-oliveGrey">
                    {matter.status}
                  </span>
                  {matter.unread > 0 && (
                    <span className="text-[10px] font-mono uppercase bg-brass text-obsidian px-2 py-0.5 font-medium">
                      NEW ADVICE
                    </span>
                  )}
                </div>
                <h3 className="text-base font-serif text-warmWhite">
                  {matter.title}
                </h3>
                <p className="text-xs text-stone-muted font-light">
                  {matter.lastUpdate}
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
                <span className="text-stone-muted">{matter.updatedAt}</span>
                <Link
                  href={`/client/matters/${matter.ref}`}
                  className="bg-obsidian border border-oliveGrey/80 hover:border-brass text-stone-light hover:text-warmWhite px-4 py-2 uppercase tracking-wider transition-colors"
                >
                  ACCESS FILE
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
