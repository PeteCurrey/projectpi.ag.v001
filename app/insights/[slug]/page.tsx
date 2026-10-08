import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insightsData } from "@/lib/data/insightsData";
import { getCanonicalUrl } from "@/lib/config/brand";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return insightsData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | TFTS",
    };
  }

  return {
    title: `${article.title} | Intelligence & Insights | TFTS`,
    description: article.summary,
    alternates: {
      canonical: getCanonicalUrl(`/insights/${article.slug}`),
    },
    openGraph: {
      title: `${article.title} | TFTS`,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "TFTS — Tactical Field Intelligence Service",
      url: "https://tfts.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "TFTS",
      url: "https://tfts.co.uk",
    },
  };

  return (
    <article className="min-h-screen bg-paper text-ink selection:bg-ink selection:text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b border-rule">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-3 text-[11px] font-[300] text-ink-muted tracking-widest uppercase mb-8">
            <Link href="/insights" className="hover:text-ink transition-colors flex items-center space-x-1">
              <span>← INDEX</span>
            </Link>
            <span className="text-rule">/</span>
            <span className="text-ink">{article.category}</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-[200] text-ink tracking-tight leading-[1.12]">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-ink-muted font-[300] leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center space-x-6 pt-4 text-xs font-[300] text-ink-muted border-t border-rule">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span className="uppercase tracking-wider">ESTABLISHMENT INTELLIGENCE BRIEF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-16">
          {/* Executive Summary Callout */}
          <div className="p-8 bg-paper-stone border-l-2 border-ink space-y-2">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
              EXECUTIVE BRIEF SUMMARY
            </span>
            <p className="text-sm sm:text-base text-ink font-[300] leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Headings & Paragraphs */}
          <div className="space-y-12 text-sm sm:text-base text-ink-muted font-[300] leading-relaxed">
            {article.content.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-[200] text-ink tracking-tight pt-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="p-8 border border-rule space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
              OPERATIONAL TAKEAWAYS
            </span>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-ink font-[300]">
                  <span className="text-ink mr-1">—</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Capabilities */}
          <div className="pt-8 border-t border-rule space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-ink-muted block font-[300]">
              CORRESPONDING PRACTICE CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-4">
              {article.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-[300] text-ink hover:text-paper hover:bg-ink px-4 py-2 border border-rule hover:border-ink transition-colors"
                >
                  <span>{rel.title}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Consultation Prompt */}
      <section className="py-20 border-t border-rule bg-paper-stone">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-[200] text-ink tracking-tight">
            Discuss an Active Scenario with Senior Directors
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted max-w-xl mx-auto font-[300] leading-relaxed">
            If your organisation is confronting an active matter involving issues raised in this paper,
            we invite you to initiate an encrypted, confidential preliminary consultation.
          </p>
          <div className="pt-2">
            <Link
              href="/confidential-enquiry"
              className="inline-flex items-center space-x-3 border border-ink px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-[300] text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              <span>BEGIN CONFIDENTIAL CONSULTATION</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
