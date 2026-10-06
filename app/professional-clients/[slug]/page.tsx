import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { professionalClientPages } from "@/lib/data/professionalClientsData";
import ProfessionalClientTemplate from "@/components/professional-clients/ProfessionalClientTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(professionalClientPages).map((slug) => ({
    slug,
  }));
}

import { getCanonicalUrl } from "@/lib/config/brand";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = professionalClientPages[slug];

  if (!data) {
    return {
      title: "Professional Client Services | TFTS",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: getCanonicalUrl(`/professional-clients/${slug}`),
    },
  };
}


export default async function ProfessionalClientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = professionalClientPages[slug];

  if (!data) {
    notFound();
  }

  return <ProfessionalClientTemplate data={data} />;
}
