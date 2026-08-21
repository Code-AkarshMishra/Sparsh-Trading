import Link from "next/link";
import { business, metrics, services } from "@/lib/business";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HowWeWork } from "@/components/HowWeWork";
import { BrandImage } from "@/components/BrandImage";
import { ServiceCarousel } from "@/components/ServiceCarousel";

export default function Home() {
  const metricLinks = ["/services", "/#how-we-work", "/contact", "/about"];
  const whyCards = [
    { title: "Quality Materials", desc: "Top-grade steel, PPGI, uPVC, and architectural hardware tested for long-lasting durability." },
    { title: "Custom Fabrication", desc: "Tailored to your specific architectural layout, dimensions, and aesthetic preferences." },
    { title: "Precision Measurement", desc: "Accurate on-site laser and manual surveys to prevent fitting errors." },
    { title: "Skilled Workmanship", desc: "Experienced metalworkers and fabricators ensuring clean welds and sleek finishes." },
    { title: "Clear Communication", desc: "Transparent quotes, timeline commitments, and milestone progress updates." },
    { title: "Installation Support", desc: "Professional on-site installation, alignment checks, and clean final handover." }
  ];

  const featuredProjects = [
    { title: "Steel Gates & Security Frames", category: "Heavy Steel Fabrication", desc: "Durable main entrance gates, window grills, and structural steel framing built for security." },
    { title: "Custom uPVC & Aluminium Window Systems", category: "Windows & Doors", desc: "Energy-efficient sliding and casement systems with noise reduction and weatherproofing." },
    { title: "Modern Railing & Interior Fit-Outs", category: "Interiors & Railings", desc: "Toughened glass railings, modular kitchen setups, and architectural metal accents." }
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

      {/* Full-Width Video Section: 100vw, Directly below sticky Navbar */}
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
      </section>

      {/* Introduction */}
      <section className="intro section" id="introduction">
        <div className="wrap intro-content">
          <span className="eyebrow">Sparsh Trading / Pratapgarh</span>
          <h1 className="display">Built Strong.<br />Designed to Last.</h1>
          <p>
            Architectural metalwork, uPVC windows, heavy steel doors, glass railings, and tailored interior solutions crafted with precision for homes and businesses.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/projects">
              Explore Our Work <span aria-hidden="true">-&gt;</span>
            </Link>
            <Link className="btn" href="/contact">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Section: All cards clickable */}
      <section className="section grid-bg">
        <div className="wrap cards metrics">
          {metrics.map((metric, i) => (
            <Link
              href={metricLinks[i] || "/services"}
              className="metric card clickable"
              key={metric.label}
              aria-label={`${metric.value} ${metric.label} - click to view`}
            >
              <strong className="display">{metric.value}</strong>
              <h3>{metric.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Services Section: All cards fully clickable */}
      <section className="section services-section">
        <div className="wrap">
          <span className="eyebrow">What We Do</span>
          <h2 className="display big-title">Solutions built around your space.</h2>
          <p className="section-lead">
            From a single frame to a complete interior, we help you choose, make and finish the right solution with dependable craftsmanship.
          </p>
          
          <ServiceCarousel services={services} />
          
          <div className="cards service-grid">
            {services.map((s, i) => (
              <Link
                href={`/services/${s.slug}`}
                className="service-card card clickable"
                data-code={`0${i + 1}`}
                key={s.slug}
                aria-label={`View details for ${s.title}`}
              >
                <div>
                  <span className="service-label">Service 0{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p className="muted">{s.description}</p>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <span className="btn" style={{ alignSelf: "flex-start", marginTop: 16 }}>
                  View Service <span aria-hidden="true">-&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="marquee">
        <span>STEEL PRECISION CRAFT STRENGTH DESIGN DETAIL BUILT TO LAST&nbsp;</span>
        <span>STEEL PRECISION CRAFT STRENGTH DESIGN DETAIL BUILT TO LAST&nbsp;</span>
      </div>

      {/* Why Sparsh Section: All cards clickable */}
      <section className="section grid-bg why-section">
        <div className="wrap split">
          <div className="why-copy">
            <span className="eyebrow">Why Sparsh</span>
            <h2 className="display big-title">Built Around Quality. Driven By Precision.</h2>
            <p className="muted">
              Good work starts with clear conversations, careful measurement and materials chosen for the job. Every detail is planned to feel right in the finished space.
            </p>
            <div style={{ marginTop: 24 }}>
              <Link className="btn primary" href="/about">
                Learn About Our Standards <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
          <div className="cards why-cards">
            {whyCards.map((item, i) => (
              <Link
                href="/about"
                className="card process-step clickable"
                key={item.title}
                aria-label={`Learn more about ${item.title}`}
              >
                <span className="step-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p className="muted">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects: All cards clickable */}
      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Featured Projects</span>
          <h2 className="display big-title">Made for real spaces.</h2>
          <p className="section-lead">
            Explore recent fabrication, railing, window and door installations completed across residential and commercial sites.
          </p>
          <div className="cards project-teasers">
            {featuredProjects.map((item) => (
              <Link
                href="/projects"
                className="card project-teaser-card clickable"
                key={item.title}
                aria-label={`View project details for ${item.title}`}
              >
                <div>
                  <span className="eyebrow">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.desc}</p>
                </div>
                <span className="text-link" style={{ marginTop: 16 }}>
                  View projects <span aria-hidden="true">-&gt;</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <HowWeWork />

      {/* Start a Conversation / Enquiry Form */}
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Start a conversation</span>
            <h2 className="display big-title">Have a design in mind?</h2>
            <p className="muted">
              Tell us what you want made. We will discuss the right material, finish and next step with you.
            </p>
            <div className="actions" style={{ marginTop: 24 }}>
              <a className="btn" href={`tel:${business.phones[0]}`}>
                📞 Call Directly
              </a>
              <a className="btn" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
                💬 WhatsApp Us
              </a>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="section grid-bg" id="reviews">
        <div className="wrap">
          <span className="eyebrow">Customer Reviews</span>
          <h2 className="display big-title">Customer stories from real projects.</h2>
          <div className="empty" style={{ display: "grid", gap: 16, placeItems: "center", textAlign: "center" }}>
            <p style={{ margin: 0, fontSize: "1.05rem" }}>
              Have we worked together on a fabrication or interior project? We value your experience!
            </p>
            <Link className="btn primary" href="/contact">
              Share Your Feedback &amp; Review
            </Link>
          </div>
        </div>
      </section>

      {/* Locations / Map Cards: All clickable */}
      <section className="section">
        <div className="wrap cards">
          <a
            className="map-card card clickable"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.office)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions to Sparsh Trading Office on Google Maps"
          >
            <div>
              <span className="eyebrow">Office</span>
              <p>{business.office}</p>
            </div>
            <span className="btn" style={{ alignSelf: "flex-start" }}>
              Get Directions &rarr;
            </span>
          </a>
          <a
            className="map-card card clickable"
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.workshop)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions to Sparsh Trading Workshop on Google Maps"
          >
            <div>
              <span className="eyebrow">Workshop</span>
              <p>{business.workshop}</p>
            </div>
            <span className="btn" style={{ alignSelf: "flex-start" }}>
              Get Directions &rarr;
            </span>
          </a>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="section grid-bg">
        <div className="wrap">
          <h2 className="display big-title">Let's Build Something Strong.</h2>
          <p className="section-lead">
            Contact our workshop and office in Pratapgarh for reliable steel fabrication, uPVC systems, glass railings and customized interior designs.
          </p>
          <div className="actions">
            <a className="btn primary" href={`tel:${business.phones[0]}`}>
              Call {business.phones[0]}
            </a>
            <a className="btn" href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link className="btn" href="/contact">
              Send Enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
