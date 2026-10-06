import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Instruction & Retainer | TFTS — Tactical Field Intelligence Service",
  description: "Standard terms of professional instruction, confidentiality obligations, and fee structures for private intelligence services.",
};


export default function TermsPage() {
  return (
    <div className="bg-obsidian min-h-screen text-warmWhite py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-4 border-b border-oliveGrey/70 pb-8">
          <span className="text-[10px] font-mono uppercase tracking-ultra text-brass block">
            PROFESSIONAL ENGAGEMENT TERMS
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-warmWhite font-serif uppercase">
            Terms of Instruction
          </h1>
          <p className="text-xs font-mono text-stone-muted">
            COMMERCIAL CONDITIONS PRECEDENT FOR PROFESSIONAL CLIENT ENGAGEMENTS
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-stone font-light leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">1. Mandate & Scope of Services</h2>
            <p>
              All instructions are accepted pursuant to a formally signed Letter of Instruction (LOI)
              defining the scope of inquiries, operational parameters, fee structures, and agreed deliverables.
              No operations commence prior to execution of formal engagement documentation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">2. Mutual Confidentiality & Privilege</h2>
            <p>
              Both parties agree to hold all information, communications, and work product in strict
              confidence. Where instructed by legal counsel in contemplation of litigation, our work product
              is produced as an agent to legal counsel and falls under Legal Professional Privilege.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">3. Professional Fees & Retainer</h2>
            <p>
              Instructions are billed on either an agreed fixed-fee mandate or a staged retainer basis.
              Due to the operational nature of field deployment and analytical resourcing, an initial retainer
              is typically required prior to deployment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-light text-warmWhite font-serif">4. Governing Law & Jurisdiction</h2>
            <p>
              All contracts of instruction are governed by and construed in accordance with the laws
              of England and Wales, and subject to the exclusive jurisdiction of the English courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
