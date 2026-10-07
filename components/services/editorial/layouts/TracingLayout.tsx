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

export default function TracingLayout({ service, images }: LayoutProps) {
  return (
    <article className="min-h-screen bg-[#F5F3EE] text-[#111111]">
      {/* 01: Hero (Light Editorial) */}
      <EditorialHero
        categoryLabel="TRACING"
        displayHeadline={service.displayHeadline}
        subProposition={service.subProposition}
        serviceSlug={service.slug}
        heroImage={images.hero}
      />

      {/* 02: Trace Capabilities Ledger (Stone Background, immediate scope clarity) */}
      <EditorialSection variant="stone">
        <EditorialList capabilities={service.capabilities} variant="stone" />
      </EditorialSection>

      {/* 03: Panoramic Infrastructure Image (Rule 09) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <EditorialImage image={images.secondary} layout="full" />
      </div>

      {/* 04: The Problem & Circumstances (Light) */}
      <EditorialSection variant="light">
        <EditorialSplit theProblem={service.theProblem} sectionLabel="CIRCUMSTANCES · TRACE REQUIREMENTS" />
      </EditorialSection>

      {/* 05: Methodology Progression (Stone) */}
      <EditorialSection variant="stone">
        <EditorialMethod approach={service.approach} variant="stone" />
      </EditorialSection>

      {/* 06: Evidence & Asset Schedules (Strategic Dark Section) */}
      <EditorialSection variant="dark">
        <EditorialEvidence evidence={service.evidence} variant="dark" />
      </EditorialSection>

      {/* 07: Optional Diptych if tertiary image present */}
      {images.tertiary && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <EditorialImage image={images.tertiary} layout="asymmetric" />
        </div>
      )}

      {/* 08: Instructing Bodies / Enforcing Counsel (Light) */}
      <EditorialSection variant="light">
        <EditorialAudience audience={service.audience} variant="light" />
      </EditorialSection>

      {/* 09: Process Serving Bridge (Vital for Tracing: Serving Located Subjects) */}
      {service.processServingBridge && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <EditorialProcessServingBridge bridge={service.processServingBridge} variant="light" />
        </div>
      )}

      {/* 10: Intelligence Library Briefings */}
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

      {/* 13: Restrained CTA */}
      <EditorialCTA serviceSlug={service.slug} variant="stone" />
    </article>
  );
}
