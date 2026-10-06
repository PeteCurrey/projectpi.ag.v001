import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { processServingPages } from "@/lib/data/processServingData";
import ProcessServingTemplate from "@/components/process-serving/ProcessServingTemplate";

interface PageProps {
  params: Promise<{ document: string }>;
}

export async function generateStaticParams() {
  return Object.keys(processServingPages).map((doc) => ({
    document: doc,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { document } = await params;
  const data = processServingPages[document];

  if (!data) {
    return {
      title: "Document Service | Private Intelligence & Investigations",
    };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function ProcessServingDocumentPage({ params }: PageProps) {
  const { document } = await params;
  const data = processServingPages[document];

  if (!data) {
    notFound();
  }

  return <ProcessServingTemplate data={data} />;
}
