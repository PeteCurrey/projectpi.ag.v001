import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { processServerLocations } from "@/lib/data/processServingData";
import LocationPageTemplate from "@/components/process-serving/LocationPageTemplate";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return Object.keys(processServerLocations).map((city) => ({
    city,
  }));
}

import { getCanonicalUrl } from "@/lib/config/brand";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = processServerLocations[city as keyof typeof processServerLocations];

  if (!data) {
    return {
      title: "Process Server UK | TFTS",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: getCanonicalUrl(`/process-server/${city}`),
    },
  };
}


export default async function ProcessServerCityPage({ params }: PageProps) {
  const { city } = await params;
  const data = processServerLocations[city as keyof typeof processServerLocations];

  if (!data) {
    notFound();
  }

  return <LocationPageTemplate data={data} />;
}
