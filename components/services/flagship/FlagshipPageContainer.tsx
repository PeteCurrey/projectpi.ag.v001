import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";
import { EDITORIAL_SERVICE_IMAGES, ServiceEditorialImages } from "@/lib/data/editorialImagesData";
import { getSiteUrl, BRAND_PREFERRED, TELEPHONE } from "@/lib/config/brand";
import InvestigationsLayout from "../editorial/layouts/InvestigationsLayout";
import IntelligenceLayout from "../editorial/layouts/IntelligenceLayout";
import TracingLayout from "../editorial/layouts/TracingLayout";
import FieldOperationsLayout from "../editorial/layouts/FieldOperationsLayout";
import LegalEvidenceLayout from "../editorial/layouts/LegalEvidenceLayout";

interface FlagshipPageContainerProps {
  service: FlagshipServiceConfig;
}

const LAYOUT_FAMILY_MAP: Record<
  string,
  "INVESTIGATIONS" | "INTELLIGENCE" | "TRACING" | "FIELD_OPERATIONS" | "LEGAL_EVIDENCE"
> = {
  // Investigations Family (Rule 10)
  "corporate-investigations": "INVESTIGATIONS",
  "corporate-fraud-investigations": "INVESTIGATIONS",
  "fraud-investigations": "INVESTIGATIONS",
  "employee-investigations": "INVESTIGATIONS",

  // Intelligence Family (Rule 10)
  intelligence: "INTELLIGENCE",
  "osint-investigations": "INTELLIGENCE",
  "digital-investigations": "INTELLIGENCE",
  "background-investigations": "INTELLIGENCE",

  // Tracing Family (Rule 10)
  "people-tracing": "TRACING",
  "asset-tracing": "TRACING",
  "due-diligence": "TRACING",

  // Field Operations Family (Rule 10)
  "private-surveillance": "FIELD_OPERATIONS",
  "covert-surveillance": "FIELD_OPERATIONS",
  "undercover-investigations": "FIELD_OPERATIONS",
  "insurance-investigations": "FIELD_OPERATIONS",

  // Legal & Evidence Family (Rule 10)
  "litigation-support": "LEGAL_EVIDENCE",
  "evidence-gathering": "LEGAL_EVIDENCE",
  "witness-enquiries": "LEGAL_EVIDENCE",
};

export default function FlagshipPageContainer({ service }: FlagshipPageContainerProps) {
  const siteUrl = getSiteUrl();

  // Curated architectural & documentary imagery
  const images: ServiceEditorialImages = EDITORIAL_SERVICE_IMAGES[service.slug] || {
    hero: {
      src: service.image.src,
      alt: service.image.alt,
      caption: service.image.caption || "",
    },
    secondary: {
      src: service.image.src,
      alt: service.image.alt,
      caption: service.image.caption || "",
    },
  };

  const layoutFamily = LAYOUT_FAMILY_MAP[service.slug] || "INVESTIGATIONS";

  // Schema.org structured data for this service
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
    <>
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

      {/* Dispatch to the appropriate editorial layout family (Rule 10) */}
      {layoutFamily === "INVESTIGATIONS" && (
        <InvestigationsLayout service={service} images={images} />
      )}
      {layoutFamily === "INTELLIGENCE" && (
        <IntelligenceLayout service={service} images={images} />
      )}
      {layoutFamily === "TRACING" && (
        <TracingLayout service={service} images={images} />
      )}
      {layoutFamily === "FIELD_OPERATIONS" && (
        <FieldOperationsLayout service={service} images={images} />
      )}
      {layoutFamily === "LEGAL_EVIDENCE" && (
        <LegalEvidenceLayout service={service} images={images} />
      )}
    </>
  );
}
