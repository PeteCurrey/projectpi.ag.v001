import React from "react";
import { Metadata } from "next";
import { BRAND_PREFERRED, EMAIL_DPO, getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Notice | TFTS — Tactical Field Intelligence Service",
  description: "Data protection protocols, GDPR Article 6 legitimate interests compliance, and data subject rights under the Data Protection Act 2018.",
  alternates: {
    canonical: getCanonicalUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper min-h-screen text-ink py-20 md:py-32 selection:bg-ink selection:text-paper">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-12">
        <div className="space-y-4 border-b border-rule pb-8">
          <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
            REGULATORY COMPLIANCE NOTICE
          </span>
          <h1 className="text-3xl sm:text-5xl font-[200] text-ink tracking-tight">
            Data Protection & Privacy Notice
          </h1>
          <p className="text-xs font-[300] text-ink-muted">
            LAST REVISED: OCTOBER 2024 · ICO REGISTRATION ACTIVE
          </p>
        </div>

        <div className="space-y-10 text-sm font-[300] text-ink-muted leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-[200] text-ink">1. Regulatory Framework & Data Controller</h2>
            <p>
              {BRAND_PREFERRED} operates as a registered data controller under the
              Data Protection Act 2018 (DPA 2018) and the UK General Data Protection Regulation (UK GDPR).
              We are registered with the Information Commissioner&apos;s Office (ICO).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-[200] text-ink">2. Lawful Basis for Processing (Article 6 UK GDPR)</h2>
            <p>
              Investigative and intelligence processing is conducted primarily under the lawful basis of:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ink">
              <li><span className="font-[400]">Legitimate Interests (Article 6(1)(f)):</span> Processing is necessary for the purposes of legitimate commercial, legal, or fraud-prevention interests pursued by our instructing clients or a third party, where such interests are not overridden by the fundamental rights of the data subject.</li>
              <li><span className="font-[400]">Legal Obligation & Legal Claims (Article 9(2)(f)):</span> Processing necessary for the establishment, exercise, or defense of legal claims, whether in court proceedings or in an administrative or out-of-court procedure.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-[200] text-ink">3. Legitimate Interests Assessment (LIA)</h2>
            <p>
              Prior to commencing any investigation, a formal Legitimate Interests Assessment is documented.
              This assessment rigorously balances the necessity and proportionality of the proposed inquiry against
              the subject&apos;s reasonable expectations of privacy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-[200] text-ink">4. Data Security & Cryptographic Handling</h2>
            <p>
              All client communications and investigative materials are held on encrypted, access-controlled systems.
              Physical and digital evidence is isolated, hashed using SHA-256 algorithms, and archived in accordance
              with ISO/IEC 27037 digital forensic standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-[200] text-ink">5. Enquiries</h2>
            <p>
              For any regulatory inquiries regarding data processing, contact our Data Protection Officer at:{" "}
              <span className="text-ink font-mono">{EMAIL_DPO}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
