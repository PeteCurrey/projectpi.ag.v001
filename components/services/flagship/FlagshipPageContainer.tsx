import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";
import { getSiteUrl, BRAND_PREFERRED, TELEPHONE } from "@/lib/config/brand";
import FlagshipHero from "./FlagshipHero";
import FlagshipProblem from "./FlagshipProblem";
import FlagshipCapabilities from "./FlagshipCapabilities";
import FlagshipMethodology from "./FlagshipMethodology";
import FlagshipEvidenceBundle from "./FlagshipEvidenceBundle";
import FlagshipAudience from "./FlagshipAudience";
import FlagshipProcessServingBridge from "./FlagshipProcessServingBridge";
import FlagshipInsightsBridge from "./FlagshipInsightsBridge";
import FlagshipRelatedServices from "./FlagshipRelatedServices";
import FlagshipFAQ from "./FlagshipFAQ";
import FlagshipCTA from "./FlagshipCTA";

interface FlagshipPageContainerProps {
  service: FlagshipServiceConfig;
}

export default function FlagshipPageContainer({ service }: FlagshipPageContainerProps) {
  const siteUrl = getSiteUrl();

  // Schema.org structured data for this flagship service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.semanticH1} — TFTS`,
    description: service.subProposition,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      "@type": "ProfessionalService",
      name: BRAND_PREFERRED,
      url: siteUrl,
      telephone: TELEPHONE,
      priceRange: "££££",
      address: {
        "@type": "PostalAddress",
        addressLocality: "London",
        addressCountry: "GB",
      },
    },
    areaServed: "United Kingdom",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.capabilities.title,
      itemListElement: service.capabilities.items.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.detail,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteUrl}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.semanticH1,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  return (
    <article className="min-h-screen bg-obsidian text-warmWhite">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 01 HERO SECTION */}
      <FlagshipHero service={service} />

      {/* 02 THE PROBLEM / SCENARIOS */}
      <FlagshipProblem problem={service.theProblem} accentColor={service.accentColor} />

      {/* 03 DETAILED CAPABILITIES */}
      <FlagshipCapabilities capabilities={service.capabilities} />

      {/* 04 METHODOLOGY / APPROACH */}
      <FlagshipMethodology approach={service.approach} />

      {/* 05 EVIDENTIARY DELIVERABLES & CPR STANDARDS */}
      <FlagshipEvidenceBundle evidence={service.evidence} serviceSlug={service.slug} />

      {/* 06 AUDIENCE / INSTRUCTING SECTORS */}
      <FlagshipAudience audience={service.audience} />

      {/* 07 PROCESS SERVING CROSS-LINKING BRIDGE (IF APPLICABLE) */}
      {service.processServingBridge && (
        <FlagshipProcessServingBridge bridge={service.processServingBridge} />
      )}

      {/* 08 FROM THE TFTS INTELLIGENCE LIBRARY (INSIGHTS) */}
      <FlagshipInsightsBridge insightSlugs={service.insightSlugs} />

      {/* 09 FREQUENTLY ASKED QUESTIONS */}
      <FlagshipFAQ faqs={service.faqs} />

      {/* 10 RELATED SERVICES & PREV/NEXT NAVIGATION */}
      <FlagshipRelatedServices
        relatedSlugs={service.relatedSlugs}
        currentSlug={service.slug}
      />

      {/* 11 FINAL CONFIDENTIAL ENQUIRY CTA */}
      <FlagshipCTA serviceTitle={service.semanticH1} serviceSlug={service.slug} />
    </article>
  );
}
