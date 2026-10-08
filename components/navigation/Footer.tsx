import React from "react";
import Link from "next/link";

const footerServices = [
  { label: "Corporate Investigations", href: "/services/corporate-investigations" },
  { label: "Strategic Intelligence", href: "/services/intelligence" },
  { label: "Asset Tracing & Recovery", href: "/services/asset-tracing" },
  { label: "Subject Location & Tracing", href: "/services/people-tracing" },
  { label: "Covert Surveillance Operations", href: "/services/covert-surveillance" },
  { label: "Litigation & Trial Support", href: "/services/litigation-support" },
  { label: "Process Serving (CPR Part 6)", href: "/services/process-serving" },
];

const footerFirm = [
  { label: "About TFTS", href: "/about" },
  { label: "Operational Standards", href: "/how-we-work" },
  { label: "Professional Clients", href: "/professional-clients" },
  { label: "Publications & Doctrine", href: "/insights" },
  { label: "Case Records", href: "/cases" },
  { label: "Instruction Protocol", href: "/confidential-enquiry" },
];

export default function Footer() {
  return (
    <footer className="bg-paper text-ink" aria-label="Site footer">

      {/* ── MONUMENTAL BRAND WATERMARK BREAK ── */}
      <div className="border-t-2 border-britishGreen overflow-hidden">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          {/* Giant TFTS watermark */}
          <div
            className="text-[clamp(6rem,18vw,18rem)] font-[200] tracking-[-0.04em] leading-[0.85] text-ink/[0.04] select-none pointer-events-none py-8"
            aria-hidden="true"
          >
            TFTS
          </div>
        </div>
      </div>

      {/* ── ENQUIRY BAND ── */}
      <div className="border-y border-rule">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <div className="text-[10px] tracking-[0.28em] uppercase font-[300] text-britishGreen">
              CONFIDENTIAL INSTRUCTION
            </div>
            <p className="text-2xl md:text-3xl font-[200] text-ink tracking-tight leading-tight">
              Tactical intelligence and confidential&nbsp;investigations.
            </p>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed pt-1">
              Serving legal counsel, corporate leadership, insolvency practitioners and private clients requiring definitive evidentiary certainty.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center px-6 py-3 text-[11px] tracking-[0.22em] uppercase font-[300] text-paper bg-britishGreen hover:bg-britishGreen-light transition-colors duration-300 rounded-none"
            >
              BEGIN CONFIDENTIAL ENQUIRY
            </Link>
            <div className="text-[10px] tracking-[0.18em] uppercase text-ink/30 font-[300]">
              All instructions held in strict confidence
            </div>
          </div>
        </div>
      </div>

      {/* ── DIRECTORY LEDGER ── */}
      <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-xs font-[300]">

          {/* Firm identity — wider column */}
          <div className="md:col-span-4 space-y-5">
            <div>
              <div className="text-base tracking-[0.28em] uppercase font-[200] text-ink">
                TFTS
              </div>
              <div className="text-[9px] tracking-[0.22em] uppercase text-ink/35 font-[300] mt-0.5">
                Tactical Field Intelligence Service
              </div>
            </div>
            <p className="text-ink-muted leading-relaxed text-[13px]">
              Independent private intelligence and investigative practice based in Central London, operating across the United Kingdom and internationally.
            </p>
            <div className="space-y-1 text-[12px] text-ink-muted border-l-2 border-britishGreen pl-4">
              <div>Consulting Suite: Mayfair, London W1</div>
              <div>enquiries@tfts.co.uk</div>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-4 space-y-4">
            <div className="text-[10px] tracking-[0.24em] uppercase text-ink/40 font-[300] pb-2 border-b border-rule">
              PRACTICE DISCIPLINES
            </div>
            <ul className="space-y-2.5">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-[12px] text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-[1px] bg-rule group-hover:bg-britishGreen/50 transition-colors duration-200 shrink-0" />
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link href="/services" className="text-[11px] tracking-[0.15em] uppercase text-britishGreen/70 hover:text-britishGreen transition-colors duration-200">
                  Complete Index →
                </Link>
              </li>
            </ul>
          </div>

          {/* The Firm + Governance */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="text-[10px] tracking-[0.24em] uppercase text-ink/40 font-[300] pb-2 border-b border-rule">
                THE FIRM
              </div>
              <ul className="space-y-2.5">
                {footerFirm.map((f) => (
                  <li key={f.href}>
                    <Link
                      href={f.href}
                      className="text-[12px] text-ink-muted hover:text-ink transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-3 h-[1px] bg-rule group-hover:bg-britishGreen/50 transition-colors duration-200 shrink-0" />
                      {f.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[10px] tracking-[0.24em] uppercase text-ink/40 font-[300] pb-2 border-b border-rule">
                GOVERNANCE & STANDARDS
              </div>
              <ul className="space-y-1.5 text-[11px] text-ink/30">
                <li>BS 102000 Code of Practice</li>
                <li>Data Protection Act 2018 (ICO Registered)</li>
                <li>Civil Procedure Rules (CPR Parts 31 & 32)</li>
                <li>RIPA & Human Rights Principles</li>
                <li>Professional Indemnity Insured</li>
                <li>Confidentiality & Non-Disclosure Bound</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── COLOPHON ── */}
      <div className="border-t border-rule/60">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 py-5 flex flex-col md:flex-row items-baseline justify-between gap-3 text-[10px] text-ink/25 font-[300] tracking-[0.12em]">
          <div>
            © {new Date().getFullYear()} TFTS — Tactical Field Intelligence Service. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink/50 transition-colors">Privacy Policy</Link>
            <Link href="/compliance" className="hover:text-ink/50 transition-colors">Compliance & Legal Standards</Link>
            <Link href="/terms" className="hover:text-ink/50 transition-colors">Terms of Instruction</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
