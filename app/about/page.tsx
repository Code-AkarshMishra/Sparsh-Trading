import Link from "next/link";
import { business } from "@/lib/business";

export default function AboutPage() {
  const sections = [
    { title: "Who We Are", desc: "A dedicated architectural metalwork and fabrication firm in Pratapgarh, UP, delivering robust industrial and residential solutions." },
    { title: "What We Do", desc: "Custom steel fabrication, PPGI door frames, uPVC window systems, toughened glass railings, and modular interior fittings." },
    { title: "Our Approach", desc: "Every project starts with exact site measurements, material selection, transparent pricing, and direct client consultation." },
    { title: "Quality Philosophy", desc: "We utilize industrial-grade structural steel, high-tensile fasteners, and corrosion-resistant coatings built for long life." },
    { title: "Design Philosophy", desc: "Balancing utilitarian strength with modern aesthetic finishes that integrate seamlessly with contemporary architecture." },
    { title: "Craftsmanship", desc: "Precision cutting, flawless welding, smooth edge finishing, and strict quality checks before on-site installation." },
    { title: "Local Workshop", desc: `Our workshop at ${business.workshop} is fully equipped with metal cutting, bending, and assembly equipment.` },
    { title: "Service Area", desc: `Proudly serving Pratapgarh, Allahabad, Sultanpur, Jaunpur, and surrounding regions in Uttar Pradesh.` }
  ];

  return (
    <main className="section grid-bg subpage-main">
      <div className="wrap">
        <span className="eyebrow">About Us</span>
        <h1 className="display big-title">
          SPARSH TRADING builds practical architectural metalwork for Pratapgarh.
        </h1>
        <p className="section-lead">
          Engineering strength, architectural beauty, and dedicated craftsmanship in every gate, frame, window, and interior structure we build.
        </p>

        <div className="cards">
          {sections.map((x) => (
            <section className="card process-step" key={x.title}>
              <h2>{x.title}</h2>
              <p className="muted">{x.desc}</p>
            </section>
          ))}
        </div>

        <div className="actions" style={{ marginTop: 48 }}>
          <Link className="btn primary" href="/contact">
            Start a Project with Us
          </Link>
          <Link className="btn" href="/services">
            Explore Services
          </Link>
          <Link className="btn" href="/projects">
            View Project Gallery
          </Link>
        </div>
      </div>
    </main>
  );
}
