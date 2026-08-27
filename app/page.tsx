import Link from "next/link";
import { business, metrics, services, partners } from "@/lib/business";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HowWeWork } from "@/components/HowWeWork";
import { BrandImage } from "@/components/BrandImage";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { OwnerMessage } from "@/components/OwnerMessage";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoKeywordHub } from "@/components/SeoKeywordHub";
import { MobileSwipeableContainer } from "@/components/MobileSwipeableContainer";



export default function Home() {
  const metricLinks = ["/services", "/#how-we-work", "/contact", "/about"];
  const whyCards = [
    { title: "Genuine Brand Materials", desc: "Heavy-gauge Tata and Jindal steel, lead-free multi-chamber uPVC, SS 304 stainless hardware, and certified toughened glass." },
    { title: "Custom Made for Your Home", desc: "Designed and cut to the exact size of your gates, windows, balconies, stairs, and kitchen spaces." },
    { title: "Accurate Site Measurements", desc: "Free laser measurements across Pratapgarh, Sultanpur, Jaunpur, and nearby UP towns to ensure perfect fitting." },
    { title: "Expert Welds & Finishing", desc: "Smooth corner joints, high strength structural welds, and double anti-rust primer coats on every piece." },
    { title: "Direct Partner Supervision", desc: "Clear pricing with zero hidden fees. Both business partners oversee your work from start to handover." },
    { title: "Safe On-Site Installation", desc: "Trained fitting team ensures neat installation, smooth door alignment, secure locks, and clean job site." }
  ];

  const featuredProjects = [
    { title: "Heavy Steel Entrance Gates & Grills", category: "Structural Steel", desc: "Heavy main gates with CNC laser patterns, anti-rust primer finish, and motor bracket support." },
    { title: "Soundproof uPVC & Aluminium Windows", category: "Windows & Doors", desc: "Dual & triple track sliding windows with acoustic insulation, dust seals, and SS mosquito mesh." },
    { title: "Frameless Toughened Glass Railings", category: "Balustrades & Railings", desc: "12mm safety glass with SS 304 mirror spigots and modern stainless handrails for balconies and stairs." }
  ];

  return (
    <main>
      {/* Preloader */}
      <div className="preloader">
        <div className="brand">
          <div className="preloader-logo">
            <BrandImage src="/brand-logo.png" alt="SPARSH TRADING logo" />
          </div>
          <BrandImage className="preloader-wordmark" src="/brand-wordmark.png" alt="SPARSH TRADING" />
          <span className="loading-line" aria-label="Loading" />
        </div>
      </div>

      {/* Full-Width Video Section */}
      <section className="hero-video-section" id="home" aria-label="Sparsh Trading workshop video">
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="SPARSH TRADING workshop hero video"
        />
        <div className="hero-video-overlay" />
      </section>

      {/* Introduction */}
      <section className="intro section" id="introduction">
        <div className="wrap intro-content">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span className="brand-dot-pulse" />
            <div style={{ height: 22, display: "inline-flex", alignItems: "center" }}>
              <BrandImage src="/brand-wordmark.png" alt="SPARSH TRADING" style={{ height: 20, width: "auto" }} />
            </div>
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700, letterSpacing: "0.1em" }}>
              / PRATAPGARH, UP
            </span>
          </div>
          
          <h1 className="display" style={{ textShadow: "0 2px 20px rgba(217, 45, 32, 0.2)" }}>
            Built Strong.<br />Designed to Last.
          </h1>
          
          <p style={{ maxWidth: 720, fontSize: "1.18rem", lineHeight: 1.65 }}>
            Premier architectural steel fabrication, soundproof uPVC window systems, heavy structural gates, frameless glass railings, and custom modular kitchens crafted with dependable durability in Pratapgarh.
          </p>

          <div className="hero-actions">
            <Link className="btn primary" href="/projects" style={{ padding: "14px 28px", fontSize: "1rem" }}>
              Explore Project Gallery →
            </Link>
            <Link className="btn" href="/contact" style={{ padding: "14px 28px", fontSize: "1rem", borderColor: "var(--red-2)" }}>
              Request Instant Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section grid-bg">
        <div className="wrap">
          <MobileSwipeableContainer autoSlideInterval={2800} gridClassName="cards metrics">
            {metrics.map((metric, i) => (
              <Link
                href={metricLinks[i] || "/services"}
                className="metric card clickable"
                key={metric.label}
                aria-label={`${metric.value} ${metric.label} - click to view`}
                style={{ borderLeft: "4px solid var(--red-2)" }}
              >
                <strong className="display" style={{ color: "var(--red-2)", fontSize: "2.8rem" }}>{metric.value}</strong>
                <h3 style={{ fontSize: "1.05rem", marginTop: 4 }}>{metric.label}</h3>
              </Link>
            ))}
          </MobileSwipeableContainer>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span className="brand-dot-pulse" />
            <span className="eyebrow" style={{ color: "var(--red-2)", margin: 0, fontWeight: 700 }}>
              Specialized Capabilities
            </span>
          </div>
          <h2 className="display big-title">Solutions built around your space.</h2>
          <p className="section-lead">
            From precision steel door frames to turnkey modular kitchens, we engineer and install heavy-duty home solutions backed by skilled craftsmanship.
          </p>
          
          <ServiceCarousel services={services} />
          
          <div className="cards service-grid">
            {services.map((s, i) => (
              <Link
                href={`/services/${s.slug}`}
                className="service-card card clickable"
                key={s.slug}
                aria-label={`View details for ${s.title}`}
                style={{ position: "relative" }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="service-label" style={{ color: "var(--red-2)", fontWeight: 800 }}>
                      Service 0{i + 1}
                    </span>
                    <span style={{ color: "var(--red-2)", fontWeight: 900 }}>→</span>
                  </div>

                  <h3 style={{ fontSize: "1.45rem", margin: "8px 0 10px", color: "var(--strong)" }}>
                    {s.title}
                  </h3>
                  <p className="muted" style={{ fontSize: "0.94rem" }}>{s.description}</p>
                  
                  <ul style={{ margin: "14px 0 18px", paddingLeft: 0, listStyle: "none" }}>
                    {s.items.slice(0, 4).map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.88rem", marginBottom: 6 }}>
                        <span style={{ color: "var(--red-2)", fontWeight: 900 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <span className="btn" style={{ alignSelf: "flex-start", marginTop: "auto", fontSize: "0.88rem", borderColor: "var(--red-2)" }}>
                  Explore {s.title} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee">
        <span>★ TATA STEEL FABRICATION ★ SOUNDPROOF uPVC WINDOWS ★ TOUGHENED GLASS RAILINGS ★ MODULAR KITCHENS ★ PPGI FRAMES ★ CNC METAL DESIGN&nbsp;</span>
        <span>★ TATA STEEL FABRICATION ★ SOUNDPROOF uPVC WINDOWS ★ TOUGHENED GLASS RAILINGS ★ MODULAR KITCHENS ★ PPGI FRAMES ★ CNC METAL DESIGN&nbsp;</span>
      </div>

      {/* Why Sparsh Section */}
      <section className="section grid-bg why-section">
        <div className="wrap split">
          <div className="why-copy">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span className="brand-dot-pulse" />
              <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
                The Sparsh Advantage
              </span>
            </div>
            <h2 className="display big-title">Built Around Quality. Driven By Care.</h2>
            <p className="muted" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
              Great structural work begins with honest conversations, laser measurements, and top-grade steel and uPVC profiles. We make sure every gate, window, and railing is fabricated to last for generations without sagging or rust.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link className="btn primary" href="/about">
                Learn About Our Standards →
              </Link>
            </div>
          </div>
          <div className="why-cards">
            <MobileSwipeableContainer autoSlideInterval={3200} gridClassName="cards why-cards">
              {whyCards.map((item, i) => (
                <Link
                  href="/about"
                  className="card process-step clickable"
                  key={item.title}
                  aria-label={`Learn more about ${item.title}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span className="step-number" style={{ color: "var(--red-2)", fontWeight: 800 }}>0{i + 1}</span>
                    <span style={{ color: "var(--red-2)", fontSize: "0.9rem" }}>▸</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", margin: "0 0 6px" }}>{item.title}</h3>
                  <p className="muted" style={{ fontSize: "0.9rem", margin: 0 }}>{item.desc}</p>
                </Link>
              ))}
            </MobileSwipeableContainer>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
            Featured Installations
          </span>
          <h2 className="display big-title">Made for real spaces.</h2>
          <p className="section-lead">
            Explore recent metal fabrication, railing systems, uPVC windows, and custom kitchens completed across Pratapgarh and nearby districts.
          </p>
          <MobileSwipeableContainer autoSlideInterval={3500} gridClassName="cards project-teasers">
            {featuredProjects.map((item) => (
              <Link
                href="/projects"
                className="card project-teaser-card clickable"
                key={item.title}
                aria-label={`View project details for ${item.title}`}
                style={{ borderTop: "3px solid var(--red-2)" }}
              >
                <div>
                  <span className="eyebrow" style={{ color: "var(--red-2)" }}>{item.category}</span>
                  <h3 style={{ fontSize: "1.35rem" }}>{item.title}</h3>
                  <p className="muted" style={{ fontSize: "0.92rem" }}>{item.desc}</p>
                </div>
                <span className="text-link" style={{ marginTop: 18, color: "var(--red-2)", fontWeight: 700 }}>
                  View projects →
                </span>
              </Link>
            ))}
          </MobileSwipeableContainer>
        </div>
      </section>


      {/* Leadership / Partners Section */}
      <OwnerMessage />

      {/* How We Work Flowchart Section */}
      <HowWeWork />

      {/* Verified Customer Reviews */}
      <ReviewsSection />

      {/* 500+ SEO Keywords & FAQ Rich Snippet Hub */}
      <SeoKeywordHub />


      {/* Rich Local SEO Guide for Uttar Pradesh (500+ Words) */}
      <section className="section grid-bg">
        <div className="wrap">
          <div className="card" style={{ padding: "40px 32px", borderLeft: "4px solid var(--red-2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className="brand-dot-pulse" />
              <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
                Local Manufacturing &amp; Fabrication Leader in Uttar Pradesh
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", margin: "6px 0 16px" }}>
              <h2 className="display" style={{ fontSize: "1.8rem", margin: 0 }}>
                Why Choose
              </h2>
              <div style={{ height: 32, display: "inline-flex", alignItems: "center" }}>
                <BrandImage src="/brand-wordmark.png" alt="SPARSH TRADING" style={{ height: 28, width: "auto" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: "0.98rem", lineHeight: 1.75, color: "var(--text)" }}>
              <p>
                <strong>SPARSH TRADING</strong> is an established steel fabrication workshop and architectural systems manufacturer headquartered in Pratapgarh, Uttar Pradesh. Whether you are building a new residential home, renovating an apartment, constructing a commercial showroom, or seeking wholesale door and window frames, we provide engineered products built to withstand decades of weather and heavy use.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, margin: "8px 0" }}>
                <div style={{ background: "var(--surface-2)", padding: "16px 18px", borderRadius: 8 }}>
                  <strong style={{ color: "var(--strong)", display: "block", marginBottom: 4 }}>Tata Steel Door Frames (Chaukhat)</strong>
                  <span className="muted" style={{ fontSize: "0.88rem" }}>Anti-corrosion, double-rebate steel frames bent to millimeter perfection for Indian masonry walls.</span>
                </div>
                <div style={{ background: "var(--surface-2)", padding: "16px 18px", borderRadius: 8 }}>
                  <strong style={{ color: "var(--strong)", display: "block", marginBottom: 4 }}>Soundproof uPVC Windows</strong>
                  <span className="muted" style={{ fontSize: "0.88rem" }}>Multi-chamber insulated profiles with smooth sliding tracks, mosquito mesh, and noise cancellation.</span>
                </div>
                <div style={{ background: "var(--surface-2)", padding: "16px 18px", borderRadius: 8 }}>
                  <strong style={{ color: "var(--strong)", display: "block", marginBottom: 4 }}>12mm Glass Balcony Railings</strong>
                  <span className="muted" style={{ fontSize: "0.88rem" }}>High-tensile architectural safety glass with mirror SS 304 spigots and slim grab rails.</span>
                </div>
                <div style={{ background: "var(--surface-2)", padding: "16px 18px", borderRadius: 8 }}>
                  <strong style={{ color: "var(--strong)", display: "block", marginBottom: 4 }}>Custom Modular Kitchens</strong>
                  <span className="muted" style={{ fontSize: "0.88rem" }}>Termite-proof HDHMR marine ply with German hydraulic soft-close pull-out baskets and acrylic shutters.</span>
                </div>
              </div>

              <p>
                <strong>Regional Service Coverage:</strong> We provide on-site laser measurements, delivery, and complete technician fitting across <strong>Pratapgarh</strong> (Meera Bhawan, Katra Road, City Road, Ajeet Nagar, Civil Lines), <strong>Sultanpur</strong>, <strong>Jaunpur</strong>, <strong>Prayagraj (Allahabad)</strong>, <strong>Varanasi</strong>, <strong>Lucknow</strong>, <strong>Raebareli</strong>, and surrounding UP districts.
              </p>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 24 }}>
              <Link className="btn primary" href="/contact">
                Book Free Site Measurement →
              </Link>
              <Link className="btn" href="/products">
                Browse Product Catalogue
              </Link>
              <a className="btn whatsapp-action" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
                💬 Direct WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Conversation / Enquiry Form */}
      <section className="section" id="enquiry">
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Direct Consultation
            </span>
            <h2 className="display big-title">Have a project in mind?</h2>
            <p className="muted" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
              Tell us what you want made. We will discuss the right material grades, prepare exact measurements, and provide a clear quote.
            </p>
            
            <div className="card" style={{ padding: 20, marginTop: 24, borderLeft: "3px solid var(--red-2)" }}>
              <strong style={{ display: "block", color: "var(--strong)", fontSize: "1.05rem" }}>
                Direct Partner Lines:
              </strong>
              <p style={{ margin: "6px 0 12px", color: "var(--text)" }}>
                Call: <a href={`tel:${business.phones[0]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}>+91 {business.phones[0]}</a> &nbsp;|&nbsp; 
                <a href={`tel:${business.phones[1]}`} style={{ color: "var(--red-2)", fontWeight: 700 }}> +91 {business.phones[1]}</a>
              </p>
              <div className="actions">
                <a className="btn primary" href={`tel:${business.phones[0]}`} style={{ padding: "8px 16px", fontSize: "0.88rem" }}>
                  📞 Call Now
                </a>
                <a className="btn whatsapp-action" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", fontSize: "0.88rem" }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
          
          <EnquiryForm />
        </div>
      </section>

      {/* Locations / Map Cards */}
      <section className="section grid-bg">
        <div className="wrap">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span className="eyebrow" style={{ color: "var(--red-2)", fontWeight: 700 }}>
              Visit Us in Pratapgarh
            </span>
            <h2 className="display big-title" style={{ margin: "6px 0 0" }}>
              Our Office &amp; Fabrication Workshop
            </h2>
          </div>

          <div className="cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
            <a
              className="map-card card clickable"
              href={business.officeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Sparsh Trading Office on Google Maps"
              style={{ borderTop: "3px solid var(--red-2)" }}
            >
              <div>
                <span className="eyebrow" style={{ color: "var(--red-2)" }}>🏢 Main Office &amp; Consultation</span>
                <h3 style={{ margin: "8px 0 10px" }}>Sparsh Trading Office</h3>
                <p style={{ color: "var(--text)", fontSize: "0.98rem", margin: 0 }}>{business.office}</p>
              </div>
              <span className="btn primary" style={{ alignSelf: "flex-start", marginTop: 20 }}>
                Open Office in Google Maps →
              </span>
            </a>

            <a
              className="map-card card clickable"
              href={business.workshopMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Sparsh Trading Workshop on Google Maps"
              style={{ borderTop: "3px solid var(--red-2)" }}
            >
              <div>
                <span className="eyebrow" style={{ color: "var(--red-2)" }}>⚙️ Heavy Fabrication Workshop</span>
                <h3 style={{ margin: "8px 0 10px" }}>Sparsh Trading Workshop</h3>
                <p style={{ color: "var(--text)", fontSize: "0.98rem", margin: 0 }}>{business.workshop}</p>
              </div>
              <span className="btn primary" style={{ alignSelf: "flex-start", marginTop: 20 }}>
                Open Workshop in Google Maps →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="section">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2 className="display big-title" style={{ margin: "0 auto 12px", maxWidth: 800 }}>
            Let's Build Something Strong.
          </h2>
          <p className="section-lead" style={{ maxWidth: 680, margin: "0 auto 28px" }}>
            Contact our Pratapgarh workshop and office today for reliable steel fabrication, uPVC systems, glass railings, and customized interior designs.
          </p>
          <div className="actions" style={{ justifyContent: "center", gap: 16 }}>
            <a className="btn primary" href={`tel:${business.phones[0]}`} style={{ padding: "14px 28px" }}>
              Call +91 {business.phones[0]}
            </a>
            <a className="btn whatsapp-action" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px" }}>
              💬 Chat on WhatsApp
            </a>
            <Link className="btn" href="/contact" style={{ padding: "14px 28px", borderColor: "var(--red-2)" }}>
              Send Project Enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
