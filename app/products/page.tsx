"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { defaultProductsCatalogue } from "@/lib/productsData";



const categories = ["All", "Frames", "Windows", "Railings", "Gates", "Interiors"];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>(defaultProductsCatalogue);
  const [q, setQ] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(selectedCategory)}`)
        .then((r) => r.json())
        .then((j) => {
          const list = j.data?.products;
          if (list && list.length > 0) {
            setProducts(list);
          } else {
            // Local search fallback
            let filtered = defaultProductsCatalogue;
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
                  p.desc.toLowerCase().includes(query)
              );
            }
            setProducts(filtered);
          }
        })
        .catch(() => {
          let filtered = defaultProductsCatalogue;
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
                p.desc.toLowerCase().includes(query)
            );
          }
          setProducts(filtered);
        });
    }, 150);
    return () => clearTimeout(t);
  }, [q, selectedCategory]);

  return (
    <main className="section subpage-main">
      <div className="wrap">
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span className="brand-dot-pulse" />
          <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
            Material Catalogue &amp; Products
          </span>
        </div>
        <h1 className="display big-title">Browse structural &amp; interior materials.</h1>
        <p className="section-lead">
          Explore our range of heavy Tata steel door frames, soundproof uPVC profiles, frameless glass balustrades, and modular kitchen hardware fabricated for long-term durability.
        </p>

        {/* Search and Category Filters */}
        <div className="form card" style={{ padding: 24, margin: "32px 0 28px", borderLeft: "4px solid var(--red-2)" }}>
          <label style={{ fontSize: "1.05rem", fontWeight: 700 }}>
            Search Catalogue
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by material (e.g. Tata Steel, uPVC, Toughened Glass, Acrylic, PPGI)..."
              style={{ marginTop: 8 }}
            />
          </label>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className="btn"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontSize: "0.84rem",
                  padding: "6px 14px",
                  minHeight: 34,
                  background: selectedCategory === cat ? "var(--red-2)" : "var(--surface)",
                  color: selectedCategory === cat ? "#ffffff" : "var(--strong)",
                  borderColor: selectedCategory === cat ? "var(--red-2)" : "var(--border)"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {products.length ? (
            products.map((p) => (
              <Link
                href={`/contact?product=${encodeURIComponent(p.name)}`}
                className="card process-step clickable"
                key={p._id}
                aria-label={`Enquire about ${p.name}`}
                style={{
                  borderTop: "3px solid var(--red-2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span className="eyebrow" style={{ color: "var(--red-2)", fontSize: "0.74rem", margin: 0 }}>
                      {p.category} / {p.material}
                    </span>
                    <span style={{ color: "var(--red-2)" }}>▸</span>
                  </div>

                  <h2 style={{ fontSize: "1.3rem", margin: "6px 0 10px", color: "var(--strong)" }}>{p.name}</h2>
                  <p className="muted" style={{ fontSize: "0.92rem", lineHeight: 1.5 }}>
                    {p.desc || `${p.material} solution fabricated for residential and commercial applications.`}
                  </p>

                  {p.application && (
                    <span style={{ display: "block", fontSize: "0.82rem", color: "var(--muted)", marginTop: 10 }}>
                      <strong>Application:</strong> {p.application}
                    </span>
                  )}
                </div>

                <div style={{ marginTop: 20, paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="btn primary" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                    Request Price Quote →
                  </span>
                </div>

              </Link>
            ))
          ) : (
            <div className="empty" style={{ gridColumn: "1 / -1", padding: "48px 24px" }}>
              <p style={{ fontSize: "1.1rem" }}>No products matching "{q}".</p>
              <button
                className="btn primary"
                onClick={() => {
                  setQ("");
                  setSelectedCategory("All");
                }}
                style={{ marginTop: 14 }}
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
