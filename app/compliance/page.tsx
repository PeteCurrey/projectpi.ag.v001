import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Shield, Scale, FileText, CheckCircle2 } from "lucide-react";

import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Legal Standards & RIPA Compliance | TFTS — Tactical Field Intelligence Service",
  description: "Comprehensive statutory framework governing private intelligence and corporate investigations in England and Wales. CPR, RIPA, and human rights standards.",
  alternates: {
    canonical: getCanonicalUrl("/compliance"),
  },
};


export default function CompliancePage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-4 border-b border-oliveGrey/70 pb-8">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
            STATUTORY COMPLIANCE & LEGAL PROTOCOLS
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-warmWhite font-serif uppercase">
            Legal Standards & Compliance
          </h1>
          <p className="text-xs font-mono text-stone-muted">
            GOVERNING FRAMEWORK FOR INVESTIGATIVE OPERATIONS IN THE UNITED KINGDOM
          </p>
        </div>

        <div className="space-y-10 text-xs sm:text-sm text-stone font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">1. The Principle of Evidentiary Purity</h2>
            <p>
              In English civil jurisprudence, the admissibility and weight of evidence are governed by the
              Civil Procedure Rules (CPR). Under CPR 32.1, the High Court and County Courts retain discretionary
              powers to exclude evidence that has been improperly obtained or lacks verifiable provenance.
            </p>
            <p>
              Our firm operates on an unyielding principle of evidentiary purity: all evidence is gathered
              through lawful methods, documented contemporaneously, and preserved without spoliation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">2. Regulation of Investigatory Powers Act (RIPA)</h2>
            <p>
              While RIPA 2000 formally regulates surveillance conducted by public authorities, our private
              practice voluntarily adopts RIPA's foundational principles—namely the twin tests of
              <strong>Necessity</strong> and <strong>Proportionality</strong>.
            </p>
            <p>
              No surveillance operation is deployed without evaluating whether the objective could be
              achieved through less intrusive means, and whether the intrusion is balanced against the
              potential harm or loss being investigated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">3. Criminal Justice & Courts Act 2015 (Section 57)</h2>
            <p>
              In personal injury and insurance claims defense, our surveillance and intelligence files are
              specifically prepared to satisfy Section 57 of the Criminal Justice and Courts Act 2015.
              Where fundamental dishonesty is established on the balance of probabilities, courts are mandated
              to dismiss the entire claim, including genuine elements of loss.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">4. Prohibited Methods</h2>
            <p>
              Our firm maintains an absolute refusal to engage in:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-light">
              <li>Unlawful computer access or hacking (Computer Misuse Act 1990)</li>
              <li>Unauthorized interception of live telecommunications (Investigatory Powers Act 2016)</li>
              <li>Procuring bank statements or private financial records through social engineering / 'blagging' (Section 170 DPA 2018)</li>
              <li>Trespass onto private residential curtilage or planting unauthorized tracking devices</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
