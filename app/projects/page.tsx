"use client";

import Link from "next/link";
import { detailedProjectsData } from "@/lib/projectsDetailedData";
import { MapPinIcon, ArrowRightIcon } from "@/components/Icons";

export default function ProjectsPage() {
  return (
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Our Work in Uttar Pradesh
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 850 }}>
          Recent Projects &amp; Real Installations
        </h1>
        <p className="section-lead" style={{ maxWidth: 780 }}>
          Take a look at real metal gates, glass railings, uPVC window systems, and modular kitchens fabricated in our Pratapgarh workshop and installed on site.
        </p>

        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, marginTop: 32 }}>
          {detailedProjectsData.map((project) => (
            <article
              className="card"
              key={project.slug}
              style={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative", background: "#111" }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      background: "rgba(0,0,0,0.75)",
                      backdropFilter: "blur(6px)",
                      color: "#fff",
                      padding: "3px 10px",
                      borderRadius: 14,
                      fontSize: "0.72rem",
                      fontWeight: 700
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <div style={{ padding: "18px 18px 10px" }}>
                  <h2 style={{ fontSize: "1.12rem", fontWeight: 700, margin: "0 0 6px", color: "var(--strong)", lineHeight: 1.35 }}>
                    {project.title}
                  </h2>
                  <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 10px" }}>
                    {project.summary}
                  </p>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", margin: 0, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <MapPinIcon width={13} height={13} style={{ color: "var(--red-2)" }} />
                    {project.location}
                  </p>
                </div>
              </Link>

              <div
                style={{
                  padding: "12px 18px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "var(--surface-2)"
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  style={{
                    color: "var(--red-2)",
                    fontWeight: 700,
                    fontSize: "0.84rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  View Details
                  <ArrowRightIcon width={13} height={13} />
                </Link>
                <Link
                  className="btn primary"
                  href={`/contact?service=${encodeURIComponent(project.category)}`}
                  style={{ fontSize: "0.78rem", padding: "6px 12px", minHeight: 30, borderRadius: 6 }}
                >
                  Get Estimate
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="card" style={{ padding: "36px 28px", marginTop: 48, textAlign: "center", borderRadius: 12, border: "1px solid var(--border)" }}>
          <h2 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: 8, color: "var(--strong)" }}>
            Planning a Project for Your Home or Site?
          </h2>
          <p className="muted" style={{ maxWidth: 640, margin: "0 auto 20px", fontSize: "0.92rem" }}>
            We visit your site to take free measurements and discuss designs for gates, railings, windows, or modular kitchens.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn primary" href="/contact" style={{ borderRadius: 8, fontSize: "0.92rem" }}>
              Request Free Site Visit
            </Link>
            <Link className="btn" href="/products" style={{ borderRadius: 8, fontSize: "0.92rem" }}>
              Browse Products Catalogue
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
