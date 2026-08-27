export type DetailedProject = {
  slug: string;
  title: string;
  category: string;
  location: string;
  clientName: string;
  completionDate: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  scopeOfWork: string[];
  materialsUsed: string[];
  challengesAndSolutions: { challenge: string; solution: string }[];
  clientTestimonial: { quote: string; author: string; rating: number };
  image: string;
  galleryImages: string[];
  relatedProductSlug?: string;
  relatedServiceSlug: string;
};

export const detailedProjectsData: DetailedProject[] = [
  {
    slug: "civil-lines-modular-kitchen",
    title: "Modern L-Shaped Acrylic Modular Kitchen & Pantry",
    category: "Modular Kitchen",
    location: "Civil Lines, Pratapgarh, Uttar Pradesh",
    clientName: "Mr. V. Singh (Residential Villa)",
    completionDate: "June 2026",
    metaTitle: "Modular Kitchen Project in Civil Lines, Pratapgarh | Sparsh Trading Case Study",
    metaDescription: "Case study of a modern L-shaped acrylic modular kitchen with SS 304 tandem baskets & quartz counters in Civil Lines, Pratapgarh. Designed & installed by Sparsh Trading.",
    summary: "Complete design, custom workshop manufacturing, and on-site fitting of an ergonomic L-shaped modular kitchen featuring boiling water-proof (BWP) marine plywood, high-gloss acrylic shutters, and soft-close SS 304 tandem pull-outs.",
    scopeOfWork: [
      "Digital on-site laser measurement and 3D ergonomic layout design",
      "Factory fabrication of 18mm BWP marine grade plywood carcasses",
      "Installation of German soft-close tandem drawer systems and corner carousel",
      "Precision fitting of high-gloss acrylic shutters with seamless edge-banding",
      "Integration of under-cabinet warm LED profile lighting"
    ],
    materialsUsed: [
      "18mm IS:710 Marine Grade BWP Plywood",
      "1.5mm High-Gloss Anti-Scratch Acrylic Shutters (Dual Tone Charcoal & White)",
      "Grade 304 Stainless Steel Tandem Drawers & Cutlery Trays",
      "Heavy-Duty Soft-Close Hydraulic Concealed Hinges",
      "Black Galaxy Natural Granite Countertop Support Framework"
    ],
    challengesAndSolutions: [
      {
        challenge: "Un-even corner masonry walls with 15mm diagonal deviation.",
        solution: "Laser-leveled custom filler spacers were calibrated in the workshop to achieve a 100% square 90-degree corner fit."
      },
      {
        challenge: "Moisture buildup near the sink plumbing area.",
        solution: "Utilized 100% boiling water-proof calibrated marine ply with waterproof sealant barrier coatings."
      }
    ],
    clientTestimonial: {
      quote: "The modular kitchen acrylic cabinets and SS 304 glass railing were fitted with millimeter precision. Outstanding finish and zero hassle!",
      author: "Virendra Singh, Civil Lines Pratapgarh",
      rating: 5
    },
    image: "/media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.webp",
    galleryImages: [
      "/media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.webp",
      "/media/modular-kitchen/contemporary-island-modular-kitchen-countertop.webp",
      "/media/modular-kitchen/hydraulic-overhead-modular-kitchen-cabinets.webp",
      "/media/modular-kitchen/stainless-steel-304-kitchen-tandem-baskets.webp"
    ],
    relatedProductSlug: "acrylic-modular-kitchen-cabinets",
    relatedServiceSlug: "modular-kitchen"
  },
  {
    slug: "katra-road-toughened-glass-railing",
    title: "12mm Frameless Toughened Glass Balcony Railing",
    category: "Toughened Glass Railing",
    location: "Katra Road, Pratapgarh, Uttar Pradesh",
    clientName: "Dr. R. K. Pandey (Residential Bungalow)",
    completionDate: "July 2026",
    metaTitle: "Glass Balcony Railing Project in Katra Road, Pratapgarh | Sparsh Trading",
    metaDescription: "Case study: 12mm crystal clear frameless toughened glass railing with solid SS 304 floor spigots on Katra Road, Pratapgarh. Installed by Sparsh Trading.",
    summary: "Installation of 65 running feet of frameless architectural glass balustrades on a double-story bungalow terrace on Katra Road, providing panoramic open views while ensuring maximum safety.",
    scopeOfWork: [
      "Site survey and core-cutting into reinforced concrete balcony beam",
      "Installation of solid core Grade 304 stainless steel base spigots",
      "Laser alignment and mounting of 12mm clear tempered safety glass panels",
      "Fitting of slim stainless steel top safety grab rail with seamless joints"
    ],
    materialsUsed: [
      "12mm Clear Saint-Gobain Toughened Safety Float Glass",
      "Solid Grade 304 Mirror-Polished Heavy Floor Spigots",
      "Hilti Heavy-Duty Stainless Steel Expansion Anchor Bolts",
      "High-Density EPDM Cushioning Gaskets for Vibration Absorption"
    ],
    challengesAndSolutions: [
      {
        challenge: "High wind exposure on the 2nd floor open terrace during thunderstorms.",
        solution: "Engineered solid SS 304 spigots anchored 100mm deep into structural concrete with Hilti chemical anchors."
      }
    ],
    clientTestimonial: {
      quote: "The glass railing gives our home a modern penthouse look. The fittings are ultra solid and the alignment is flawless.",
      author: "Dr. R. K. Pandey, Katra Road Pratapgarh",
      rating: 5
    },
    image: "/media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp",
    galleryImages: [
      "/media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp",
      "/media/toughened-glass-railing/ss-304-spigots-glass-balcony-railing.webp",
      "/media/toughened-glass-railing/staircase-toughened-glass-railing-ss-handrail.webp"
    ],
    relatedProductSlug: "frameless-toughened-glass-balcony-railing",
    relatedServiceSlug: "toughened-glass-railing"
  },
  {
    slug: "meera-bhawan-steel-main-gate",
    title: "Heavy-Duty CNC Laser Cut Steel Main Entrance Gate",
    category: "Steel Fabrication",
    location: "Meera Bhawan Road, Pratapgarh, Uttar Pradesh",
    clientName: "Mr. Anand Shukla (Commercial Complex & Residence)",
    completionDate: "July 2026",
    metaTitle: "CNC Laser Cut Steel Gate Project in Pratapgarh | Sparsh Trading",
    metaDescription: "Case study: Heavy structural steel main gate with CNC geometric jaali and anti-rust epoxy primer on Meera Bhawan Road, Pratapgarh by Sparsh Trading.",
    summary: "Bespoke fabrication and installation of a grand 14-foot double-leaf structural steel main gate featuring precision CNC laser cut metal inserts, heavy brass pivot bearings, and anti-rust PU enamel coating.",
    scopeOfWork: [
      "Custom vector CAD drafting of geometric CNC pattern",
      "Heavy structural steel frame welding with seamless TIG process",
      "Application of 2 coats of zinc chromate red oxide anti-corrosion primer",
      "On-site installation with heavy-duty pivot brackets and brass bushings"
    ],
    materialsUsed: [
      "Tata Structura Heavy MS Hollow Sections (100x50mm, 2.5mm)",
      "4mm Cold-Rolled CNC Laser-Cut Sheet Metal Panels",
      "Heavy Industrial Brass Bush Frictionless Pivot Hinges",
      "High-Build Epoxy Zinc Primer + Automotive Grade Polyurethane Paint"
    ],
    challengesAndSolutions: [
      {
        challenge: "Heavy 320 kg total gate leaf weight requiring effortless manual swinging.",
        solution: "Installed sealed heavy ball bearing pivot hinges that allow the entire 320 kg gate to open smoothly with a single finger push."
      }
    ],
    clientTestimonial: {
      quote: "Heavy duty structural steel work with smooth welds and anti-rust finish. The team took accurate site measurements and delivered right on time.",
      author: "Anand Shukla, Meera Bhawan Road Pratapgarh",
      rating: 5
    },
    image: "/media/owner/sparsh-trading-workshop-fabrication-master.webp",
    galleryImages: [
      "/media/owner/sparsh-trading-workshop-fabrication-master.webp",
      "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
    ],
    relatedProductSlug: "designer-ss-304-steel-main-gate",
    relatedServiceSlug: "steel-fabrication"
  },
  {
    slug: "ajeet-nagar-soundproof-upvc-windows",
    title: "3-Track Soundproof uPVC Sliding Windows",
    category: "uPVC Windows & Doors",
    location: "Ajeet Nagar, Pratapgarh, Uttar Pradesh",
    clientName: "Mr. Mohd. Tariq (Residential Apartment)",
    completionDate: "August 2026",
    metaTitle: "uPVC Sliding Windows Project in Ajeet Nagar Pratapgarh | Sparsh Trading",
    metaDescription: "Case study: 3-track soundproof uPVC sliding windows with mosquito mesh and toughened glass in Ajeet Nagar, Pratapgarh. Installed by Sparsh Trading.",
    summary: "Supply and installation of 12 multi-chamber uPVC 3-track sliding window units with toughened float glass and stainless steel mosquito mesh, cutting roadside noise by over 70%.",
    scopeOfWork: [
      "Laser window opening survey and cavity preparation",
      "Workshop fabrication of tropicalized multi-chamber uPVC frames",
      "Glazing with 5mm toughened float glass and EPDM gaskets",
      "Silicon weather-sealing of perimeter expansion gaps"
    ],
    materialsUsed: [
      "Lead-Free Multi-Chamber Tropicalized uPVC Profile",
      "5mm Saint-Gobain Toughened Float Glass",
      "SS 304 Stainless Steel High-Visibility Mosquito Mesh",
      "High-Tension Steel Reinforcement Inserts inside profile"
    ],
    challengesAndSolutions: [
      {
        challenge: "Severe road noise and airborne dust from the main traffic intersection.",
        solution: "Dual-track EPDM compression gaskets combined with multi-point locking cam levers completely sealed off acoustic air leakage."
      }
    ],
    clientTestimonial: {
      quote: "Fitted 8 large uPVC sliding windows with mosquito mesh. Noticeable noise reduction from the main road and flawless sliding action.",
      author: "Mohd. Tariq, Ajeet Nagar Pratapgarh",
      rating: 5
    },
    image: "/media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp",
    galleryImages: [
      "/media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp",
      "/media/upvc-windows-doors/soundproof-casement-upvc-window-system.webp",
      "/media/upvc-windows-doors/acoustic-upvc-balcony-sliding-door-pratapgarh.webp"
    ],
    relatedProductSlug: "upvc-3-track-sliding-windows",
    relatedServiceSlug: "upvc-windows-doors"
  }
];

export function getProjectBySlug(slug: string): DetailedProject | undefined {
  return detailedProjectsData.find((p) => p.slug === slug);
}
