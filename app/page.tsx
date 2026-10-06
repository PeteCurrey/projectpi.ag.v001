import React from "react";
import Hero from "@/components/home/Hero";
import EditorialStatement from "@/components/home/EditorialStatement";
import Disciplines from "@/components/home/Disciplines";
import Philosophy from "@/components/home/Philosophy";
import MethodologyStages from "@/components/home/MethodologyStages";
import ProfessionalClients from "@/components/home/ProfessionalClients";
import ProcessServingFeature from "@/components/home/ProcessServingFeature";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import InsightsPreview from "@/components/home/InsightsPreview";
import ConfidentialConsultationBanner from "@/components/home/ConfidentialConsultationBanner";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <EditorialStatement />
      <Disciplines />
      <Philosophy />
      <MethodologyStages />
      <ProfessionalClients />
      <ProcessServingFeature />
      <CaseStudiesSection />
      <InsightsPreview />
      <ConfidentialConsultationBanner />
    </div>
  );
}
