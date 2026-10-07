import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { insightsData, InsightArticle } from "@/lib/data/insightsData";

interface FlagshipInsightsBridgeProps {
  insightSlugs?: string[];
}

export default function FlagshipInsightsBridge({
  insightSlugs,
}: FlagshipInsightsBridgeProps) {
  if (!insightSlugs || insightSlugs.length === 0) return null;

  const relevantArticles: InsightArticle[] = insightSlugs
    .map((slug) => insightsData.find((art) => art.slug === slug))
    .filter((art): art is InsightArticle => art !== undefined);

  if (relevantArticles.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-b border-oliveGrey/60 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-oliveGrey/50 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-brass">
              <BookOpen className="w-4 h-4" />
              <span className="text-[10px] font-mono tracking-ultra uppercase">
                DOCTRINE &amp; ANALYSIS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light font-serif text-warmWhite">
              From the TFTS Intelligence Library
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-xs font-mono tracking-widest uppercase text-stone-muted hover:text-brass transition-colors"
          >
            All Briefings &rarr;
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relevantArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="p-8 border border-oliveGrey/60 bg-obsidian-surface/40 hover:bg-obsidian-surface/80 hover:border-brass/50 transition-all duration-300 rounded-xs flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-muted">
                  <span className="text-brass tracking-wider uppercase">{article.category}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-lg font-light text-warmWhite font-serif group-hover:text-brass transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-muted leading-relaxed font-light line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-oliveGrey/40 flex items-center justify-between text-xs font-mono text-stone group-hover:text-warmWhite">
                <span>READ BRIEFING</span>
                <ArrowRight className="w-3.5 h-3.5 text-brass group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
