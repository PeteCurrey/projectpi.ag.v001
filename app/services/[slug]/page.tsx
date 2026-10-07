import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/lib/data/servicesData";
import { FLAGSHIP_SERVICES } from "@/lib/data/flagshipServicesData";
import ServicePageTemplate from "@/components/services/ServicePageTemplate";
import FlagshipPageContainer from "@/components/services/flagship/FlagshipPageContainer";
import { getCanonicalUrl } from "@/lib/config/brand";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const flagship = FLAGSHIP_SERVICES[slug];
  const standard = servicesData[slug];

  if (!flagship && !standard) {
    return {
      title: "Service Not Found",
    };
  }

  const title = flagship ? flagship.metaTitle : standard.metaTitle;
  const description = flagship ? flagship.metaDescription : standard.metaDescription;
  const canonicalUrl = getCanonicalUrl(`/services/${slug}`);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const flagship = FLAGSHIP_SERVICES[slug];
  const standard = servicesData[slug];

  if (!flagship && !standard) {
    notFound();
  }

  // If this service has a bespoke flagship configuration, render the elevated editorial container
  if (flagship) {
    return <FlagshipPageContainer service={flagship} />;
  }

  // Fallback to standard ServicePageTemplate for other services
  return <ServicePageTemplate service={standard} />;
}
