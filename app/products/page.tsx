"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const defaultProducts = [
  { _id: "p1", name: "Heavy Steel Door Frames", category: "Frames", material: "Tata / Jindal Steel", desc: "Anti-corrosion coated door frames suitable for exterior & interior masonry installation." },
  { _id: "p2", name: "Premium uPVC Sliding Windows", category: "Windows", material: "Multi-chamber uPVC", desc: "Dual/triple track sliding window systems with toughened glass and EPDM gaskets." },
  { _id: "p3", name: "Toughened Glass Balcony Railing", category: "Railings", material: "SS 304 + 12mm Glass", desc: "Sleek frameless glass balustrades with stainless steel spigots and top grab rail." },
  { _id: "p4", name: "PPGI Industrial Window Frames", category: "Frames", material: "Pre-Painted Galvanized Iron", desc: "Cost-effective, warp-resistant frames engineered for long-term weather exposure." },
  { _id: "p5", name: "Custom Stainless Steel Main Gate", category: "Gates", material: "Grade 304 Stainless Steel", desc: "Modern laser-cut or tubular gate designs with automated lock compatibility." },
  { _id: "p6", name: "Modular Kitchen Stainless Storage", category: "Interiors", material: "SS 304 Baskets & Hardware", desc: "Soft-close pull-out baskets, corner carousels, and durable cutlery organizers." }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>(defaultProducts);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      fetch(`/api/products?q=${encodeURIComponent(q)}`)
        .then((r) => r.json())
        .then((j) => {
          const list = j.data?.products;
          if (list && list.length > 0) {
            setProducts(list);
          } else if (q.trim() === "") {
            setProducts(defaultProducts);
          } else {
            const filtered = defaultProducts.filter(
              (p) =>
                p.name.toLowerCase().includes(q.toLowerCase()) ||
                p.category.toLowerCase().includes(q.toLowerCase()) ||
                p.material.toLowerCase().includes(q.toLowerCase())
            );
            setProducts(filtered);
          }
        })
        .catch(() => {
          const filtered = defaultProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.category.toLowerCase().includes(q.toLowerCase()) ||
              p.material.toLowerCase().includes(q.toLowerCase())
          );
          setProducts(filtered);
        });
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <main className="section subpage-main">
      <div className="wrap">
        <span className="eyebrow">Products & Materials</span>
        <h1 className="display big-title">Browse material solutions.</h1>
        <p className="section-lead">
          Explore our range of structural steel components, uPVC profiles, PPGI frames, and architectural hardware fabricated for durability.
        </p>

        <div className="form card" style={{ padding: 18, marginBottom: 28 }}>
          <label>
            Search Catalogue
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by product name, category (e.g. Steel, uPVC, Railing) or material..."
            />
          </label>
        </div>

        <div className="cards">
          {products.length ? (
            products.map((p) => (
              <Link
                href={`/contact?product=${encodeURIComponent(p.name)}`}
                className="card process-step clickable"
                key={p._id}
                aria-label={`Enquire about ${p.name}`}
              >
                <span className="eyebrow">{p.category} / {p.material}</span>
                <h2>{p.name}</h2>
                <p className="muted">{p.desc || `${p.material} solution fabricated for residential and commercial applications.`}</p>
                <span className="btn" style={{ alignSelf: "flex-start", marginTop: "auto" }}>
                  Request Price Quote &rarr;
                </span>
              </Link>
            ))
          ) : (
            <div className="empty" style={{ gridColumn: "1 / -1" }}>
              <p>No products matching "{q}".</p>
              <button className="btn primary" onClick={() => setQ("")} style={{ marginTop: 12 }}>
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
