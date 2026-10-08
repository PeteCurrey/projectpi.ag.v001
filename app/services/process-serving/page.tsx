import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { processServingHub } from "@/lib/data/processServingData";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSParallax from "@/components/experience/TFTSParallax";

export const metadata: Metadata = {
  title: processServingHub.metaTitle,
  description: processServingHub.metaDescription,
};

const stages = [
  {
    num: "01",
    label: "INSTRUCT",
    title: "Formal Instruction",
    body: "Formal instruction is received, scoped and documented. Matter type, respondent identity, address for service, deadline and procedural context are confirmed.",
    deliverable: "Instruction confirmation & matter reference issued within the hour.",
  },
  {
    num: "02",
    label: "LOCATE",
    title: "Address Verification",
    body: "The respondent's current address is verified before every attendance. Where address is uncertain, intelligence methodology is applied to establish a serviceable location.",
    deliverable: "Location report or confirmed address for service prior to attendance.",
  },
  {
    num: "03",
    label: "ATTEMPT",
    title: "Service Execution",
    body: "Our agents attend at the service address and execute service in accordance with the applicable Rules — CPR Part 6 or the Insolvency Rules 2016 as appropriate.",
    deliverable: "Contemporaneous attendance log produced at point of service.",
  },
  {
    num: "04",
    label: "DOCUMENT",
    title: "Contemporaneous Record",
    body: "Every attendance is recorded contemporaneously: time, date, location, method, identity confirmation, outcome. Nothing is reconstructed after the event.",
    deliverable: "Timestamped photographic and written record of each attendance.",
  },
  {
    num: "05",
    label: "REPORT",
    title: "Court-Ready Evidence",
    body: "A court-ready proof of service and attendance record is provided. Where required, we prepare a witness statement or affidavit of service for use in proceedings.",
    deliverable: "Sworn affidavit or CPR-compliant certificate of service delivered.",
  },
];

const professionalClients = [
  { label: "Solicitors", href: "/professional-clients/solicitors" },
  { label: "Insolvency Practitioners", href: "/professional-clients/insolvency-practitioners" },
  { label: "Debt Recovery Firms", href: "/professional-clients/debt-recovery" },
  { label: "Corporate Creditors", href: "/professional-clients/corporate-clients" },
  { label: "Commercial Landlords", href: "/professional-clients/commercial-landlords" },
];

const relatedServices = [
  { label: "People Tracing", href: "/services/people-tracing" },
  { label: "Witness Enquiries", href: "/services/witness-enquiries" },
  { label: "Litigation Support", href: "/services/litigation-support" },
  { label: "Evidence Gathering", href: "/services/evidence-gathering" },
];

export default function ProcessServingHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "TFTS Process Serving UK",
    description: processServingHub.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: "TFTS — Tactical Field Intelligence Service",
      url: "https://tfts.co.uk",
    },
    areaServed: "United Kingdom",
  };

  return (
    <div className="bg-paper text-ink min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. OPENING ACT ── Full-viewport hero image */}
      <section className="relative h-[100svh] overflow-hidden">
        <TFTSParallax speed={40} className="absolute inset-0">
          <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2800&q=90"
              alt="The Royal Courts of Justice on the Strand in London — gothic stonework and institutional authority"
              fill
              className="object-cover"
              style={{ filter: "contrast(1.08) brightness(0.72) saturate(0.85)" }}
              sizes="100vw"
              priority
            />
          </TFTSImageReveal>
        </TFTSParallax>

        {/* Gradient fade to paper at base */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper/95 via-paper/20 to-transparent" />

        {/* Bottom-anchored headline */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-28">
          <TFTSTextReveal mode="lines">
            <div className="space-y-4">
              <span className="text-[11px] tracking-[0.28em] uppercase font-[300] text-bronze block">
                CPR Part 6 — Civil Procedure Rules
              </span>
              <h1 className="text-display-xl font-[200] text-paper/95 tracking-tight leading-[1.04]">
                Process Serving
              </h1>
              <p className="text-display-sm font-[200] text-paper/70 leading-[1.1]">
                When service cannot fail.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. STATEMENT SECTION ── Asymmetric editorial layout */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Left: 7/12 */}
            <div className="md:col-span-7 space-y-8">
              <TFTSTextReveal mode="lines">
                <div className="space-y-6">
                  <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                    CPR Part 6 — Civil Procedure Rules
                  </span>
                  <h2 className="text-display-sm font-[200] text-ink leading-[1.08]">
                    Serving documents is not simply about delivery.
                  </h2>
                  <p className="text-sm font-[300] text-ink-muted leading-relaxed max-w-xl">
                    {processServingHub.position}
                  </p>
                </div>
              </TFTSTextReveal>
            </div>

            {/* Right: 5/12 */}
            <div className="md:col-span-5 space-y-10">
              <TFTSTextReveal mode="lines">
                <p className="text-base font-[300] text-ink-muted leading-relaxed">
                  {processServingHub.intro}
                </p>
              </TFTSTextReveal>

              {/* Trust points — rule-separated list, no icons */}
              <div className="divide-y divide-rule">
                {processServingHub.trustPoints.map((point, idx) => (
                  <div key={idx} className="py-4">
                    <p className="text-sm font-[300] text-ink leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICE TYPES ── Open typographic ledger */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <TFTSTextReveal mode="lines">
            <div className="mb-14 space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Service Catalogue
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Document Types &amp; Services
              </h2>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule">
            {processServingHub.documentTypes.map((doc, idx) => (
              <Link
                key={idx}
                href={`/services/process-serving/${doc.slug}`}
                className="group py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-paper-stone/50 transition-colors -mx-6 px-6 lg:-mx-12 lg:px-12"
              >
                <span className="md:col-span-1 text-xs font-[300] text-ink-muted">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="md:col-span-4 text-xl font-[200] text-ink group-hover:text-ink transition-colors">
                  {doc.title}
                </h3>
                <p className="md:col-span-6 text-sm font-[300] text-ink-muted leading-relaxed">
                  {doc.body}
                </p>
                <div className="md:col-span-1 flex justify-end">
                  <span className="text-lg font-[200] text-ink-muted group-hover:text-ink transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── Scroll-driven numbered sequence */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <TFTSTextReveal mode="lines">
            <div className="mb-16 space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Methodology
              </span>
              <h2 className="text-display-sm font-[200] text-ink">
                Operational Protocol
              </h2>
            </div>
          </TFTSTextReveal>

          <div className="space-y-0 divide-y divide-rule">
            {stages.map((stage, idx) => (
              <TFTSTextReveal key={idx} mode="lines">
                <div className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <span className="text-[80px] md:text-[120px] font-[200] text-britishGreen/15 leading-none">
                      {stage.num}
                    </span>
                  </div>
                  <div className="lg:col-span-4 space-y-2">
                    <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                      {stage.label}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-[200] text-ink">{stage.title}</h3>
                  </div>
                  <div className="lg:col-span-6 space-y-4 text-sm font-[300] text-ink-muted leading-relaxed">
                    <p>{stage.body}</p>
                    <div className="border-t border-rule pt-4 text-xs font-[300] text-ink">
                      {stage.deliverable}
                    </div>
                  </div>
                </div>
              </TFTSTextReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROFESSIONAL CLIENTS ── Large typographic list */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28">
          <TFTSTextReveal mode="lines">
            <div className="mb-14 space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Client Base
              </span>
              <h2 className="text-display-sm font-[200] text-ink">Who We Work With</h2>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule">
            {professionalClients.map((client, idx) => (
              <Link
                key={idx}
                href={client.href}
                className="group flex items-baseline justify-between py-7 hover:bg-paper-stone/50 transition-colors -mx-6 px-6 lg:-mx-12 lg:px-12"
              >
                <span className="text-2xl font-[200] text-ink group-hover:text-ink transition-colors">
                  {client.label}
                </span>
                <span className="text-lg font-[200] text-ink-muted group-hover:text-ink transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. RELATED SERVICES ── Typographic index */}
      <section className="border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
          <TFTSTextReveal mode="lines">
            <div className="mb-10">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                Related Investigations
              </span>
            </div>
          </TFTSTextReveal>

          <div className="divide-y divide-rule">
            {relatedServices.map((svc, idx) => (
              <Link
                key={idx}
                href={svc.href}
                className="group flex items-baseline justify-between py-5 hover:bg-paper-stone/50 transition-colors -mx-6 px-6 lg:-mx-12 lg:px-12"
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-[300] text-ink-muted w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-[300] text-ink">{svc.label}</span>
                </div>
                <span className="text-base font-[200] text-ink-muted group-hover:text-ink transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ── Full-bleed editorial */}
      <section className="bg-paper-stone border-t border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 md:py-32">
          <TFTSTextReveal mode="lines">
            <div className="space-y-10 max-w-4xl">
              <p className="text-display-md font-[200] text-ink leading-[1.06]">
                When service cannot fail.
              </p>
              <Link
                href="/confidential-enquiry?service=process-serving"
                className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
              >
                Discuss the requirement confidentially →
              </Link>
            </div>
          </TFTSTextReveal>
        </div>
      </section>
    </div>
  );
}
