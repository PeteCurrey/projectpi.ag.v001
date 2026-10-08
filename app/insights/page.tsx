import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { insightsData } from "@/lib/data/insightsData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";
import TFTSImageReveal from "@/components/experience/TFTSImageReveal";
import TFTSParallax from "@/components/experience/TFTSParallax";

export const metadata: Metadata = {
  title: "Intelligence & Insights | Analysis on Law, OSINT & Fraud",
  description:
    "Authoritative intelligence doctrine, legal analyses, surveillance law in the UK, open-source intelligence methods, and corporate due diligence papers.",
  alternates: {
    canonical: getCanonicalUrl("/insights"),
  },
};

export default function InsightsPage() {
  const categories = [
    "ALL",
    "CORPORATE",
    "LEGAL",
    "INTELLIGENCE",
    "SURVEILLANCE",
    "FRAUD",
    "DUE DILIGENCE",
  ];

  const featured = insightsData[0];
  const remainingArticles = insightsData.slice(1);

  return (
    <div className="bg-paper min-h-screen text-ink">

      {/* ── 1. MASTHEAD ── */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b border-rule">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <TFTSTextReveal mode="lines">
            <div className="max-w-5xl space-y-6">
              <span className="text-[11px] tracking-[0.22em] uppercase font-[300] text-ink-muted block">
                PUBLICATIONS &amp; DOCTRINE · INTELLIGENCE BRIEFINGS
              </span>
              <h1 className="text-display-xl font-[200] tracking-tight leading-[1.04] text-ink">
                Intelligence &amp; Insights.
              </h1>
              <p className="text-base sm:text-lg font-[300] text-ink-muted max-w-3xl leading-relaxed">
                In-depth analytical papers examining legal frameworks, Civil Procedure Rules compliance,
                investigative tradecraft, asset tracing methodologies, and corporate fraud defense.
              </p>
            </div>
          </TFTSTextReveal>
        </div>
      </section>

      {/* ── 2. FEATURED EDITORIAL DOSSIER BRIEFING ── */}
      {featured && (
        <section className="py-16 md:py-24 border-b border-rule bg-paper-stone/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column (5/12): Editorial Cover Plate */}
              <div className="lg:col-span-5 space-y-3">
                <TFTSParallax speed={20}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden border border-rule/50">
                    <TFTSImageReveal mode="wipe-right" className="absolute inset-0 w-full h-full">
                      <Image
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=85"
                        alt="Featured intelligence briefing examination documents and dossier files"
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        style={{ filter: "contrast(1.08) brightness(0.85) saturate(0.85)" }}
                        priority
                      />
                    </TFTSImageReveal>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-4 right-4 text-[10px] tracking-[0.2em] uppercase font-[300] text-warmWhite">
                      Featured Monograph · Evidence &amp; Legal Strategy
                    </div>
                  </div>
                </TFTSParallax>
              </div>

              {/* Right Column (7/12): Featured Narrative */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center space-x-3 text-xs font-[300]">
                  <span className="text-brass uppercase tracking-[0.2em]">{featured.category}</span>
                  <span className="text-rule">/</span>
                  <span className="text-ink-muted">{featured.date}</span>
                  <span className="text-rule">/</span>
                  <span className="text-ink-muted">{featured.readTime}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight leading-tight">
                  <Link href={`/insights/${featured.slug}`} className="hover:text-ink-muted transition-colors">
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-sm sm:text-base font-[300] text-ink-muted leading-relaxed">
                  {featured.summary}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="inline-block border border-britishGreen px-6 py-3 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-britishGreen hover:text-paper transition-colors duration-300 rounded-none"
                  >
                    Read Complete Monograph →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. MAIN PUBLICATION DIRECTORY ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Category Tabs */}
          <div className="border-b border-rule pb-6 mb-12 flex flex-wrap gap-8">
            {categories.map((cat, idx) => (
              <span
                key={cat}
                className={[
                  "text-xs font-[300] uppercase tracking-[0.2em] pb-2 cursor-pointer transition-all",
                  idx === 0
                    ? "text-ink border-b-2 border-ink"
                    : "text-ink-muted border-b-2 border-transparent hover:text-ink hover:border-ink",
                ].join(" ")}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Article Ledger */}
          <div className="divide-y divide-rule">
            {remainingArticles.map((article) => (
              <article
                key={article.slug}
                className="py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-paper-stone/40 transition-colors group"
              >
                {/* Meta Column */}
                <div className="lg:col-span-2 space-y-2">
                  <span className="text-xs font-[300] uppercase tracking-[0.16em] text-brass block">
                    {article.category}
                  </span>
                  <span className="text-xs font-[300] text-ink-muted block">
                    {article.date}
                  </span>
                  <span className="text-xs font-[300] text-ink-muted block">
                    {article.readTime}
                  </span>
                </div>

                {/* Body Column */}
                <div className="lg:col-span-8 space-y-3">
                  <h2 className="text-xl sm:text-2xl font-[200] text-ink group-hover:text-ink-muted transition-colors">
                    <Link href={`/insights/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-sm font-[300] text-ink-muted leading-relaxed">
                    {article.summary}
                  </p>
                  {article.relatedServices && article.relatedServices.length > 0 && (
                    <p className="pt-1 text-[10px] font-[300] text-ink-muted uppercase tracking-wider">
                      {article.relatedServices.map((rel) => rel.title).join(" · ")}
                    </p>
                  )}
                </div>

                {/* Action Column */}
                <div className="lg:col-span-2 flex lg:justify-end items-start">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-xs font-[300] uppercase tracking-[0.2em] text-ink-muted group-hover:text-ink transition-colors"
                  >
                    READ PAPER →
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
