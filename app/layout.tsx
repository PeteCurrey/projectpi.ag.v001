import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import TFTSMotionProvider from "@/components/experience/TFTSMotionProvider";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tfts.co.uk"),
  title: {
    default: "TFTS — Tactical Field Intelligence Service | UK",
    template: "%s | TFTS",
  },
  description:
    "TFTS — Tactical Field Intelligence Service. Private intelligence, investigations and specialist field services for matters where certainty matters. London and UK-wide.",
  keywords: [
    "TFTS",
    "Tactical Field Intelligence Service",
    "Private Intelligence",
    "Private Investigations",
    "Corporate Investigations",
    "Litigation Support",
    "Asset Tracing",
    "OSINT Investigations",
    "Covert Surveillance",
    "Process Serving",
    "Corporate Fraud Investigations",
    "Due Diligence",
    "London Private Investigator",
  ],
  authors: [{ name: "TFTS — Tactical Field Intelligence Service" }],
  creator: "TFTS",
  publisher: "TFTS — Tactical Field Intelligence Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TFTS — Tactical Field Intelligence Service | UK",
    description:
      "Private intelligence, investigations and specialist field services for matters where certainty matters.",
    url: "https://tfts.co.uk",
    siteName: "TFTS — Tactical Field Intelligence Service",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TFTS — Tactical Field Intelligence Service",
    description: "Private intelligence, investigations and specialist field services.",
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
        "@id": "https://tfts.co.uk/#organization",
        name: "TFTS — Tactical Field Intelligence Service",
        url: "https://tfts.co.uk",
        logo: "https://tfts.co.uk/logo.png",
        description:
          "Premium UK private intelligence and investigations firm. Process serving, corporate investigations, OSINT, surveillance and litigation support.",
        areaServed: [
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "AdministrativeArea", name: "International" },
        ],
        knowsAbout: [
          "Private Investigations",
          "Corporate Intelligence",
          "Asset Tracing",
          "Litigation Support",
          "Process Serving",
          "Covert Surveillance",
          "Forensic OSINT",
          "Fraud Investigations",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://tfts.co.uk/#service",
        name: "TFTS — Tactical Field Intelligence Service",
        serviceType: "Private Intelligence, Investigations & Process Serving",
        address: {
          "@type": "PostalAddress",
          addressLocality: "London",
          addressCountry: "GB",
        },
        priceRange: "££££",
        telephone: "+44-20-7946-0188",
      },
    ],
  };

  return (
    <html lang="en" className={workSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-paper text-ink min-h-screen selection:bg-ink selection:text-paper flex flex-col antialiased">
        <TFTSMotionProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </TFTSMotionProvider>
      </body>
    </html>
  );
}
