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

export default function InvestigationsLayout({ service, images }: LayoutProps) {
  return (
    <article className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      {/* 01: Hero (Light Editorial) */}
      <EditorialHero
        categoryLabel="INVESTIGATIONS"
        displayHeadline={service.displayHeadline}
        subProposition={service.subProposition}
        serviceSlug={service.slug}
        heroImage={images.hero}
      />

      {/* 02: Full-Width Architectural Break (Rule 09) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <EditorialImage image={images.secondary} layout="full" />
      </div>

      {/* 03: The Problem / Operational Triggers (Light) */}
      <EditorialSection variant="light">
        <EditorialSplit theProblem={service.theProblem} sectionLabel="CONTEXT · INVESTIGATION TRIGGERS" />
      </EditorialSection>

      {/* 04: Capabilities Ledger (Stone Background) */}
      <EditorialSection variant="stone">
        <EditorialList capabilities={service.capabilities} variant="stone" />
      </EditorialSection>

      {/* 05: Evidence & Work Product (Strategic Dark Contrast Section) */}
      <EditorialSection variant="dark">
        <EditorialEvidence evidence={service.evidence} variant="dark" />
      </EditorialSection>

      {/* 06: Phased Methodology (Stone Background) */}
      <EditorialSection variant="stone">
        <EditorialMethod approach={service.approach} variant="stone" />
      </EditorialSection>

      {/* 07: Tertiary Image Plate if present */}
      {images.tertiary && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <EditorialImage image={images.tertiary} layout="asymmetric" />
        </div>
      )}

      {/* 08: Instructing Bodies / Professional Clients (Light) */}
      <EditorialSection variant="light">
        <EditorialAudience audience={service.audience} variant="light" />
      </EditorialSection>

      {/* 09: Optional Process Serving Bridge */}
      {service.processServingBridge && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <EditorialProcessServingBridge bridge={service.processServingBridge} variant="light" />
        </div>
      )}

      {/* 10: Intelligence Library Briefings (Light) */}
      {service.insightSlugs && service.insightSlugs.length > 0 && (
        <EditorialSection variant="light">
          <EditorialInsightsBridge insightSlugs={service.insightSlugs} variant="light" />
        </EditorialSection>
      )}

      {/* 11: FAQs (Stone) */}
      <EditorialSection variant="stone">
        <EditorialFAQ faqs={service.faqs} variant="stone" />
      </EditorialSection>

      {/* 12: Related Capabilities Index (Light) */}
      <EditorialSection variant="light">
        <EditorialServiceIndex relatedSlugs={service.relatedSlugs} currentSlug={service.slug} variant="light" />
      </EditorialSection>

      {/* 13: Restrained Confidential CTA */}
      <EditorialCTA serviceSlug={service.slug} variant="stone" />
    </article>
  );
}
