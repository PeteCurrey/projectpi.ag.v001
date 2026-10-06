import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const clientTypes = [
  {
    code: "01",
    title: "Solicitors & Law Firms",
    body: "Litigation teams, dispute resolution practices and private client solicitors. We provide process serving, witness enquiries, evidence gathering and asset investigation — fully documented for use in proceedings.",
    href: "/professional-clients/solicitors",
  },
  {
    code: "02",
    title: "Insolvency Practitioners",
    body: "Licensed IPs, officeholders and turnaround professionals. Statutory demand service, address tracing, asset tracing and debtor investigations — conducted with an understanding of insolvency procedure.",
    href: "/professional-clients/insolvency-practitioners",
  },
  {
    code: "03",
    title: "Corporate Counsel",
    body: "In-house legal and compliance teams at corporates, financial institutions and regulated entities. Due diligence, fraud investigations, employee misconduct and internal inquiry support.",
    href: "/professional-clients/corporate-counsel",
  },
  {
    code: "04",
    title: "Private & Family Offices",
    body: "Discreet investigations and intelligence services for private individuals, family offices and wealth management clients requiring absolute confidentiality.",
    href: "/professional-clients",
  },
];

export default function ProfessionalClients() {
  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian-surface/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-[1px] bg-brass" />
              <span className="text-[10px] font-mono tracking-ultra uppercase text-brass">
                PROFESSIONAL CLIENTS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-light font-serif text-warmWhite">
              Built for professional
              <br />
              <span className="italic text-stone-light">workflows.</span>
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base text-stone-muted font-light leading-relaxed max-w-2xl">
              Most of our instructions come from legal and corporate professionals. We understand the
              procedural requirements, the documentation standards and the pace at which professional
              matters move.
            </p>
          </div>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clientTypes.map((client) => (
            <Link
              key={client.code}
              href={client.href}
              className="group p-8 border border-oliveGrey/50 hover:border-brass/40 bg-obsidian/60 hover:bg-obsidian-surface/60 transition-all duration-300 rounded-xs space-y-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-mono text-brass/60 tracking-ultra">{client.code}</span>
                <ArrowUpRight className="w-4 h-4 text-oliveGrey group-hover:text-brass transition-colors" />
              </div>
              <h3 className="text-lg font-light text-warmWhite font-serif tracking-wide">
                {client.title}
              </h3>
              <p className="text-sm text-stone-muted font-light leading-relaxed">{client.body}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/professional-clients"
            className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase text-stone hover:text-warmWhite transition-colors border-b border-oliveGrey/60 hover:border-brass/50 pb-0.5"
          >
            <span>VIEW ALL PROFESSIONAL CLIENT PROFILES</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
