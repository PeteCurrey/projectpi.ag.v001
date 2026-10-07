import React from "react";
import { FlagshipServiceConfig } from "@/lib/data/flagshipServicesData";
import { ServiceEditorialImages } from "@/lib/data/editorialImagesData";
import EditorialHero from "../EditorialHero";
import EditorialSection from "../EditorialSection";
import EditorialSplit from "../EditorialSplit";
import EditorialList from "../EditorialList";
import EditorialMethod from "../EditorialMethod";
import EditorialImage from "../EditorialImage";
import EditorialEvidence from "../EditorialEvidence";
import EditorialAudience from "../EditorialAudience";
import EditorialFAQ from "../EditorialFAQ";
import EditorialServiceIndex from "../EditorialServiceIndex";
import EditorialInsightsBridge from "../EditorialInsightsBridge";
import EditorialProcessServingBridge from "../EditorialProcessServingBridge";
import EditorialCTA from "../EditorialCTA";

interface LayoutProps {
  service: FlagshipServiceConfig;
  images: ServiceEditorialImages;
}

export default function IntelligenceLayout({ service, images }: LayoutProps) {
  return (
    <article className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      {/* 01: Hero (Light Editorial) */}
      <EditorialHero
        categoryLabel="INTELLIGENCE"
        displayHeadline={service.displayHeadline}
        subProposition={service.subProposition}
        serviceSlug={service.slug}
        heroImage={images.hero}
      />

      {/* 02: Problem Statement / Analytical Context (Light) */}
      <EditorialSection variant="light">
        <EditorialSplit theProblem={service.theProblem} sectionLabel="ANALYTICAL CONTEXT · THREAT PROFILE" />
      </EditorialSection>

      {/* 03: Architectural Diptych (Rule 09, Asymmetric Composition) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <EditorialImage
          image={images.secondary}
          secondaryImage={images.tertiary}
          layout={images.tertiary ? "diptych" : "full"}
        />
      </div>

      {/* 04: Capabilities Ledger (Stone Background) */}
      <EditorialSection variant="stone">
        <EditorialList capabilities={service.capabilities} variant="stone" />
      </EditorialSection>

      {/* 05: Methodology Phased Progression (Light Background) */}
      <EditorialSection variant="light">
        <EditorialMethod approach={service.approach} variant="light" />
      </EditorialSection>

      {/* 06: Evidence & Analytical Products (Dark Contrast) */}
      <EditorialSection variant="dark">
        <EditorialEvidence evidence={service.evidence} variant="dark" />
      </EditorialSection>

      {/* 07: Intelligence Library Bridge (Prominently featured for Intelligence family) */}
      {service.insightSlugs && service.insightSlugs.length > 0 && (
        <EditorialSection variant="stone">
          <EditorialInsightsBridge insightSlugs={service.insightSlugs} variant="stone" />
        </EditorialSection>
      )}

      {/* 08: Instructing Clients (Light) */}
      <EditorialSection variant="light">
        <EditorialAudience audience={service.audience} variant="light" />
      </EditorialSection>

      {/* 09: Optional Process Serving Bridge */}
      {service.processServingBridge && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <EditorialProcessServingBridge bridge={service.processServingBridge} variant="light" />
        </div>
      )}

      {/* 10: FAQs (Stone) */}
      <EditorialSection variant="stone">
        <EditorialFAQ faqs={service.faqs} variant="stone" />
      </EditorialSection>

      {/* 11: Related Capabilities Index (Light) */}
      <EditorialSection variant="light">
        <EditorialServiceIndex relatedSlugs={service.relatedSlugs} currentSlug={service.slug} variant="light" />
      </EditorialSection>

      {/* 12: Restrained Dark CTA */}
      <EditorialCTA serviceSlug={service.slug} variant="dark" />
    </article>
  );
}
