import type { Metadata } from "next";
import { Work_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-work-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://private-intelligence.co.uk"),
  title: {
    default: "Private Intelligence & Investigations | London & UK",
    template: "%s | Private Intelligence & Investigations",
  },
  description: "Discreet UK private intelligence and corporate investigations firm. Providing intelligence for decisions and investigations for certainty across legal, corporate, and financial matters.",
  keywords: [
    "Private Intelligence",
    "Private Investigations",
    "Corporate Investigations",
    "Litigation Support",
    "Asset Tracing",
    "OSINT Investigations",
    "Covert Surveillance",
    "Corporate Fraud Investigations",
    "Due Diligence",
    "London Private Investigator",
  ],
  authors: [{ name: "Private Intelligence & Investigations" }],
  creator: "Private Intelligence & Investigations",
  publisher: "Private Intelligence & Investigations",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Private Intelligence & Investigations | London & UK",
    description: "Intelligence for decisions. Investigations for certainty. Serving solicitors, corporate counsel, family offices, and institutional investors.",
    url: "https://private-intelligence.co.uk",
    siteName: "Private Intelligence & Investigations",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Intelligence & Investigations | London & UK",
    description: "Intelligence for decisions. Investigations for certainty.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://private-intelligence.co.uk/#organization",
        "name": "Private Intelligence & Investigations",
        "url": "https://private-intelligence.co.uk",
        "logo": "https://private-intelligence.co.uk/logo.png",
        "description": "Premium UK private intelligence and investigations firm serving legal teams, corporates, insolvency practitioners, insurers, and private clients.",
        "areaServed": [
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "AdministrativeArea", "name": "International" }
        ],
        "knowsAbout": [
          "Private Investigations",
          "Corporate Intelligence",
          "Asset Tracing",
          "Litigation Support",
          "Covert Surveillance",
          "Forensic OSINT",
          "Fraud Investigations"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://private-intelligence.co.uk/#service",
        "name": "Private Intelligence & Investigations",
        "serviceType": "Private Intelligence & Corporate Investigations",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "London",
          "addressCountry": "GB"
        },
        "priceRange": "££££",
        "telephone": "+44-20-7946-0188"
      }
    ]
  };

  return (
    <html lang="en" className={`${workSans.variable} ${cormorant.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-obsidian text-warmWhite min-h-screen selection:bg-brass selection:text-obsidian flex flex-col antialiased">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
