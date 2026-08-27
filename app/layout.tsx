import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/business";
import { Header } from "@/components/Header";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SPARSH TRADING | #1 Steel Fabrication, uPVC Windows & Modular Kitchen in Pratapgarh & UP",
  description:
    "Leading architectural steel fabrication, soundproof uPVC sliding windows, toughened glass railings, Tata steel door frames (Chaukhat), and modular kitchens in Pratapgarh, Sultanpur, Jaunpur, Varanasi, Lucknow, and across Uttar Pradesh. Best pricing & guaranteed quality.",
  keywords: [
    "Sparsh Trading",
    "Steel Fabrication Pratapgarh",
    "uPVC Windows Pratapgarh",
    "Modular Kitchen Pratapgarh",
    "Toughened Glass Railing Pratapgarh",
    "PPGI Door Frames Pratapgarh",
    "Steel Gates Uttar Pradesh",
    "Aluminium Windows Sultanpur",
    "Glass Balcony Railing Jaunpur",
    "Architectural Metalwork Varanasi",
    "uPVC Sliding Doors Lucknow",
    "Tata Steel Chaukhat Prayagraj",
    "Fabrication Workshop UP"
  ],
  metadataBase: new URL(process.env.APP_URL || "https://sparshtrading.shop"),
  icons: {
    icon: "/brand-logo.png",
    shortcut: "/brand-logo.png",
    apple: "/brand-logo.png"
  },
  openGraph: {
    title: "SPARSH TRADING | #1 Steel Fabrication, uPVC Windows & Kitchens in UP",
    description:
      "Architectural metal fabrication, soundproof uPVC windows, glass railings, PPGI frames & modular kitchens in Pratapgarh & UP. Call +91 8795662161 / +91 7007710096.",
    url: "https://sparshtrading.shop",
    siteName: "Sparsh Trading",
    images: [
      {
        url: "https://sparshtrading.shop/brand-wordmark.png",
        width: 1200,
        height: 630,
        alt: "SPARSH TRADING - Architectural Metal & Interior Solutions"
      },
      {
        url: "https://sparshtrading.shop/brand-logo.png",
        width: 512,
        height: 512,
        alt: "SPARSH TRADING Logo"
      }
    ],
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "SPARSH TRADING | Steel Fabrication & Windows in UP",
    description: "Custom steel fabrication, uPVC systems, glass railings & modular kitchens in Pratapgarh, UP.",
    images: ["https://sparshtrading.shop/brand-wordmark.png"]
  },
  alternates: {
    canonical: "https://sparshtrading.shop",
    languages: {
      "en-IN": "https://sparshtrading.shop",
      "x-default": "https://www.sparshtrading.shop"
    }
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "SPARSH TRADING",
    image: `${process.env.APP_URL || "https://sparshtrading.shop"}/brand-wordmark.png`,
    logo: `${process.env.APP_URL || "https://sparshtrading.shop"}/brand-logo.png`,
    description:
      "Premier steel fabrication, uPVC window manufacturing, frameless glass railings, and modular kitchen solutions in Pratapgarh, Uttar Pradesh.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar",
      addressLocality: "Pratapgarh",
      addressRegion: "Uttar Pradesh",
      postalCode: "230001",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.9191811,
      longitude: 81.9781645
    },
    telephone: "+91-8795662161",
    priceRange: "₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "20:00"
      }
    ],
    areaServed: [
      "Pratapgarh",
      "Sultanpur",
      "Jaunpur",
      "Varanasi",
      "Prayagraj",
      "Lucknow",
      "Raebareli",
      "Ayodhya",
      "Uttar Pradesh"
    ],
    url: process.env.APP_URL || "https://sparshtrading.shop",
    sameAs: [
      "https://www.sparshtrading.shop",
      "https://sparshtrading.shop"
    ]
  };


  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <Header />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
