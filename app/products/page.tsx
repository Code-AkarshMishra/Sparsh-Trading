"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { detailedProducts } from "@/lib/productsCatalogueData";
import { ArrowRightIcon } from "@/components/Icons";

const categories = ["All", "Frames", "Windows", "Railings", "Gates", "Interiors"];

export default function ProductsPage() {
  const [products, setProducts] = useState(detailedProducts);
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    let filtered = detailedProducts;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (q.trim() !== "") {
      const query = q.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.heroTagline.toLowerCase().includes(query)
      );
    }
    setProducts(filtered);
  }, [q, selectedCategory]);

  return (
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Workshop Products
          </span>
        </div>

        <h1 className="big-title" style={{ maxWidth: 850 }}>
          Steel Frames, uPVC Windows &amp; Glass Railings
        </h1>
        <p className="section-lead" style={{ maxWidth: 780 }}>
          Custom-fabricated to your required size and gauge. Includes direct workshop pricing, material warranties, and careful on-site installation across Uttar Pradesh.
        </p>

        {/* Search and Category Filters */}
        <div
          className="card"
          style={{
            padding: "24px",
            margin: "28px 0 32px",
            borderRadius: 12,
            border: "1px solid var(--border)",
            background: "var(--surface)"
          }}
        >
          <label style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--strong)", display: "block", marginBottom: 10 }}>
            Search Catalogue
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by material (e.g. Tata Steel, uPVC, Toughened Glass, Acrylic, PPGI)..."
              style={{
                marginTop: 8,
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                fontSize: "0.92rem",
                background: "var(--surface-2)",
                color: "var(--text)"
              }}
            />
          </label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="btn"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: "0.82rem",
                  padding: "6px 14px",
                  minHeight: 32,
                  borderRadius: 20,
                  background: selectedCategory === cat ? "var(--red-2)" : "var(--surface-2)",
                  color: selectedCategory === cat ? "#ffffff" : "var(--text)",
                  borderColor: selectedCategory === cat ? "var(--red-2)" : "var(--border)",
                  fontWeight: selectedCategory === cat ? 700 : 500
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          {products.length ? (
            products.map((p) => (
              <article
                className="card"
                key={p.slug}
                style={{
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 0,
                  overflow: "hidden",
                  background: "var(--surface)"
                }}
              >
                <Link href={`/products/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative", background: "#111" }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
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
                        fontWeight: 700,
                        letterSpacing: "0.02em"
                      }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div style={{ padding: "18px 18px 10px" }}>
                    <h2 style={{ fontSize: "1.12rem", fontWeight: 700, margin: "0 0 6px", color: "var(--strong)", lineHeight: 1.35 }}>
                      {p.name}
                    </h2>
                    <p className="muted" style={{ fontSize: "0.88rem", lineHeight: 1.5, margin: "0 0 12px" }}>
                      {p.heroTagline}
                    </p>

                    <div style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: 4 }}>
                      <strong style={{ color: "var(--text)" }}>Material:</strong> {p.material.split("+")[0]}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--strong)", fontWeight: 600 }}>
                      <span style={{ color: "var(--red-2)", fontWeight: 800 }}>✓</span> Custom Sizing &amp; Fitting Available
                    </div>
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
                    href={`/products/${p.slug}`}
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
                    View Specs
                    <ArrowRightIcon width={13} height={13} />
                  </Link>
                  <Link
                    className="btn primary"
                    href={`/contact?product=${encodeURIComponent(p.name)}`}
                    style={{ fontSize: "0.78rem", padding: "6px 12px", minHeight: 30, borderRadius: 6 }}
                  >
                    Quick Quote
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="empty card" style={{ gridColumn: "1 / -1", padding: "48px 24px", textAlign: "center" }}>
              <p style={{ fontSize: "1.05rem", color: "var(--muted)", margin: 0 }}>No products matching "{q}".</p>
              <button
                className="btn primary"
                onClick={() => {
                  setQ("");
                  setSelectedCategory("All");
                }}
                style={{ marginTop: 14, borderRadius: 8 }}
              >
                Clear Search &amp; Show All
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
