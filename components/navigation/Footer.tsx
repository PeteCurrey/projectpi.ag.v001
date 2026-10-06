import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Building, Scale, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-obsidian-pure border-t border-oliveGrey/80 text-warmWhite">
      {/* Top Statement Banner */}
      <div className="border-b border-oliveGrey/60 py-12 px-6 lg:px-12 bg-obsidian-surface/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-ultra text-brass block">
              ESTABLISHMENT DIRECTIVE
            </span>
            <p className="text-xl md:text-2xl font-light text-warmWhite tracking-tight font-serif">
              Intelligence for decisions. Investigations for certainty.
            </p>
          </div>
          <Link
            href="/confidential-enquiry"
            className="inline-flex items-center space-x-3 border border-brass/70 px-6 py-3 text-xs tracking-widest uppercase hover:bg-brass hover:text-obsidian transition-colors text-warmWhite rounded-xs w-fit"
          >
            <span>BEGIN A CONFIDENTIAL ENQUIRY</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brass group-hover:text-obsidian" />
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: Establishment */}
        <div className="lg:col-span-2 space-y-5">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.24em] font-light text-warmWhite">
              TFTS
            </div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-stone-muted">
              TACTICAL FIELD INTELLIGENCE SERVICE · LONDON
            </div>
          </div>
          <p className="text-xs text-stone-muted leading-relaxed max-w-sm">
            Private intelligence, investigations and specialist field services. Serving solicitors, corporate counsel, insolvency practitioners, financial institutions and select private clients.
          </p>
          <div className="pt-2 text-xs text-stone font-mono space-y-1.5">
            <div>CENTRAL LONDON CONSULTING SUITE: <span className="text-stone-light">MAYFAIR, LONDON W1</span></div>
            <div>OPERATIONAL COVERAGE: <span className="text-stone-light">UNITED KINGDOM · GLOBAL NETWORKS</span></div>
            <div>ENCRYPTED DISPATCH: <span className="text-stone-light">ENQUIRIES@TFTS.CO.UK</span></div>
          </div>
        </div>

        {/* Col 2: Core Disciplines */}
        <div className="space-y-4">
          <h4 className="text-[11px] uppercase tracking-ultra font-mono text-brass">
            CORE DISCIPLINES
          </h4>
          <ul className="space-y-2.5 text-xs text-stone">
            <li>
              <Link href="/services/process-serving" className="hover:text-warmWhite transition-colors">
                01 Process Serving
              </Link>
            </li>
            <li>
              <Link href="/services/corporate-investigations" className="hover:text-warmWhite transition-colors">
                02 Corporate Investigations
              </Link>
            </li>
            <li>
              <Link href="/services/intelligence" className="hover:text-warmWhite transition-colors">
                03 Strategic Intelligence
              </Link>
            </li>
            <li>
              <Link href="/services/people-tracing" className="hover:text-warmWhite transition-colors">
                04 People & Asset Tracing
              </Link>
            </li>
            <li>
              <Link href="/services/covert-surveillance" className="hover:text-warmWhite transition-colors">
                05 Surveillance Operations
              </Link>
            </li>
            <li>
              <Link href="/services/litigation-support" className="hover:text-warmWhite transition-colors">
                06 Legal & Litigation Support
              </Link>
            </li>
            <li>
              <Link href="/services" className="text-brass hover:text-brass-light pt-1 inline-block transition-colors">
                Complete Index (20 Capabilities) →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Key Capabilities */}
        <div className="space-y-4">
          <h4 className="text-[11px] uppercase tracking-ultra font-mono text-brass">
            SPECIALIST PRACTICE
          </h4>
          <ul className="space-y-2.5 text-xs text-stone">
            <li>
              <Link href="/services/corporate-fraud-investigations" className="hover:text-warmWhite transition-colors">
                Corporate Fraud
              </Link>
            </li>
            <li>
              <Link href="/services/asset-tracing" className="hover:text-warmWhite transition-colors">
                Asset Tracing & Recovery
              </Link>
            </li>
            <li>
              <Link href="/services/osint-investigations" className="hover:text-warmWhite transition-colors">
                Deep OSINT Analytics
              </Link>
            </li>
            <li>
              <Link href="/services/due-diligence" className="hover:text-warmWhite transition-colors">
                Investigative Due Diligence
              </Link>
            </li>
            <li>
              <Link href="/services/covert-surveillance" className="hover:text-warmWhite transition-colors">
                Covert Field Operations
              </Link>
            </li>
            <li>
              <Link href="/services/witness-enquiries" className="hover:text-warmWhite transition-colors">
                Witness Proofs of Evidence
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Firm & Standards */}
        <div className="space-y-4">
          <h4 className="text-[11px] uppercase tracking-ultra font-mono text-brass">
            THE ESTABLISHMENT
          </h4>
          <ul className="space-y-2.5 text-xs text-stone">
            <li>
              <Link href="/about" className="hover:text-warmWhite transition-colors">
                About TFTS
              </Link>
            </li>
            <li>
              <Link href="/how-we-work" className="hover:text-warmWhite transition-colors">
                How We Work & Standards
              </Link>
            </li>
            <li>
              <Link href="/cases" className="hover:text-warmWhite transition-colors">
                Case Study Archives
              </Link>
            </li>
            <li>
              <Link href="/insights" className="hover:text-warmWhite transition-colors">
                Intelligence Publications
              </Link>
            </li>
            <li>
              <Link href="/professional-clients" className="hover:text-warmWhite transition-colors">
                Professional Clients
              </Link>
            </li>
            <li>
              <Link href="/confidential-enquiry" className="hover:text-warmWhite transition-colors">
                Confidential Enquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance & Standards Bar */}
      <div className="border-t border-oliveGrey/60 bg-obsidian-pure px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-[11px] text-stone-muted">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-brass" />
              <span>BS 102000 Code of Conduct</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-brass" />
              <span>Data Protection Act 2018 (ICO Registered)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-brass" />
              <span>CPR Part 31 / 32 Admissible Evidence</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-brass" />
              <span>Professional Indemnity Insured</span>
            </div>
          </div>
          <div className="text-stone-dark font-mono text-[10px]">
            STRICTLY PRIVATE & CONFIDENTIAL · NOT A CONSUMER MASS AGENCY
          </div>
        </div>
      </div>

      {/* Copyright & Legal Sub-bar */}
      <div className="border-t border-oliveGrey/40 px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-stone-muted font-mono uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} TFTS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-stone transition-colors">
              PRIVACY POLICY
            </Link>
            <Link href="/compliance" className="hover:text-stone transition-colors">
              LEGAL STANDARDS & RIPA
            </Link>
            <Link href="/terms" className="hover:text-stone transition-colors">
              TERMS OF INSTRUCTION
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
