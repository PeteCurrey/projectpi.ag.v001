import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { insightsData } from "@/lib/data/insightsData";

export default function InsightsPreview() {
  return (
    <section className="py-28 md:py-36 bg-obsidian-pure border-b border-oliveGrey/70">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-oliveGrey/60 gap-6">
          <div className="space-y-3">
            <span className="text-[11px] uppercase font-mono tracking-ultra text-brass block">
              PUBLICATIONS & DOCTRINE
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-warmWhite tracking-tight font-serif uppercase">
              Intelligence & Insights
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-stone max-w-md font-light leading-relaxed">
            Analytical papers and briefings on legal frameworks, investigative tradecraft,
            corporate fraud mechanisms, and open-source intelligence.
          </div>
        </div>

        {/* Sophisticated Editorial Index (Not a generic blog grid) */}
        <div className="border border-oliveGrey divide-y divide-oliveGrey/80 bg-obsidian-surface/40 rounded-xs">
          {insightsData.slice(0, 4).map((article, idx) => (
            <div
              key={article.slug}
              className="p-6 md:p-8 hover:bg-obsidian-elevated/70 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                {/* Meta column */}
                <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start gap-2 text-[11px] font-mono text-stone-muted">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-brass rounded-xs" />
                    <span className="text-brass uppercase tracking-widest">{article.category}</span>
                  </div>
                  <div>{article.date}</div>
                  <div className="text-stone-dark">{article.readTime}</div>
                </div>

                {/* Article Content */}
                <div className="md:col-span-7 space-y-2">
                  <h3 className="text-xl md:text-2xl font-light text-warmWhite font-serif group-hover:text-brass transition-colors tracking-wide">
                    <Link href={`/insights/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs md:text-sm text-stone font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                {/* Right Arrow Action */}
                <div className="md:col-span-2 flex md:justify-end items-center">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-stone group-hover:text-warmWhite transition-colors"
                  >
                    <span>READ PAPER</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-stone-muted uppercase tracking-widest">
            <span>INDEX TOPICS:</span>
            {["CORPORATE", "LEGAL", "INTELLIGENCE", "SURVEILLANCE", "FRAUD", "DUE DILIGENCE"].map((topic) => (
              <span key={topic} className="px-2 py-1 bg-obsidian-surface border border-oliveGrey/60 rounded-xs">
                {topic}
              </span>
            ))}
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center space-x-3 text-xs tracking-widest uppercase font-light text-stone hover:text-warmWhite transition-colors py-2 px-5 border border-oliveGrey hover:border-brass rounded-xs"
          >
            <span>Explore Full Intelligence Archive</span>
            <ArrowRight className="w-3.5 h-3.5 text-brass" />
          </Link>
        </div>
      </div>
    </section>
  );
}
