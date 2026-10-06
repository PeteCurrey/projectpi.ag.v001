import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { insightsData } from "@/lib/data/insightsData";

import { getCanonicalUrl } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Intelligence & Insights | Analysis on Law, OSINT & Fraud",
  description: "Authoritative intelligence doctrine, legal analyses, surveillance law in the UK, open-source intelligence methods, and corporate due diligence papers.",
  alternates: {
    canonical: getCanonicalUrl("/insights"),
  },
};


export default function InsightsPage() {
  const categories = ["ALL", "CORPORATE", "LEGAL", "INTELLIGENCE", "SURVEILLANCE", "FRAUD", "DUE DILIGENCE"];

  return (
    <div className="bg-obsidian min-h-screen text-warmWhite">
      {/* Editorial Header */}
      <section className="py-24 md:py-32 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-4xl space-y-6">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              PUBLICATIONS & DOCTRINE · INTELLIGENCE BRIEFINGS
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Intelligence & Insights
            </h1>
            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed max-w-3xl">
              In-depth analytical papers examining legal frameworks, Civil Procedure Rules compliance,
              investigative tradecraft, asset tracing methodologies, and corporate fraud defense.
            </p>
          </div>
        </div>
      </section>

      {/* Main Publication Directory */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pb-12 mb-12 border-b border-oliveGrey/60">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-muted mr-2">
              DISCIPLINE:
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider border border-oliveGrey/80 hover:border-brass/70 text-stone hover:text-warmWhite bg-obsidian-surface cursor-pointer rounded-xs transition-colors"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Master Editorial List */}
          <div className="border border-oliveGrey divide-y divide-oliveGrey/80 bg-obsidian-surface/40 rounded-xs">
            {insightsData.map((article) => (
              <article
                key={article.slug}
                className="p-8 md:p-10 hover:bg-obsidian-elevated/70 transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Meta Column */}
                  <div className="lg:col-span-3 space-y-2 text-xs font-mono text-stone-muted">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-brass rounded-xs" />
                      <span className="text-brass uppercase tracking-widest">
                        {article.category}
                      </span>
                    </div>
                    <div>{article.date}</div>
                    <div className="text-stone-dark">{article.readTime}</div>
                  </div>

                  {/* Body Column */}
                  <div className="lg:col-span-7 space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif group-hover:text-brass transition-colors tracking-wide">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-sm text-stone font-light leading-relaxed">
                      {article.summary}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      {article.relatedServices.map((rel) => (
                        <span
                          key={rel.slug}
                          className="text-[10px] font-mono text-stone-muted uppercase bg-obsidian px-2 py-1 border border-oliveGrey/60 rounded-xs"
                        >
                          {rel.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Column */}
                  <div className="lg:col-span-2 flex lg:justify-end items-center">
                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-warmWhite transition-colors"
                    >
                      <span>READ PAPER</span>
                      <ArrowRight className="w-4 h-4 text-brass group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
