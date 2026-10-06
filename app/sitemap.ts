import { MetadataRoute } from "next";
import { servicesData } from "@/lib/data/servicesData";
import { insightsData } from "@/lib/data/insightsData";
import { processServingPages, processServerLocations } from "@/lib/data/processServingData";
import { professionalClientPages } from "@/lib/data/professionalClientsData";
import { getSiteUrl } from "@/lib/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const coreRoutes = [
    "",
    "/about",
    "/how-we-work",
    "/services",
    "/services/process-serving",
    "/professional-clients",
    "/confidential-enquiry",
    "/insights",
    "/cases",
    "/contact",
    "/privacy",
    "/compliance",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const processServingRoutes = Object.keys(processServingPages).map((slug) => ({
    url: `${baseUrl}/services/process-serving/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const professionalClientRoutes = Object.keys(professionalClientPages).map((slug) => ({
    url: `${baseUrl}/professional-clients/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const locationRoutes = Object.keys(processServerLocations).map((slug) => ({
    url: `${baseUrl}/process-server/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const insightRoutes = insightsData.map((article) => ({
    url: `${baseUrl}/insights/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...processServingRoutes,
    ...professionalClientRoutes,
    ...locationRoutes,
    ...insightRoutes,
  ];
}
