import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { services, business } from "@/lib/business";
import { connectDB } from "@/lib/db";
import { Service } from "@/models/Core";
import { getMediaByService } from "@/lib/mediaData";
import { detailedProducts } from "@/lib/productsCatalogueData";
import { regionalCities } from "@/lib/seoKeywords";
import { PhoneIcon, MapPinIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

type ServiceView = {
  title: string;
  category: string;
  description?: string;
  items: string[];
  images?: { url?: string; name?: string }[];
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const url = `${baseUrl}/services/${service.slug}`;
  const title = `${service.title} in Pratapgarh, Sultanpur, Jaunpur & UP | Sparsh Trading`;
  const description = `${service.description} Handcrafted fabrication, genuine Tata steel and Jindal aluminium, transparent pricing, and careful on-site installation across Uttar Pradesh. Call +91 8795662161.`;

  return {
    title,
    description,
    keywords: [
      `${service.title.toLowerCase()} pratapgarh`,
      `best ${service.title.toLowerCase()} uttar pradesh`,
      `${service.title.toLowerCase()} manufacturer`,
      `${service.title.toLowerCase()} price quote`,
      "sparsh trading metal fabrication"
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sparsh Trading",
      images: [
        {
          url: `${baseUrl}/brand-wordmark.png`,
          width: 1200,
          height: 630,
          alt: service.title
        }
      ],
      type: "website"
    }
  };
}

export default async function ServiceDetail({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fallback = services.find((s) => s.slug === slug) as ServiceView | undefined;
  let service: ServiceView | undefined = fallback;

  try {
    await connectDB();
    service =
      ((await Service.findOne({ slug, published: true }).lean()) as unknown as ServiceView | null) ||
      fallback;
  } catch {
    /* Static catalogue fallback */
  }

  if (!service) notFound();

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const serviceMedia = getMediaByService(slug);
  const relatedProducts = detailedProducts.filter((p) => p.relatedServiceSlug === slug);

  // Human, practical step-by-step workflow
  const workflowStages = [
    {
      step: "01",
      title: "Free On-Site Laser Measurement",
      desc: "We visit your site in Pratapgarh, Sultanpur, Jaunpur, or Prayagraj to take exact digital measurements, inspect wall anchoring, and understand your design preferences."
    },
    {
      step: "02",
      title: "Custom Workshop Fabrication",
      desc: "Your order is cut and assembled in our dedicated Pratapgarh workshop using heavy-gauge Tata steel, multi-chamber uPVC, or marine-grade boards with clean joints."
    },
    {
      step: "03",
      title: "Anti-Rust Primer & Surface Finish",
      desc: "Every metal part receives double anti-rust zinc chromate primer or high-temperature powder coating to keep it safe from moisture, rain, and rust for years."
    },
    {
      step: "04",
      title: "Clean, Careful Installation",
      desc: "Our own experienced team delivers and fits everything with heavy-duty anchors, spirit-level precision, and proper alignment before final cleanup and handover."
    }
  ];

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.category,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: "Sparsh Trading",
      telephone: "+91-8795662161",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar",
        addressLocality: "Pratapgarh",
        addressRegion: "Uttar Pradesh",
        postalCode: "230001",
        addressCountry: "IN"
      }
    },
    areaServed: regionalCities.slice(0, 10),
    description: service.description || `Custom ${service.title} fabrication and installation services by Sparsh Trading in Uttar Pradesh.`
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${baseUrl}/services/${slug}` }
    ]
  };

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="wrap">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/services" style={{ color: "var(--text)", textDecoration: "none" }}>Services</Link>
          <span>/</span>
          <span style={{ color: "var(--red-2)", fontWeight: 600 }}>{service.title}</span>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            {service.category}
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 880 }}>
          {service.title} in Pratapgarh &amp; Uttar Pradesh
        </h1>

        <p className="section-lead" style={{ maxWidth: 820, margin: "0 0 28px" }}>
          {service.description ||
            `Custom-built ${service.title.toLowerCase()} made to your exact size, using genuine branded raw materials, clean fabrication, and careful on-site installation.`}
        </p>

        {/* Media Showcase */}
        {serviceMedia.length > 0 && (
          <div style={{ marginTop: 16, marginBottom: 44 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 6, color: "var(--strong)" }}>
              Recent Photos &amp; Workshop Videos
            </h2>
            <p className="muted" style={{ marginBottom: 18, fontSize: "0.92rem" }}>
              A quick look at our real work and fabrication standards for {service.title}.
            </p>

            <div className="gallery-grid">
              {serviceMedia.map((media) => (
                <article className="media-card" key={media.id} style={{ borderRadius: 12, border: "1px solid var(--border)" }}>
                  <span className="media-badge">
                    {media.type === "video" ? "Video" : "Photo"}
                  </span>
                  <div className="media-preview">
                    {media.type === "video" ? (
                      <video
                        src={media.url}
                        controls
                        playsInline
                        preload="metadata"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <img src={media.url} alt={`${media.title} - ${service.title} Sparsh Trading`} loading="lazy" />
                    )}
                  </div>
                  <div className="media-info">
                    <span className="eyebrow" style={{ fontSize: "0.72rem", marginBottom: 2 }}>
                      {media.category}
                    </span>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--strong)" }}>{media.title}</h3>
                    {media.description && <p style={{ fontSize: "0.85rem" }}>{media.description}</p>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Split: What We Provide & Instant Quote */}
        <div className="split" style={{ alignItems: "start", gap: 32, marginBottom: 44 }}>
          <section>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 14, color: "var(--strong)" }}>
              What We Fabricate &amp; Deliver
            </h2>
            <div className="cards" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
              {service.items.map((item: string, idx: number) => (
                <div className="card" key={item} style={{ padding: "16px 20px", borderRadius: 10, border: "1px solid var(--border)", borderLeft: "3px solid var(--red-2)" }}>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, margin: "0 0 4px", color: "var(--strong)" }}>
                    {idx + 1}. {item}
                  </h3>
                  <p className="muted" style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5 }}>
                    Custom-built to match your site dimensions, weight requirements, and choice of material.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="card" style={{ padding: 26, position: "sticky", top: 88, borderRadius: 12, border: "1px solid var(--border)" }}>
            <span className="eyebrow" style={{ color: "var(--red-2)" }}>Direct Help</span>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "6px 0 10px", color: "var(--strong)" }}>
              Talk to Our Team
            </h2>
            <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, marginBottom: 18 }}>
              Speak directly with our workshop partners for straightforward advice on materials, design options, and site visits.
            </p>

            <Link
              className="btn primary"
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              style={{ width: "100%", padding: "12px", textAlign: "center", fontWeight: 700, fontSize: "0.92rem", marginBottom: 10, borderRadius: 8 }}
            >
              Book Free Site Visit
              <ArrowRightIcon width={14} height={14} />
            </Link>
            <a
              className="btn"
              href={`tel:${business.phones[0]}`}
              style={{ width: "100%", padding: "12px", textAlign: "center", fontWeight: 600, fontSize: "0.9rem", borderRadius: 8 }}
            >
              <PhoneIcon width={14} height={14} />
              Call +91 {business.phones[0]}
            </a>
          </aside>
        </div>

        {/* How We Work Stages */}
        <div style={{ marginBottom: 44 }}>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 6, color: "var(--strong)" }}>
            How We Work — From Site Measurement to Handover
          </h2>
          <p className="muted" style={{ marginBottom: 20, fontSize: "0.92rem" }}>
            Every job follows a clear, hassle-free process so you know exactly what is happening at each stage.
          </p>

          <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {workflowStages.map((stage) => (
              <div key={stage.step} className="card" style={{ padding: "20px 18px", borderRadius: 10, border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--red-2)", display: "block", marginBottom: 4 }}>
                  {stage.step}
                </span>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: "0 0 6px", color: "var(--strong)" }}>{stage.title}</h3>
                <p className="muted" style={{ margin: 0, fontSize: "0.86rem", lineHeight: 1.55 }}>{stage.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products from this Service */}
        {relatedProducts.length > 0 && (
          <div style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, marginBottom: 12, color: "var(--strong)" }}>
              Related Products &amp; Designs
            </h2>
            <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
              {relatedProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="card"
                  style={{ textDecoration: "none", color: "inherit", padding: "18px 18px", borderRadius: 10, border: "1px solid var(--border)" }}
                >
                  <h3 style={{ fontSize: "1.08rem", fontWeight: 700, margin: "0 0 6px", color: "var(--strong)" }}>{p.name}</h3>
                  <p className="muted" style={{ fontSize: "0.86rem", lineHeight: 1.5, margin: "0 0 10px" }}>{p.heroTagline}</p>
                  <span style={{ fontSize: "0.82rem", color: "var(--red-2)", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    View Product Details
                    <ArrowRightIcon width={12} height={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Regional Footprint Navigation */}
        <div className="card" style={{ padding: "26px 24px", background: "var(--surface-2)", borderRadius: 12, textAlign: "center", border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Locations We Serve</span>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "6px 0 10px", color: "var(--strong)" }}>
            Available Across Uttar Pradesh
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 800, margin: "0 auto 18px" }}>
            {regionalCities.slice(0, 8).map((city) => (
              <Link
                key={city}
                href={`/locations/${city.toLowerCase()}`}
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 12px",
                  borderRadius: 16,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <MapPinIcon width={12} height={12} style={{ color: "var(--red-2)" }} />
                {service.title} in {city}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/services" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              ← All Services
            </Link>
            <Link className="btn" href="/gallery" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Full Gallery
            </Link>
            <Link className="btn primary" href={`/contact?service=${encodeURIComponent(service.title)}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Get Quotation
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
