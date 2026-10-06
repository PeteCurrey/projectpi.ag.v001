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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = processServerLocations[city as keyof typeof processServerLocations];

  if (!data) {
    return {
      title: "Process Server UK | Private Intelligence & Investigations",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
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
