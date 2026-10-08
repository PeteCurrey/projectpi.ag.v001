"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSParallax from "@/components/experience/TFTSParallax";
import TFTSHorizontalScroll from "@/components/experience/TFTSHorizontalScroll";
import TFTSViewportMedia from "@/components/experience/TFTSViewportMedia";
import { useReducedMotion } from "@/lib/motion/use-reduced-motion";
import { TFTS_MOTION } from "@/lib/motion/config";

// ─── Disciplines data with environmental cinematic backdrops ──────────────────

const disciplines = [
  {
    number: "01",
    title: "Corporate\nInvestigations",
    description:
      "Internal fraud, procurement manipulation, executive misconduct, and hostile competitor intelligence.",
    href: "/services/corporate-investigations",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Contemporary corporate headquarters atrium and quiet executive review suite",
  },
  {
    number: "02",
    title: "Strategic Intelligence\n& OSINT",
    description:
      "Open-source forensic research, digital footprint mapping, corporate profiling, and executive vetting.",
    href: "/services/intelligence",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Global telecommunication topology and network data nodes in cool steel hues",
  },
  {
    number: "03",
    title: "Asset & People\nTracing",
    description:
      "Beneficial ownership identification, offshore asset mapping, debtor tracing, and elusive subject location.",
    href: "/services/asset-tracing",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Canary Wharf commercial banking towers and Thames waterfront skyline",
  },
  {
    number: "04",
    title: "Covert Surveillance\nOperations",
    description:
      "Discreet physical observation, electronic trail verification, and contemporaneous evidence capture under strict legal necessity.",
    href: "/services/covert-surveillance",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "London street corner at twilight under ambient streetlamp illumination",
  },
  {
    number: "05",
    title: "Litigation &\nDispute Support",
    description:
      "High Court and Chancery dispute evidence, CPR Part 31/32 trial bundles, and sworn witness proofs of evidence.",
    href: "/services/litigation-support",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Royal Courts of Justice stone facade and Gothic arches on the Strand",
  },
  {
    number: "06",
    title: "Legal Process\nServing",
    description:
      "Time-critical nationwide service of statutory demands, petitions, and injunctions under CPR Part 6.",
    href: "/services/process-serving",
    image: "https://images.unsplash.com/photo-1761052840462-21e1a3d81c40?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Gothic court architecture in Central London at dusk with rain-slicked pavement",
  },
];

// ─── Instructing sectors ───────────────────────────────────────────────────────

const sectors = [
  {
    title: "Solicitors & Barristers",
    body: "Litigation support, witness statement taking, and CPR Part 6 process serving.",
    href: "/professional-clients/solicitors",
  },
  {
    title: "Insolvency Practitioners",
    body: "Debtor asset tracing, antecedent transaction enquiries, and director profiling.",
    href: "/professional-clients/insolvency-practitioners",
  },
  {
    title: "Corporate Counsel",
    body: "Internal investigations, vendor fraud audits, and executive integrity vetting.",
    href: "/professional-clients/corporate-counsel",
  },
  {
    title: "Family Offices",
    body: "Confidential advisory, transaction due diligence, and discreet background enquiries.",
    href: "/professional-clients/private-offices",
  },
];

// ─── Masthead onload animation ─────────────────────────────────────────────────

function useMastheadReveal() {
  const masterRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const el = masterRef.current;
    if (!el || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".masthead-badge", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        .from(
          ".masthead-line",
          {
            y: 60,
            opacity: 0,
            duration: TFTS_MOTION.duration.slow,
            stagger: TFTS_MOTION.stagger.loose,
            ease: TFTS_MOTION.ease.reveal,
          },
          "-=0.4"
        )
        .from(
          ".masthead-body",
          {
            y: 24,
            opacity: 0,
            duration: TFTS_MOTION.duration.base,
            ease: TFTS_MOTION.ease.reveal,
          },
          "-=0.6"
        );
    }, el);

    return () => ctx.revert();
  }, [prefersReduced]);

  return masterRef;
}

// ─── Main composition ──────────────────────────────────────────────────────────

export default function HomepageComposition() {
  const mastheadRef = useMastheadReveal();

  return (
    <div className="bg-paper text-ink selection:bg-ink selection:text-paper overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT I — MASTHEAD
          Full-viewport cinematic composition.
          Nuanced grading: preserves subtle steel, glass blue, and dusk tones
          instead of flat 100% grayscale.
          ═══════════════════════════════════════════════════════════════════════ */}
      <div
        ref={mastheadRef}
        className="relative min-h-screen min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-obsidian-pure"
        aria-label="TFTS — Masthead"
      >
        {/* Full-screen background image covering 100% of the viewport */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <TFTSViewportMedia
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2800&q=90"
            alt="City of London commercial architecture — steel and glass financial towers"
            aspectClass="h-full"
            scaleOnScroll={true}
            priority={true}
            imageFilter="contrast(1.1) brightness(0.72) saturate(0.85)"
            sizes="100vw"
            className="h-full w-full"
          />
        </div>

        {/* Multi-layer contrast shielding overlays — preserves atmospheric depth */}
        <div className="absolute inset-0 bg-obsidian-pure/55 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/90 z-[2] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent z-[2] pointer-events-none" />

        {/* Top & middle text zone */}
        <div className="relative z-10 max-w-[1680px] mx-auto w-full px-6 lg:px-12 xl:px-16 pt-32 md:pt-40 lg:pt-44 pb-8 flex-shrink-0">
          <span className="masthead-badge inline-block text-[10px] tracking-[0.28em] uppercase font-[300] text-brass-light mb-8 md:mb-12 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Independent Practice · Central London & UK-Wide
          </span>

          {/* Display headline */}
          <h1 className="font-[200] max-w-[1100px]">
            <span className="masthead-line block text-display-md lg:text-display-lg leading-[1.02] text-warmWhite drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Tactical field
            </span>
            <span className="masthead-line block text-display-md lg:text-display-lg leading-[1.02] text-warmWhite drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              intelligence and
            </span>
            <span className="masthead-line block text-display-md lg:text-display-lg leading-[1.02] text-warmWhite/70 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              bespoke investigations.
            </span>
          </h1>
        </div>

        {/* Bottom text zone */}
        <div className="relative z-10 max-w-[1680px] mx-auto w-full px-6 lg:px-12 xl:px-16 pb-12 md:pb-16 lg:pb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-white/10 pt-6">
            <p className="masthead-body text-sm md:text-base font-[300] text-warmWhite/90 max-w-xl leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
              Instructed by corporate leadership, commercial dispute litigators,
              insolvency practitioners, and private offices facing critical
              information asymmetry.
            </p>

            <div className="masthead-body hidden md:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase font-[300] text-stone-muted/80">
              <span className="w-1.5 h-1.5 bg-brass" />
              <span>Central London &amp; UK-Wide Operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT II — THE MANDATE
          Asymmetric Spatial Composition:
          Left 7 cols: Editorial Statement & Statutory Perimeter
          Right 5 cols: Documentary Evidence Plate (Forensic files & conference suite)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="py-28 md:py-40 border-t border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left 7 cols: Typography & Authority */}
            <div className="lg:col-span-7 space-y-10">
              <TFTSTextReveal
                as="span"
                mode="line"
                className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted"
              >
                The Mandate
              </TFTSTextReveal>

              <TFTSTextReveal
                as="h2"
                mode="line"
                delay={0.1}
                className="text-display-sm font-[200] text-ink leading-[1.08] max-w-[900px]"
              >
                Discretion, evidentiary precision, and absolute procedural integrity.
              </TFTSTextReveal>

              <TFTSTextReveal
                as="p"
                mode="line"
                delay={0.2}
                className="text-lg md:text-xl font-[300] text-ink-muted leading-relaxed max-w-[780px]"
              >
                We operate where standard commercial enquiries and routine public registry
                checks fail to provide definitive clarity. Whether identifying the architects
                of internal procurement fraud, tracing dissipated assets across complex
                corporate vehicles, conducting lawful physical surveillance, or establishing
                witness statements for High Court litigation, our work product is built to
                withstand hostile legal scrutiny.
              </TFTSTextReveal>

              <TFTSTextReveal
                as="p"
                mode="line"
                delay={0.3}
                className="text-base md:text-lg font-[300] text-ink-muted leading-relaxed max-w-[780px]"
              >
                Every instruction is executed under the direct supervision of experienced
                operational directors. We do not sub-contract matters to unvetted
                intermediaries. All intelligence is gathered in strict compliance with the
                Data Protection Act 2018, the Civil Procedure Rules, and non-disclosure
                obligations.
              </TFTSTextReveal>

              {/* Credentials text ledger */}
              <div className="pt-6 border-t border-rule/40">
                <TFTSTextReveal
                  as="p"
                  mode="line"
                  delay={0.4}
                  className="text-xs font-[300] text-ink-muted leading-loose tracking-wider uppercase"
                >
                  BS 102000 Code of Conduct · CPR Parts 31, 32 &amp; 35 · ICO Registered · UK GDPR · Professional Indemnity Insured
                </TFTSTextReveal>
              </div>
            </div>

            {/* Right 5 cols: Architectural Documentary Plate */}
            <div className="lg:col-span-5 space-y-4 lg:pt-8">
              <TFTSParallax speed={25} className="w-full">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-rule/50">
                  <TFTSImageReveal mode="wipe-up" className="absolute inset-0 w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85"
                      alt="Structured evidentiary examination files and review documentation on oak conference table"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                      style={{ filter: "contrast(1.08) brightness(0.88) saturate(0.85)" }}
                    />
                  </TFTSImageReveal>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-6 right-6 text-[10px] tracking-[0.2em] uppercase font-[300] text-warmWhite">
                    Evidentiary dossier compilation · Central London chambers
                  </div>
                </div>
              </TFTSParallax>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT III — PRACTICE DISCIPLINES
          Desktop: horizontal scroll sequence with atmospheric environmental backdrops.
          Each panel is an immersive spatial experience.
          Mobile: vertical list with environmental image panels.
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-rule/40">
        {/* Section label */}
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 pt-16 pb-0">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-12 md:pb-16">
            <TFTSTextReveal
              as="span"
              mode="line"
              className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted"
            >
              Practice Areas
            </TFTSTextReveal>
            <Link
              href="/services"
              className="text-[11px] font-[300] tracking-[0.2em] uppercase text-ink/50 hover:text-ink transition-colors duration-300"
            >
              All 20 Capabilities →
            </Link>
          </div>
        </div>

        {/* Horizontal scroll — desktop */}
        <TFTSHorizontalScroll panelCount={disciplines.length} scrollMultiplier={1.1}>
          {disciplines.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              className={`group relative flex-shrink-0 w-full lg:w-screen flex flex-col lg:flex-row items-start lg:items-end justify-between
                px-6 lg:px-12 xl:px-16 py-16 lg:py-24 border-b border-rule/40
                lg:border-b-0 lg:border-r border-rule/30 overflow-hidden
                hover:bg-paper-stone/40 transition-colors duration-500`}
              aria-label={`${item.title.replace("\n", " ")} — ${item.description}`}
            >
              {/* Environmental atmospheric photo layer */}
              <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                  style={{ filter: "contrast(1.08) brightness(0.9) saturate(0.8)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/95" />
              </div>

              {/* Left: number + title */}
              <div className="relative z-10 max-w-[600px] lg:max-w-[55vw] space-y-6">
                <span className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                  {item.number}
                </span>
                <h2
                  className="text-display-sm lg:text-display-md font-[200] text-ink leading-[1.04] whitespace-pre-line"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item.title}
                </h2>
              </div>

              {/* Right: description + arrow */}
              <div className="relative z-10 mt-10 lg:mt-0 lg:max-w-[340px] space-y-6 lg:text-right">
                <p className="text-sm md:text-base font-[300] text-ink-muted leading-relaxed">
                  {item.description}
                </p>
                <div className="inline-block text-[11px] tracking-[0.2em] uppercase font-[300] text-ink/60 group-hover:text-ink transition-colors duration-300">
                  Explore Discipline →
                </div>
              </div>

              {/* Large background number */}
              <span
                className="absolute bottom-6 right-6 lg:right-12 text-[120px] lg:text-[200px] font-[200] text-ink/[0.03] leading-none select-none pointer-events-none"
                aria-hidden="true"
              >
                {item.number}
              </span>
            </Link>
          ))}
        </TFTSHorizontalScroll>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT IV — ARCHITECTURAL BREAK
          Full-bleed atmospheric dusk London streetscape.
          Replaces previous duplicate photo with an evocative, high-contrast
          operational plate.
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-[75vh] flex items-end overflow-hidden border-t border-rule/40">
        <TFTSParallax speed={45} className="absolute inset-0">
          <div className="relative w-full h-full min-h-[85vh]">
            <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2800&q=90"
                alt="Atmospheric Central London streetscape at dusk under warm amber architectural streetlights"
                fill
                className="object-cover"
                style={{ filter: "contrast(1.1) brightness(0.68) saturate(0.85)" }}
                sizes="100vw"
              />
            </TFTSImageReveal>
          </div>
        </TFTSParallax>

        {/* Multi-layer gradient wash for clean text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent pointer-events-none z-10" />

        {/* Single sentence over the image */}
        <div className="relative z-20 max-w-[1680px] mx-auto w-full px-6 lg:px-12 xl:px-16 pb-20 md:pb-28">
          <TFTSTextReveal
            as="p"
            mode="line"
            triggerStart="top 90%"
            className="text-display-sm font-[200] text-warmWhite max-w-[900px] leading-[1.1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Trusted by legal counsel, corporate boards, and financial institutions.
          </TFTSTextReveal>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT V — INSTRUCTING SECTORS
          Asymmetric editorial spread paired with institutional architectural plate.
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="py-28 md:py-40 border-t border-rule/40">
        <div className="max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-20 items-start mb-20 lg:mb-28">
            {/* Label */}
            <div className="lg:col-span-3">
              <TFTSTextReveal
                as="span"
                mode="line"
                className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted"
              >
                Instructing Sectors
              </TFTSTextReveal>
            </div>

            {/* Statement */}
            <div className="lg:col-span-9">
              <TFTSTextReveal
                as="h2"
                mode="line"
                delay={0.1}
                className="text-display-sm font-[200] text-ink leading-[1.08] max-w-[820px]"
              >
                We accept instructions exclusively from professional and institutional clients
                who require unvarnished, admissible facts.
              </TFTSTextReveal>
            </div>
          </div>

          {/* Sector grid: List + Architectural Anchor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-8 border-t border-rule/40 divide-y divide-rule/40">
              {sectors.map((sector, i) => (
                <Link
                  key={sector.title}
                  href={sector.href}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 items-baseline py-8 md:py-10 hover:bg-paper-stone/30 px-2 transition-colors duration-300"
                >
                  <span className="md:col-span-1 text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted">
                    0{i + 1}
                  </span>
                  <h3 className="md:col-span-4 text-xl md:text-2xl font-[200] text-ink group-hover:text-ink-muted transition-colors duration-300">
                    {sector.title}
                  </h3>
                  <p className="md:col-span-6 text-sm font-[300] text-ink-muted leading-relaxed">
                    {sector.body}
                  </p>
                  <div className="md:col-span-1 text-right text-ink/30 group-hover:text-ink transition-colors duration-300 text-base">
                    →
                  </div>
                </Link>
              ))}
            </div>

            {/* Sector Architectural Plate */}
            <div className="lg:col-span-4">
              <div className="relative aspect-[3/4] w-full overflow-hidden border border-rule/50">
                <TFTSImageReveal mode="wipe-up" className="absolute inset-0 w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                    alt="City of London financial institution entrance — institutional advisory chambers"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                    style={{ filter: "contrast(1.08) brightness(0.85) saturate(0.85)" }}
                  />
                </TFTSImageReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-5 right-5 text-[10px] tracking-[0.2em] uppercase font-[300] text-warmWhite">
                  Institutional Client Chambers · Central London
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          ACT VI — CLOSING STATEMENT
          Full-viewport. Word-by-word reveal. Single CTA.
          Decisive, quiet, immersive conclusion.
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative min-h-screen flex flex-col justify-between py-20 md:py-28 border-t border-rule/40 overflow-hidden bg-paper">
        {/* Deep ambient texture in background */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2800&q=90"
            alt="London Thames skyline ambient texture"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-[1680px] mx-auto px-6 lg:px-12 xl:px-16 w-full flex-grow flex flex-col justify-center">

          {/* The statement */}
          <div className="space-y-6 md:space-y-8 mb-20 md:mb-28">
            <TFTSTextReveal
              as="span"
              mode="line"
              className="block text-[10px] tracking-[0.28em] uppercase font-[300] text-ink-muted"
            >
              Direct Instruction
            </TFTSTextReveal>

            <TFTSTextReveal
              as="h2"
              mode="word"
              delay={0.1}
              duration={TFTS_MOTION.duration.cinematic}
              stagger={TFTS_MOTION.stagger.wide}
              className="text-display-lg lg:text-display-xl font-[200] text-ink max-w-[1200px] leading-[1.0]"
            >
              Initiate a confidential enquiry.
            </TFTSTextReveal>
          </div>

          {/* CTA + contact */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-12 border-t border-rule/40 pt-12">
            <TFTSTextReveal
              as="div"
              mode="line"
              delay={0.3}
              className="space-y-2 text-sm font-[300] text-ink-muted"
            >
              <div>Consulting Suite: Mayfair, London W1</div>
              <div>Direct Dispatch: enquiries@tfts.co.uk</div>
              <div>Urgent Process Serving: 24-hour turnaround across England &amp; Wales</div>
            </TFTSTextReveal>

            <TFTSTextReveal as="div" mode="line" delay={0.4}>
              <Link
                href="/confidential-enquiry"
                className="inline-flex items-center border border-ink px-8 py-4 text-[11px] tracking-[0.24em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-all duration-300 rounded-none"
              >
                Submit Confidential Instruction
              </Link>
            </TFTSTextReveal>
          </div>
        </div>
      </div>

    </div>
  );
}
