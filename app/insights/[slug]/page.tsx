import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clock, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { insightsData } from "@/lib/data/insightsData";

interface InsightPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return insightsData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://private-intelligence.co.uk/insights/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `https://private-intelligence.co.uk/insights/${article.slug}`,
      type: "article",
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const article = insightsData.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDescription,
    "author": {
      "@type": "Organization",
      "name": "Private Intelligence & Investigations",
      "url": "https://private-intelligence.co.uk"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Private Intelligence & Investigations",
      "logo": "https://private-intelligence.co.uk/logo.png"
    },
    "datePublished": "2024-05-01",
    "mainEntityOfPage": `https://private-intelligence.co.uk/insights/${article.slug}`
  };

  return (
    <article className="min-h-screen bg-obsidian text-warmWhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article Header */}
      <section className="py-20 md:py-28 border-b border-oliveGrey/70 bg-gradient-to-b from-obsidian-surface to-obsidian">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-3 text-[11px] font-mono text-stone-muted tracking-widest uppercase mb-8">
            <Link href="/insights" className="hover:text-warmWhite transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3 h-3" />
              <span>INDEX</span>
            </Link>
            <span className="text-oliveGrey">/</span>
            <span className="text-brass">{article.category}</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light text-warmWhite tracking-tight leading-[1.12] font-serif">
              {article.title}
            </h1>

            <p className="text-lg sm:text-xl text-stone font-light leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex items-center space-x-6 pt-4 text-xs font-mono text-stone-muted border-t border-oliveGrey/60">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span className="text-brass">ESTABLISHMENT INTELLIGENCE BRIEF</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-16">
          {/* Executive Summary Callout */}
          <div className="p-8 bg-obsidian-surface/80 border-l-2 border-brass border border-oliveGrey/60 rounded-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brass block mb-2">
              EXECUTIVE BRIEF SUMMARY
            </span>
            <p className="text-sm text-warmWhite font-light leading-relaxed">
              {article.summary}
            </p>
          </div>

          {/* Article Headings & Paragraphs */}
          <div className="space-y-12 text-sm sm:text-base text-stone font-light leading-relaxed">
            {article.content.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif tracking-wide pt-4">
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
          <div className="p-8 bg-obsidian-surface border border-oliveGrey/80 rounded-xs space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-brass block">
              OPERATIONAL TAKEAWAYS
            </span>
            <ul className="space-y-3">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-stone-light">
                  <CheckCircle2 className="w-4 h-4 text-brass mt-0.5 flex-shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connected Capabilities */}
          <div className="pt-8 border-t border-oliveGrey/60 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-stone-muted block">
              CORRESPONDING PRACTICE CAPABILITIES
            </span>
            <div className="flex flex-wrap gap-4">
              {article.relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-warmWhite hover:text-brass bg-obsidian-surface px-4 py-2 border border-oliveGrey/80 hover:border-brass/60 rounded-xs transition-colors"
                >
                  <span>{rel.title}</span>
                  <ArrowRight className="w-3 h-3 text-brass" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Consultation Prompt */}
      <section className="py-20 border-t border-oliveGrey/70 bg-obsidian-surface/40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-light text-warmWhite font-serif uppercase">
            Discuss an Active Scenario with Senior Directors
          </h2>
          <p className="text-xs sm:text-sm text-stone max-w-xl mx-auto font-light leading-relaxed">
            If your organisation is confronting an active matter involving issues raised in this paper,
            we invite you to initiate an encrypted, confidential preliminary consultation.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 bg-brass hover:bg-brass-light text-obsidian px-8 py-3.5 text-xs tracking-widest uppercase font-medium rounded-xs shadow-etched"
            >
              <span>BEGIN CONFIDENTIAL CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
