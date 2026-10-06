// ============================================================================
// TFTS — BRAND CONFIGURATION
// Single Source of Truth for all public-facing brand, domain, and SEO identity.
// ============================================================================
// Import from here — never hardcode brand strings or domain URLs elsewhere.
// ============================================================================

// ─────────────────────────────────────────────
// PRIMARY BRAND IDENTITY
// ─────────────────────────────────────────────

export const BRAND_NAME = "TFTS" as const;
export const BRAND_FULL_NAME = "Tactical Field Intelligence Service" as const;
export const BRAND_TAGLINE = "Private Intelligence & Investigations" as const;
export const BRAND_PREFERRED = "TFTS — Tactical Field Intelligence Service" as const;

/** Short descriptor for sub-navigation, footers, supporting copy */
export const BRAND_DESCRIPTOR = "Private Intelligence & Investigations" as const;

// ─────────────────────────────────────────────
// DOMAIN & CANONICAL URL
// ─────────────────────────────────────────────

/** Production canonical domain — no trailing slash */
export const PRODUCTION_DOMAIN = "https://tfts.co.uk" as const;

/**
 * Returns the canonical base URL for the current environment.
 * In production this is https://tfts.co.uk.
 * Set NEXT_PUBLIC_SITE_URL in .env.local to override for preview/staging.
 *
 * Server-safe: reads process.env directly.
 */
export function getSiteUrl(): string {
  // Allow override via environment variable (preview deployments, staging, local)
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return PRODUCTION_DOMAIN;
}

/**
 * Returns a fully-qualified canonical URL for a given path.
 * e.g. getCanonicalUrl("/services/process-serving") → "https://tfts.co.uk/services/process-serving"
 */
export function getCanonicalUrl(path: string = ""): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

// ─────────────────────────────────────────────
// SEO / METADATA TEMPLATES
// ─────────────────────────────────────────────

export const SITE_TITLE_DEFAULT =
  "TFTS — Tactical Field Intelligence Service | Private Intelligence & Investigations" as const;

export const SITE_TITLE_TEMPLATE = "%s | TFTS" as const;

export const SITE_DESCRIPTION =
  "TFTS — Tactical Field Intelligence Service. Discreet UK private intelligence and investigations firm. Providing intelligence for decisions and investigations for certainty across legal, corporate, and financial matters." as const;

// ─────────────────────────────────────────────
// CONTACT / COMMUNICATIONS
// ─────────────────────────────────────────────

/** Public enquiries email — ensure this mailbox is provisioned before going live */
export const EMAIL_ENQUIRIES = "enquiries@tfts.co.uk" as const;

/** Data Protection Officer contact */
export const EMAIL_DPO = "dpo@tfts.co.uk" as const;

/** Telephone — UK Mayfair duty line */
export const TELEPHONE = "+44-20-7946-0188" as const;

/** Office descriptor */
export const OFFICE_CITY = "London" as const;
export const OFFICE_AREA = "Mayfair, London W1" as const;

// ─────────────────────────────────────────────
// ORGANISATION SCHEMA (JSON-LD)
// Authoritative — used by app/layout.tsx and component templates.
// Do not duplicate this in individual components.
// ─────────────────────────────────────────────

export function getOrganisationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: BRAND_PREFERRED,
        alternateName: BRAND_NAME,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        description:
          "TFTS — Tactical Field Intelligence Service. A specialist UK private intelligence and investigations firm serving legal teams, corporates, insolvency practitioners, insurers, and private offices.",
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "AdministrativeArea", name: "International" },
        ],
        knowsAbout: [
          "Private Investigations",
          "Corporate Intelligence",
          "Asset Tracing",
          "Litigation Support",
          "Covert Surveillance",
          "Forensic OSINT",
          "Fraud Investigations",
          "Process Serving",
          "People Tracing",
          "Due Diligence",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: BRAND_PREFERRED,
        serviceType: "Private Intelligence & Corporate Investigations",
        address: {
          "@type": "PostalAddress",
          addressLocality: OFFICE_CITY,
          addressCountry: "GB",
        },
        priceRange: "££££",
        telephone: TELEPHONE,
      },
    ],
  };
}

/**
 * Generates a Service schema for individual service pages.
 * Provider references the authoritative organisation.
 */
export function getServiceSchema(params: {
  name: string;
  description: string;
  serviceUrl: string;
  capabilities?: { name: string; detail: string }[];
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    url: params.serviceUrl,
    provider: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: BRAND_PREFERRED,
      url: siteUrl,
      telephone: TELEPHONE,
      priceRange: "££££",
      address: {
        "@type": "PostalAddress",
        addressLocality: OFFICE_CITY,
        addressCountry: "GB",
      },
    },
    areaServed: "United Kingdom",
    ...(params.capabilities && params.capabilities.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: params.name,
            itemListElement: params.capabilities.map((cap) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: cap.name,
                description: cap.detail,
              },
            })),
          },
        }
      : {}),
  };
}
