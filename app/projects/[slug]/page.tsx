import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { detailedProjectsData, getProjectBySlug } from "@/lib/projectsDetailedData";
import { business } from "@/lib/business";
import { MapPinIcon, CalendarIcon, ArrowRightIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";
  const url = `${baseUrl}/projects/${project.slug}`;

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: [
      project.title.toLowerCase(),
      `${project.category.toLowerCase()} pratapgarh`,
      "metal fabrication case study",
      "sparsh trading projects"
    ],
    alternates: { canonical: url },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url,
      siteName: "Sparsh Trading",
      images: [
        {
          url: `${baseUrl}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.title
        }
      ],
      type: "article"
    }
  };
}

export default async function ProjectCaseStudyPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const baseUrl = process.env.APP_URL || "https://sparshtrading.shop";

  // Case Study Schema
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    image: `${baseUrl}${project.image}`,
    author: {
      "@type": "HomeAndConstructionBusiness",
      name: "Sparsh Trading",
      url: baseUrl
    },
    locationCreated: {
      "@type": "Place",
      name: project.location
    },
    review: {
      "@type": "Review",
      author: { "@type": "Person", name: project.clientTestimonial.author },
      reviewBody: project.clientTestimonial.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: project.clientTestimonial.rating,
        bestRating: 5
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${baseUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${baseUrl}/projects/${project.slug}` }
    ]
  };

  return (
    <main className="section subpage-main" style={{ paddingBottom: 64 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="wrap" style={{ maxWidth: 900 }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" style={{ fontSize: "0.85rem", marginBottom: 18, display: "flex", gap: 6, flexWrap: "wrap", color: "var(--muted)" }}>
          <Link href="/" style={{ color: "var(--text)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/projects" style={{ color: "var(--text)", textDecoration: "none" }}>Projects</Link>
          <span>/</span>
          <span style={{ color: "var(--red-2)", fontWeight: 600 }}>{project.title}</span>
        </nav>

        {/* Hero Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            {project.category} Showcase
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.4rem)", fontWeight: 800, lineHeight: 1.25, marginBottom: 12, color: "var(--strong)" }}>
          {project.title}
        </h1>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: "0.88rem", color: "var(--muted)", marginBottom: 24 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <MapPinIcon width={13} height={13} style={{ color: "var(--red-2)" }} />
            <strong>Location:</strong> {project.location}
          </span>
          <span><strong>Client:</strong> {project.clientName}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <CalendarIcon width={13} height={13} />
            <strong>Completed:</strong> {project.completionDate}
          </span>
        </div>

        {/* Media Showcase */}
        <div
          className="card"
          style={{
            overflow: "hidden",
            borderRadius: 12,
            border: "1px solid var(--border)",
            padding: 0,
            aspectRatio: "16/9",
            background: "#111",
            marginBottom: 32
          }}
        >
          <img
            src={project.image}
            alt={`${project.title} executed by Sparsh Trading`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Project Summary */}
        <div className="card" style={{ padding: "24px 22px", borderLeft: "4px solid var(--red-2)", borderRadius: 10, marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 6, color: "var(--strong)" }}>Project Story &amp; Overview</h2>
          <p style={{ margin: 0, fontSize: "0.98rem", lineHeight: 1.65, color: "var(--text)" }}>{project.summary}</p>
        </div>

        {/* Scope of Work & Materials Used */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div className="card" style={{ padding: "22px 20px", borderRadius: 10, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 12, color: "var(--strong)" }}>What We Made</h2>
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7, fontSize: "0.9rem", color: "var(--text)" }}>
              {project.scopeOfWork.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card" style={{ padding: "22px 20px", borderRadius: 10, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 12, color: "var(--strong)" }}>Materials Used</h2>
            <ul style={{ paddingLeft: 18, margin: 0, lineHeight: 1.7, fontSize: "0.9rem", color: "var(--text)" }}>
              {project.materialsUsed.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Site Challenges & Solutions */}
        {project.challengesAndSolutions.length > 0 && (
          <div className="card" style={{ padding: "24px 22px", marginBottom: 32, borderRadius: 10, border: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 14, color: "var(--strong)" }}>
              Site Challenges &amp; How We Solved Them
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {project.challengesAndSolutions.map((item, i) => (
                <div key={i} style={{ padding: "14px 16px", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, color: "var(--strong)", marginBottom: 4, fontSize: "0.92rem" }}>
                    Site Challenge: {item.challenge}
                  </div>
                  <div style={{ color: "var(--text)", fontSize: "0.9rem", lineHeight: 1.55 }}>
                    <strong>How We Handled It:</strong> {item.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Client Testimonial Card */}
        <div
          className="card"
          style={{
            padding: "24px 22px",
            borderLeft: "4px solid var(--red-2)",
            borderRadius: 10,
            marginBottom: 40,
            border: "1px solid var(--border)",
            borderLeftColor: "var(--red-2)"
          }}
        >
          <div style={{ color: "#f59e0b", fontSize: "1.1rem", marginBottom: 6 }}>
            {"★".repeat(project.clientTestimonial.rating)}
          </div>
          <p style={{ fontSize: "1rem", fontStyle: "italic", lineHeight: 1.6, color: "var(--strong)", margin: "0 0 8px" }}>
            "{project.clientTestimonial.quote}"
          </p>
          <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--muted)" }}>
            — {project.clientTestimonial.author}
          </span>
        </div>

        {/* Action Callout */}
        <div className="card" style={{ padding: "28px 24px", textAlign: "center", borderRadius: 12, border: "1px solid var(--border)" }}>
          <span className="eyebrow" style={{ color: "var(--red-2)" }}>Have a Similar Project?</span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: "6px 0 10px", color: "var(--strong)" }}>
            Get a Custom Quote for Your Home or Site
          </h2>
          <p className="muted" style={{ maxWidth: 620, margin: "0 auto 18px", fontSize: "0.92rem" }}>
            Our team visits your site in Pratapgarh, Sultanpur, Jaunpur, or Prayagraj to take measurements and discuss designs.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="/projects" style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              ← View All Projects
            </Link>
            {project.relatedProductSlug && (
              <Link className="btn" href={`/products/${project.relatedProductSlug}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
                Product Specs →
              </Link>
            )}
            <Link className="btn primary" href={`/contact?service=${encodeURIComponent(project.category)}`} style={{ borderRadius: 8, fontSize: "0.9rem" }}>
              Request Site Visit &amp; Quote
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
