import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-paper-stone border-t border-rule text-ink">
      {/* Top Consultation Prompt */}
      <div className="border-b border-rule py-14 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-baseline justify-between gap-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl md:text-3xl font-[200] text-ink tracking-tight">
              Tactical intelligence and confidential investigations.
            </h3>
            <p className="text-sm font-[300] text-ink-muted leading-relaxed">
              Serving legal counsel, corporate leadership, insolvency practitioners, and private clients requiring definitive evidentiary certainty.
            </p>
          </div>
          <Link
            href="/confidential-enquiry"
            className="inline-flex items-center space-x-2 border border-ink px-5 py-2.5 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors rounded-none shrink-0"
          >
            <span>BEGIN CONFIDENTIAL ENQUIRY</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Directory Ledger */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-xs font-[300]">
        {/* Col 1: Firm Overview */}
        <div className="space-y-4">
          <div>
            <div className="text-sm tracking-[0.22em] uppercase font-[200] text-ink">
              TFTS
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-ink-muted">
              Tactical Field Intelligence Service
            </div>
          </div>
          <p className="text-ink-muted leading-relaxed">
            Independent private intelligence and investigative practice based in Central London, operating across the United Kingdom and internationally.
          </p>
          <div className="pt-2 text-ink-muted space-y-1">
            <div>Consulting Suite: Mayfair, London W1</div>
            <div>Direct Dispatch: enquiries@tfts.co.uk</div>
          </div>
        </div>

        {/* Col 2: Core Disciplines */}
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.2em] uppercase text-ink font-[300] border-b border-rule pb-2">
            PRACTICE DISCIPLINES
          </div>
          <ul className="space-y-2 text-ink-muted">
            <li>
              <Link href="/services/corporate-investigations" className="hover:text-ink transition-colors">
                Corporate Investigations
              </Link>
            </li>
            <li>
              <Link href="/services/intelligence" className="hover:text-ink transition-colors">
                Strategic Intelligence
              </Link>
            </li>
            <li>
              <Link href="/services/asset-tracing" className="hover:text-ink transition-colors">
                Asset Tracing & Recovery
              </Link>
            </li>
            <li>
              <Link href="/services/people-tracing" className="hover:text-ink transition-colors">
                Subject Location & Tracing
              </Link>
            </li>
            <li>
              <Link href="/services/covert-surveillance" className="hover:text-ink transition-colors">
                Covert Surveillance Operations
              </Link>
            </li>
            <li>
              <Link href="/services/litigation-support" className="hover:text-ink transition-colors">
                Litigation & Trial Support
              </Link>
            </li>
            <li>
              <Link href="/services/process-serving" className="hover:text-ink transition-colors">
                Process Serving (CPR Part 6)
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-ink hover:text-ink-muted transition-colors pt-1 inline-block">
                Complete Index →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Institutional Links */}
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.2em] uppercase text-ink font-[300] border-b border-rule pb-2">
            THE FIRM
          </div>
          <ul className="space-y-2 text-ink-muted">
            <li>
              <Link href="/about" className="hover:text-ink transition-colors">
                About TFTS
              </Link>
            </li>
            <li>
              <Link href="/how-we-work" className="hover:text-ink transition-colors">
                Operational Standards
              </Link>
            </li>
            <li>
              <Link href="/professional-clients" className="hover:text-ink transition-colors">
                Professional Clients
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-ink transition-colors">
                Publications & Doctrine
              </Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-ink transition-colors">
                Case Records
              </Link>
            </li>
            <li>
              <Link href="/confidential-enquiry" className="hover:text-ink transition-colors">
                Instruction Protocol
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Governance & Legal Framework */}
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.2em] uppercase text-ink font-[300] border-b border-rule pb-2">
            GOVERNANCE & STANDARDS
          </div>
          <ul className="space-y-2 text-ink-muted">
            <li>BS 102000 Code of Practice</li>
            <li>Data Protection Act 2018 (ICO Registered)</li>
            <li>Civil Procedure Rules (CPR Parts 31 & 32)</li>
            <li>RIPA & Human Rights Principles</li>
            <li>Professional Indemnity Insured</li>
            <li>Confidentiality & Non-Disclosure Bound</li>
          </ul>
        </div>
      </div>

      {/* Colophon & Sub-bar */}
      <div className="border-t border-rule px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-baseline justify-between gap-4 text-[11px] text-ink-muted font-[300]">
          <div>
            © {new Date().getFullYear()} TFTS — Tactical Field Intelligence Service. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/compliance" className="hover:text-ink transition-colors">
              Compliance & Legal Standards
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms of Instruction
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
