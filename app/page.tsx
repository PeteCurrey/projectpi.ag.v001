import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "TFTS — Tactical Field Intelligence Service | UK",
  description:
    "Independent private intelligence, corporate investigations, and specialist field operations. London and UK-wide.",
};

export default function HomePage() {
  const disciplines = [
    {
      number: "01",
      title: "Corporate Investigations",
      description:
        "Internal fraud, procurement manipulation, executive misconduct, and hostile competitor intelligence.",
      href: "/services/corporate-investigations",
    },
    {
      number: "02",
      title: "Strategic Intelligence & OSINT",
      description:
        "Open-source forensic research, digital footprint mapping, corporate profiling, and executive vetting.",
      href: "/services/intelligence",
    },
    {
      number: "03",
      title: "Asset & People Tracing",
      description:
        "Beneficial ownership identification, offshore asset mapping, debtor tracing, and elusive subject location.",
      href: "/services/asset-tracing",
    },
    {
      number: "04",
      title: "Covert Surveillance Operations",
      description:
        "Discreet physical observation, electronic trail verification, and contemporaneous evidence capture under strict legal necessity.",
      href: "/services/covert-surveillance",
    },
    {
      number: "05",
      title: "Litigation & Dispute Support",
      description:
        "High Court and Chancery dispute evidence, CPR Part 31/32 trial bundles, and sworn witness proofs of evidence.",
      href: "/services/litigation-support",
    },
    {
      number: "06",
      title: "Legal Process Serving",
      description:
        "Time-critical nationwide service of statutory demands, petitions, and injunctions under CPR Part 6.",
      href: "/services/process-serving",
    },
  ];

  return (
    <div className="bg-paper text-ink selection:bg-ink selection:text-paper">
      {/* 1. HEROIC MASTHEAD STATEMENT */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
          {/* Typographic Proposition */}
          <div className="max-w-5xl space-y-6">
            <span className="text-[11px] tracking-[0.24em] uppercase font-[300] text-ink-muted block">
              Independent Practice · Central London & UK-Wide
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-[200] tracking-tight leading-[1.06] text-ink">
              Tactical field intelligence and bespoke investigations for matters where certainty is required.
            </h1>
            <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
              Instructed by corporate leadership, commercial dispute litigators, insolvency practitioners, and private offices facing critical information asymmetry.
            </p>
          </div>

          {/* Integrated Architectural Plate */}
          <div className="relative w-full aspect-[21/9] max-h-[560px] overflow-hidden border border-rule">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85"
              alt="City of London commercial towers in clean architectural perspective"
              fill
              priority
              className="object-cover grayscale contrast-[1.05]"
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-6 text-[10px] tracking-[0.18em] uppercase font-[300] text-paper/90 bg-ink/70 px-3 py-1">
              City of London Commercial Perimeter · Central London Operations
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE MANDATE & DISCIPLINED DOCTRINE (ASYMMETRIC SPREAD) */}
      <section className="py-24 md:py-32 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              The Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-[200] tracking-tight text-ink">
              Discretion, evidentiary precision, and absolute procedural integrity.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8 text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
            <p>
              We operate where standard commercial enquiries and routine public registry checks fail to provide definitive clarity. Whether identifying the architects of internal procurement fraud, tracing dissipated assets across complex corporate vehicles, conducting lawful physical surveillance, or establishing witness statements for High Court litigation, our work product is built to withstand hostile legal scrutiny.
            </p>
            <p>
              Every instruction is executed under the direct supervision of experienced operational directors. We do not sub-contract matters to unvetted intermediaries. All intelligence is gathered in strict compliance with the Data Protection Act 2018, the Civil Procedure Rules, and non-disclosure obligations.
            </p>
            <div className="pt-4 flex flex-wrap gap-8 text-xs font-[300] text-ink border-t border-rule">
              <div>
                <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                  Operational Standard
                </span>
                BS 102000 Code of Conduct
              </div>
              <div>
                <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                  Legal Compliance
                </span>
                CPR Parts 31, 32 & 35
              </div>
              <div>
                <span className="text-ink-muted block text-[10px] uppercase tracking-wider">
                  Data Governance
                </span>
                ICO Registered · UK GDPR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRACTICE DISCIPLINES (UNADORNED TYPOGRAPHIC LEDGER) */}
      <section className="py-24 md:py-32 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-6 border-b border-rule pb-6">
            <div>
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Practice Areas
              </span>
              <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight">
                Specialist Investigative Disciplines
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-[300] tracking-[0.18em] uppercase text-ink hover:text-ink-muted transition-colors flex items-center space-x-1"
            >
              <span>View All 20 Capabilities</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean Horizontal Ledger */}
          <div className="divide-y divide-rule border-b border-rule">
            {disciplines.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline transition-colors hover:bg-paper-stone/50 px-2"
              >
                <div className="md:col-span-1 text-xs font-[300] text-ink-muted">
                  {item.number}
                </div>
                <div className="md:col-span-4 text-xl sm:text-2xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                  {item.title}
                </div>
                <div className="md:col-span-6 text-sm font-[300] text-ink-muted leading-relaxed">
                  {item.description}
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-ink transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRIC ARCHITECTURAL BREAK & INSTITUTIONAL SECTORS */}
      <section className="py-24 md:py-32 border-b border-rule bg-paper-stone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetric Photographic Plate */}
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden border border-rule">
            <Image
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=85"
              alt="Royal Courts of Justice facade in clean architectural symmetry"
              fill
              className="object-cover grayscale contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          {/* Sector Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Instructing Sectors
              </span>
              <h2 className="text-3xl sm:text-4xl font-[200] text-ink tracking-tight leading-snug">
                Trusted by legal counsel, corporate boards, and financial institutions.
              </h2>
            </div>
            <p className="text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
              We accept instructions exclusively from professional and institutional clients who require unvarnished, admissible facts. Our reporting is structured to meet the evidential thresholds required in civil dispute resolution, regulatory disclosures, and corporate decision-making.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs font-[300]">
              <div className="space-y-1.5 border-t border-rule pt-4">
                <Link
                  href="/professional-clients/solicitors"
                  className="text-ink hover:text-ink-muted transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-[200]">Solicitors & Barristers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
                </Link>
                <p className="text-ink-muted leading-relaxed">
                  Litigation support, witness statement taking, and CPR Part 6 process serving.
                </p>
              </div>
              <div className="space-y-1.5 border-t border-rule pt-4">
                <Link
                  href="/professional-clients/insolvency-practitioners"
                  className="text-ink hover:text-ink-muted transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-[200]">Insolvency Practitioners</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
                </Link>
                <p className="text-ink-muted leading-relaxed">
                  Debtor asset tracing, antecedent transaction enquiries, and director profiling.
                </p>
              </div>
              <div className="space-y-1.5 border-t border-rule pt-4">
                <Link
                  href="/professional-clients/corporate-counsel"
                  className="text-ink hover:text-ink-muted transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-[200]">Corporate Counsel</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
                </Link>
                <p className="text-ink-muted leading-relaxed">
                  Internal investigations, vendor fraud audits, and executive integrity vetting.
                </p>
              </div>
              <div className="space-y-1.5 border-t border-rule pt-4">
                <Link
                  href="/professional-clients/private-offices"
                  className="text-ink hover:text-ink-muted transition-colors flex items-center justify-between"
                >
                  <span className="text-sm font-[200]">Family Offices</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink-muted" />
                </Link>
                <p className="text-ink-muted leading-relaxed">
                  Confidential advisory, transaction due diligence, and discreet background enquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DIRECT INSTITUTIONAL INTAKE */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-baseline">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
              Direct Instruction
            </span>
            <h2 className="text-3xl sm:text-5xl font-[200] text-ink tracking-tight">
              Initiate a confidential enquiry.
            </h2>
            <p className="text-sm sm:text-base font-[300] text-ink-muted leading-relaxed max-w-xl">
              All initial consultations are protected under strict non-disclosure. We review case background, operational feasibility, and legal parameters prior to formal engagement.
            </p>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2 text-xs font-[300] text-ink-muted border-t border-rule pt-6">
              <div>Central London Suite: Mayfair, London W1</div>
              <div>Direct Dispatch: enquiries@tfts.co.uk</div>
              <div>Urgent Process Serving: 24-hour turnaround across England & Wales</div>
            </div>
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-2 border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none"
            >
              <span>Submit Confidential Instruction</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
