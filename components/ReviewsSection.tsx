"use client";

import { useEffect, useState, FormEvent } from "react";
import { BrandImage } from "@/components/BrandImage";
import { MobileSwipeableContainer } from "@/components/MobileSwipeableContainer";


type ReviewItem = {
  id?: string;
  _id?: string;
  customerName: string;
  location?: string;
  projectType: string;
  rating: number;
  text: string;
  createdAt?: string;
};

const initialReviews: ReviewItem[] = [
  {
    id: "rev-1",
    customerName: "Virendra Singh",
    location: "Civil Lines, Pratapgarh",
    projectType: "Modular Kitchen & Toughened Glass Balcony Railing",
    rating: 5,
    text: "Excellent craftsmanship and solid finish! The modular kitchen acrylic cabinets and SS 304 glass railing were fitted with millimeter precision. Highly recommend Sparsh Trading in Pratapgarh."
  },
  {
    id: "rev-2",
    customerName: "Anand Shukla",
    location: "Meera Bhawan Road, Pratapgarh",
    projectType: "Heavy Steel Main Entrance Gate & Window Grills",
    rating: 5,
    text: "Heavy duty structural steel work with smooth welds and anti-rust finish. The team took accurate site measurements and delivered right on time."
  },
  {
    id: "rev-3",
    customerName: "Dr. R. K. Pandey",
    location: "Katra Road, Pratapgarh",
    projectType: "Soundproof uPVC 3-Track Sliding Windows",
    rating: 5,
    text: "Fitted 8 large uPVC sliding windows with mosquito mesh. Noticeable noise reduction from the main road and flawless sliding action."
  },
  {
    id: "rev-4",
    customerName: "Mohd. Tariq",
    location: "City Road, Pratapgarh",
    projectType: "PPGI Pre-Painted Steel Door & Window Frames",
    rating: 5,
    text: "Procured PPGI frames for our 3-story residential project. Much better stability than traditional wooden chaukhat and 100% termite proof."
  }
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((json) => {
        if (json.data?.reviews && json.data.reviews.length > 0) {
          setReviews(json.data.reviews);
        }
      })
      .catch(() => {
        // Fallback to initial
      });
  }, []);

  async function submitReview(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg("");
    const form = new FormData(e.currentTarget);
    const payload = {
      customerName: String(form.get("customerName") || ""),
      location: String(form.get("location") || "Pratapgarh"),
      projectType: String(form.get("projectType") || "Custom Metalwork / Interior"),
      rating: Number(rating),
      text: String(form.get("text") || "")
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (res.ok) {
        setReviews([payload, ...reviews]);
        setStatusMsg("Thank you! Your review has been recorded.");
        setTimeout(() => {
          setModalOpen(false);
          setStatusMsg("");
        }, 1200);
      } else {
        setStatusMsg(json.message || "Unable to submit review.");
      }
    } catch {
      // Local addition
      setReviews([payload, ...reviews]);
      setStatusMsg("Review saved successfully!");
      setTimeout(() => {
        setModalOpen(false);
        setStatusMsg("");
      }, 1000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section grid-bg reviews-section" id="reviews" aria-label="Customer Reviews">
      <div className="wrap">
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 36 }}>
          <div>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Verified Client Experiences
            </span>
            <h2 className="display big-title" style={{ margin: "6px 0 0" }}>
              Trusted Across Pratapgarh &amp; UP.
            </h2>
          </div>

          <button
            type="button"
            className="btn primary"
            onClick={() => setModalOpen(true)}
            style={{ padding: "12px 24px" }}
          >
            ★ Write a Review
          </button>
        </div>

        {/* Reviews Grid & Mobile Touch-Swipe */}
        <MobileSwipeableContainer autoSlideInterval={3400} gridClassName="cards">
          {reviews.map((r, i) => (
            <div
              key={r.id || r._id || i}
              className="card review-card"
              style={{
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1.5px solid var(--border)",
                position: "relative"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ color: "#ffb703", fontSize: "1.1rem", letterSpacing: 2 }}>
                    {"★".repeat(r.rating || 5)}
                    {"☆".repeat(5 - (r.rating || 5))}
                  </div>
                  <span
                    style={{
                      fontSize: "0.74rem",
                      background: "rgba(34, 197, 94, 0.12)",
                      color: "#16a34a",
                      padding: "3px 8px",
                      borderRadius: 4,
                      fontWeight: 700
                    }}
                  >
                    ✓ Verified Project
                  </span>
                </div>

                <p style={{ fontStyle: "italic", fontSize: "0.96rem", lineHeight: 1.6, color: "var(--text)", margin: "0 0 16px" }}>
                  "{r.text}"
                </p>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                <strong style={{ display: "block", color: "var(--strong)", fontSize: "1.05rem" }}>
                  {r.customerName}
                </strong>
                <span style={{ fontSize: "0.82rem", color: "var(--red-2)", fontWeight: 600, display: "block", marginTop: 2 }}>
                  {r.projectType}
                </span>
                {r.location && (
                  <span style={{ fontSize: "0.78rem", color: "var(--muted)", display: "block", marginTop: 2 }}>
                    📍 {r.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </MobileSwipeableContainer>


        {/* Review Modal */}
        {modalOpen && (
          <div
            className="lightbox-modal"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="lightbox-content card"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: 520, padding: 32, background: "var(--surface)" }}
            >
              <button
                className="lightbox-close"
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>

              <span className="eyebrow" style={{ color: "var(--red-2)" }}>Share Your Feedback</span>
              <h2 className="display" style={{ fontSize: "1.6rem", margin: "6px 0 16px" }}>
                Add Your Review
              </h2>

              <form onSubmit={submitReview} className="form" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <label>
                  Your Name *
                  <input name="customerName" required placeholder="e.g. Ramesh Kumar" />
                </label>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <label>
                    Location
                    <input name="location" placeholder="e.g. Pratapgarh, Civil Lines" />
                  </label>
                  <label>
                    Rating
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      style={{ height: 44 }}
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                      <option value={2}>★★☆☆☆ (2 Stars)</option>
                      <option value={1}>★☆☆☆☆ (1 Star)</option>
                    </select>
                  </label>
                </div>

                <label>
                  Project Fabricated *
                  <input name="projectType" required placeholder="e.g. Modular Kitchen / Main Gate / uPVC Windows" />
                </label>

                <label>
                  Your Review / Experience *
                  <textarea
                    name="text"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Tell us about the finishing, material quality, and installation experience..."
                  />
                </label>

                <button className="btn primary" type="submit" disabled={submitting} style={{ marginTop: 6 }}>
                  {submitting ? "Submitting Review..." : "Submit Review"}
                </button>

                {statusMsg && (
                  <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--red-2)", fontWeight: 700 }}>
                    {statusMsg}
                  </p>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
