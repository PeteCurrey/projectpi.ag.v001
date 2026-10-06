import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "INTELLIGENCE",
    body: "Structured intelligence collection and analysis. OSINT investigations, due diligence, background inquiries, corporate intelligence and digital investigations — producing verified, actionable findings.",
    services: [
      { label: "OSINT Investigations", href: "/services/osint-investigations" },
      { label: "Due Diligence", href: "/services/due-diligence" },
      { label: "Digital Investigations", href: "/services/digital-investigations" },
      { label: "Background Investigations", href: "/services/background-investigations" },
    ],
    cta: { label: "INTELLIGENCE CAPABILITIES", href: "/services/intelligence" },
  },
  {
    number: "02",
    title: "INVESTIGATION",
    body: "Disciplined fact-finding for corporate, fraud, insurance and legal matters. Our investigators produce structured evidence suitable for internal review, dispute resolution and formal proceedings.",
    services: [
      { label: "Corporate Investigations", href: "/services/corporate-investigations" },
      { label: "Corporate Fraud", href: "/services/corporate-fraud-investigations" },
      { label: "Employee Investigations", href: "/services/employee-investigations" },
      { label: "People & Asset Tracing", href: "/services/people-tracing" },
    ],
    cta: { label: "INVESTIGATION CAPABILITIES", href: "/services/corporate-investigations" },
  },
  {
    number: "03",
    title: "FIELD SERVICE",
    body: "Physical field operations including covert surveillance, process serving, address tracing and witness enquiries. Conducted by trained operatives with proper documentation throughout.",
    services: [
      { label: "Process Serving", href: "/services/process-serving" },
      { label: "Covert Surveillance", href: "/services/covert-surveillance" },
      { label: "Address Tracing", href: "/services/address-tracing" },
      { label: "Witness Enquiries", href: "/services/witness-enquiries" },
    ],
    cta: { label: "FIELD CAPABILITIES", href: "/services/process-serving" },
  },
];

export default function Disciplines() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex items-start justify-between mb-16">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                PRIMARY CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-serif text-warmWhite">
              Three disciplines.
              <br />
              <span className="italic text-stone-light">One integrated service.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden md:flex items-center space-x-2 text-xs tracking-widest uppercase text-stone hover:text-warmWhite transition-colors border border-oliveGrey/60 hover:border-brass/50 px-4 py-2 rounded-xs"
          >
            <span>ALL CAPABILITIES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-oliveGrey/50">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.number}
              className={`p-8 lg:p-10 space-y-6 ${
                idx < pillars.length - 1 ? "border-b md:border-b-0 md:border-r border-oliveGrey/50" : ""
              } hover:bg-obsidian-surface/40 transition-colors group`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-brass/60 tracking-ultra">{pillar.number}</span>
              </div>

              <h3 className="text-2xl font-light tracking-[0.15em] text-warmWhite font-serif">
                {pillar.title}
              </h3>

              <p className="text-sm text-stone-muted leading-relaxed font-light">
                {pillar.body}
              </p>

              <ul className="space-y-2 pt-2">
                {pillar.services.map((svc) => (
                  <li key={svc.href}>
                    <Link
                      href={svc.href}
                      className="text-xs font-mono text-stone hover:text-brass transition-colors flex items-center space-x-2 group/link"
                    >
                      <span className="w-3 h-[1px] bg-oliveGrey/60 group-hover/link:bg-brass/60 transition-colors" />
                      <span>{svc.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={pillar.cta.href}
                className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-brass hover:text-warmWhite transition-colors border-b border-brass/30 hover:border-brass/60 pb-0.5"
              >
                <span>{pillar.cta.label}</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
