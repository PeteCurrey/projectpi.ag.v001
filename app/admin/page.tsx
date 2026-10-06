import React from "react";
import Link from "next/link";
import { AlertCircle, Clock, CheckCircle2, User, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Enquiry Triage Console | Internal Directorate",
  robots: "noindex, nofollow",
};

export default function AdminTriagePage() {
  const pendingEnquiries = [
    {
      ref: "ENQ-241006-8912",
      type: "PROCESS_SERVING",
      subType: "statutory-demand",
      urgency: "URGENT",
      client: "Charles Sterling (Sterling Insolvency Partners)",
      submittedAt: "18 mins ago",
      narrative: "Urgent Section 268 statutory demand requiring immediate same-day service in Leeds ahead of limitation expiry. Subject known to be evading at commercial depot.",
      status: "NEW",
    },
    {
      ref: "ENQ-241006-8904",
      type: "FRAUD",
      subType: "internal-theft",
      urgency: "TIME_SENSITIVE",
      client: "Sarah Jenkins (General Counsel, FinTech PLC)",
      submittedAt: "2 hours ago",
      narrative: "Suspected procurement officer collusion with overseas vendor. Require discreet forensic computer imaging and lifestyle surveillance before audit confrontation.",
      status: "UNDER_REVIEW",
    },
    {
      ref: "ENQ-241006-8891",
      type: "TRACING",
      subType: "director-location",
      urgency: "STANDARD",
      client: "Mark Reynolds (Commercial Litigation Solicitor)",
      submittedAt: "4 hours ago",
      narrative: "Trace current residential address of former company director for service of High Court Part 7 claim form.",
      status: "QUALIFIED",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-oliveGrey/70 pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-ultra uppercase text-amber-400 block">
            INTAKE DIRECTORY
          </span>
          <h1 className="text-2xl sm:text-3xl font-light font-serif text-warmWhite">
            Confidential Enquiry Triage
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-muted">
          <span>REAL-TIME AUDIT STREAM ACTIVE</span>
        </div>
      </div>

      <div className="space-y-4">
        {pendingEnquiries.map((enq) => (
          <div
            key={enq.ref}
            className="p-6 bg-obsidian-surface/60 border border-oliveGrey/60 hover:border-brass/70 transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between text-xs font-mono gap-2 border-b border-oliveGrey/40 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-brass font-medium">{enq.ref}</span>
                <span className="text-[10px] uppercase bg-oliveGrey/40 px-2 py-0.5 border border-oliveGrey text-warmWhite">
                  {enq.type} · {enq.subType}
                </span>
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 font-medium ${
                    enq.urgency === "URGENT"
                      ? "bg-red-950 text-red-400 border border-red-800"
                      : "bg-amber-950 text-amber-400 border border-amber-800"
                  }`}
                >
                  {enq.urgency}
                </span>
              </div>
              <span className="text-stone-muted">{enq.submittedAt}</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-stone-muted block">
                INSTRUCTING PARTY: {enq.client}
              </span>
              <p className="text-xs sm:text-sm text-stone-light font-light leading-relaxed">
                {enq.narrative}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono text-stone-muted">
                STATUS: {enq.status}
              </span>
              <div className="flex gap-2">
                <button className="bg-obsidian border border-oliveGrey text-stone-light hover:text-warmWhite text-xs font-mono uppercase px-3 py-1.5 transition-colors">
                  ASSIGN INVESTIGATOR
                </button>
                <button className="bg-brass text-obsidian text-xs font-mono uppercase font-medium px-4 py-1.5 hover:bg-brass/90 transition-colors">
                  CONVERT TO MATTER
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
