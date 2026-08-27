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
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "SPARSH TRADING | Top Steel Fabrication, uPVC Windows & Kitchens in UP",
    description:
      "Precision metal fabrication, uPVC window systems, toughened glass railings, and modular kitchens manufactured in Pratapgarh, serving all UP districts.",
    type: "website",
    locale: "en_IN"
  },
  twitter: {
    card: "summary_large_image",
    title: "SPARSH TRADING | Architectural Metalwork & Windows",
    description: "Custom steel fabrication, uPVC systems, glass railings & modular kitchens in Pratapgarh, UP."
  },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "SPARSH TRADING",
    image: `${process.env.APP_URL || "http://localhost:3000"}/brand-wordmark.png`,
    logo: `${process.env.APP_URL || "http://localhost:3000"}/brand-logo.png`,
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
    url: process.env.APP_URL || "http://localhost:3000"
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
