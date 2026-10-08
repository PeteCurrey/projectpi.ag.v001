import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { insightsData } from "@/lib/data/insightsData";
import { getCanonicalUrl } from "@/lib/config/brand";
import TFTSTextReveal from "@/components/experience/TFTSTextReveal";

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

  return (
    <div className="bg-paper min-h-screen text-ink">
      {/* Masthead */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-rule">
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

      {/* Main Publication Directory */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          {/* Category Tabs — rule-based underline, no pills */}
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

          {/* Article Ledger — typographic open ledger */}
          <div className="divide-y divide-rule">
            {insightsData.map((article) => (
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
