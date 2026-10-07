import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { insightsData, InsightArticle } from "@/lib/data/insightsData";

interface EditorialInsightsBridgeProps {
  insightSlugs?: string[];
  variant?: "light" | "stone" | "dark";
}

export default function EditorialInsightsBridge({
  insightSlugs,
  variant = "light",
}: EditorialInsightsBridgeProps) {
  if (!insightSlugs || insightSlugs.length === 0) return null;

  const relevantArticles: InsightArticle[] = insightSlugs
    .map((slug) => insightsData.find((art) => art.slug === slug))
    .filter((art): art is InsightArticle => art !== undefined);

  if (relevantArticles.length === 0) return null;

  const isDark = variant === "dark";
  const ruleClass = isDark ? "border-[#343832]" : "border-[#D6D3CB]";
  const mutedTextClass = isDark ? "text-[#9E9A90]" : "text-[#6F706A]";
  const headingTextClass = isDark ? "text-[#F5F3EE]" : "text-[#111111]";

  return (
    <div className="space-y-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#D6D3CB] gap-4">
        <div className="space-y-2">
          <span className={`text-xs tracking-[0.25em] uppercase font-light block ${mutedTextClass}`}>
            INTELLIGENCE LIBRARY · PUBLISHED DOCTRINE
          </span>
          <h2 className={`text-3xl sm:text-4xl font-extralight tracking-tight ${headingTextClass}`}>
            Briefings &amp; Analysis
          </h2>
        </div>
        <Link
          href="/insights"
          className="text-xs tracking-[0.2em] uppercase font-light text-[#6F706A] hover:text-[#111111] transition-colors"
        >
          All Briefings &rarr;
        </Link>
      </div>

      {/* Editorial Reading List (Rules, No Cards) */}
      <div className={`border-t ${ruleClass}`}>
        {relevantArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className={`py-8 border-b ${ruleClass} group flex flex-col md:flex-row md:items-baseline justify-between gap-6 transition-colors`}
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] tracking-widest uppercase font-light text-[#A58A5C] block">
                {article.category} · {article.readTime}
              </span>
              <h3 className={`text-xl sm:text-2xl font-extralight ${headingTextClass} group-hover:text-[#A58A5C] transition-colors`}>
                {article.title}
              </h3>
              <p className={`text-xs sm:text-sm font-light leading-relaxed ${mutedTextClass}`}>
                {article.excerpt}
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-light text-[#A58A5C] group-hover:text-[#111111] transition-colors flex-shrink-0">
              <span>READ BRIEFING</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
