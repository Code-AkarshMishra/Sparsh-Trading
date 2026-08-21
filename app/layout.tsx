import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/lib/business";
import { Header } from "@/components/Header";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "SPARSH TRADING | Steel Fabrication, Windows, Doors & Railings in Pratapgarh",
  description: business.description,
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  openGraph: { title: "SPARSH TRADING", description: business.description, type: "website" },
  twitter: { card: "summary_large_image", title: "SPARSH TRADING", description: business.description },
  alternates: { canonical: "/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    address: business.office,
    telephone: business.phones,
    areaServed: business.serviceArea,
    url: process.env.APP_URL || "http://localhost:3000"
  };
  return (
    <html lang="en">
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
