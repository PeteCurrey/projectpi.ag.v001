import React from "react";
import Link from "next/link";
import { FolderKanban, ArrowRight, Search, Filter } from "lucide-react";

export const metadata = {
  title: "Client Matters Archive | Private Intelligence & Investigations",
  robots: "noindex, nofollow",
};

export default function ClientMattersPage() {
  const matters = [
    {
      ref: "MAT-2410-092",
      title: "Insolvency Process Service — High Court Winding-Up Petition",
      type: "PROCESS_SERVING",
      status: "FIELDWORK",
      leadInvestigator: "D. Mercer (Case Director)",
      openedDate: "03 Oct 2024",
      serviceAttempts: "1 of 3 Logged",
    },
    {
      ref: "MAT-2410-088",
      title: "Corporate Asset Verification & Offshore Tracing",
      type: "ASSET_TRACING",
      status: "REPORTING",
      leadInvestigator: "S. Thorne (Forensic Lead)",
      openedDate: "28 Sep 2024",
      serviceAttempts: "N/A (Intelligence)",
    },
    {
      ref: "MAT-2410-079",
      title: "Specialist Debtor Location — Evasive Director",
      type: "TRACING",
      status: "COMPLETED",
      leadInvestigator: "J. Blackwood (Field Operations)",
      openedDate: "15 Sep 2024",
      serviceAttempts: "Address Verified",
    },
    {
      ref: "MAT-2409-041",
      title: "RIPA-Compliant Static Surveillance — Section 57 Fraud Defense",
      type: "SURVEILLANCE",
      status: "CLOSED",
      leadInvestigator: "Field Team 04",
      openedDate: "02 Sep 2024",
      serviceAttempts: "Logs Delivered",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-oliveGrey/70 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-ultra uppercase text-brass block">
            MATTER MANAGEMENT
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
            Instructed Matters
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by reference or title..."
            className="bg-obsidian-surface border border-oliveGrey text-warmWhite px-3 py-2 text-xs font-mono outline-none focus:border-brass w-64"
          />
        </div>
      </div>

      <div className="divide-y divide-oliveGrey/40 border border-oliveGrey/60 bg-obsidian-surface/40">
        {matters.map((matter) => (
          <div
            key={matter.ref}
            className="p-6 hover:bg-obsidian-surface/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-brass">{matter.ref}</span>
                <span className="text-[10px] font-mono uppercase bg-oliveGrey/40 text-stone-light px-2 py-0.5 border border-oliveGrey">
                  {matter.status}
                </span>
                <span className="text-[10px] font-mono uppercase text-stone-muted">
                  {matter.type}
                </span>
              </div>
              <h3 className="text-base font-serif text-warmWhite">
                {matter.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-muted pt-1">
                <span>LEAD: {matter.leadInvestigator}</span>
                <span>·</span>
                <span>OPENED: {matter.openedDate}</span>
                <span>·</span>
                <span>STATUS: {matter.serviceAttempts}</span>
              </div>
            </div>

            <Link
              href={`/client/matters/${matter.ref}`}
              className="inline-flex items-center gap-2 bg-obsidian border border-oliveGrey/80 hover:border-brass text-stone-light hover:text-warmWhite text-xs font-mono uppercase tracking-wider px-5 py-2.5 transition-colors shrink-0"
            >
              <span>INSPECT DOSSIER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
