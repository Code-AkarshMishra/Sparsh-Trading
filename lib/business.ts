export const business = {
  name: "SPARSH TRADING",
  domain: "sparshtrading.shop",
  fullDomain: "www.sparshtrading.shop",
  website: "https://sparshtrading.shop",
  gstin: "09ELTPM0163A1Z3",
  office: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar, Pratapgarh, Uttar Pradesh - 230001",
  workshop: "Sagra Dhalayi, City Road, Pratapgarh, Uttar Pradesh",

  officeMapUrl: "https://www.google.com/maps/place/Sparsh+Trading/@25.9191811,81.9781645,783m/data=!3m2!1e3!4b1!4m6!3m5!1s0x399a9172fc012cdf:0x4d7f6d4a1eebec4!8m2!3d25.9191811!4d81.9807394!16s%2Fg%2F11mdffg0gk?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D",
  workshopMapUrl: "https://www.google.com/maps/place/25%C2%B054'37.3%22N+81%C2%B058'23.8%22E/@25.910717,81.9729388,261m/data=!3m1!1e3!4m4!3m3!8m2!3d25.91037!4d81.973285?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D",
  phones: ["8795662161", "7007710096"],
  whatsapp: "918795662161",
  email: "mail.sparshtrading@gmail.com",
  serviceArea: "Pratapgarh, Allahabad, Sultanpur & Uttar Pradesh",
  tagline: "Built Strong.\nDesigned to Last.",
  description:
    "Architectural metal fabrication, premium uPVC window systems, toughened glass railings, PPGI frames, and bespoke modular kitchens in Pratapgarh."
};


export const partners = [
  {
    name: "Ankush Mishra",
    title: "Co-Founder",
    phone: "8795662161",
    role: "Steel Fabrication, Estimation & Client Advisory",
    image: "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
  },
  {
    name: "Adarsh Singh",
    title: "Co-Founder",
    phone: "7007710096",
    role: "Workshop Fabrication, uPVC Systems & Site Fitting",
    image: "/media/owner/sparsh-trading-design-partner-pratapgarh.webp"
  }
];

export const metrics = [
  { value: "7+", label: "Core Services" },
  { value: "100%", label: "Custom Fabrication" },
  { value: "2", label: "Direct Partner Lines" },
  { value: "1", label: "Local Workshop in Pratapgarh" }
];

export const services = [
  { slug: "modular-kitchen", title: "Modular Kitchen", category: "Kitchen", description: "Custom acrylic cabinets, quartz countertops and soft-close SS storage solutions.", items: ["Custom Acrylic Cabinets", "SS 304 Pull-Out Baskets", "Corner Tandem Carousels", "Hydraulic Soft-Close Drawers", "Turnkey On-Site Fitting"] },
  { slug: "upvc-windows-doors", title: "uPVC Windows & Doors", category: "uPVC", description: "Soundproof, dust-sealed, and weather-resistant sliding and casement window systems.", items: ["3-Track Sliding Windows", "SS Mosquito Mesh Grids", "Soundproof Casement Doors", "Multi-Point Security Locks", "Lead-Free Heavy Profiles"] },
  { slug: "steel-fabrication", title: "Steel Fabrication", category: "Steel", description: "Heavy-duty structural steelwork for gates, frames, grills, trusses and customized structures.", items: ["Designer Main Entrance Gates", "Precision Cut Window Grills", "Industrial Shed & Trusses", "Structural Metal Assembly", "Anti-Corrosion Primer Finishes"] },
  { slug: "toughened-glass-railing", title: "Toughened Glass Railing", category: "Railings", description: "Frameless safety glass and stainless steel railing systems for staircases and balconies.", items: ["12mm Toughened Balustrades", "SS 304 Spigots & Clamps", "Balcony Glass Railings", "Indoor Staircase Railings", "Sleek Handrail Profiles"] },
  { slug: "ppgi-steel-door-window-frames", title: "PPGI / Steel Door & Window Frames", category: "Frames", description: "Termite-proof, factory folded PPGI & Tata steel frames for residential construction and wholesale.", items: ["PPGI Pre-Painted Frames", "Tata Steel Door Chaukhat", "Double & Single Rebate Sections", "Termite & Warp Proof Structure", "Builder & Wholesale Supply"] },
  { slug: "aluminium-windows", title: "Aluminium Windows", category: "Aluminium", description: "Durable powder-coated aluminium window profiles with tinted or clear float glass.", items: ["2 & 3-Track Sliding Windows", "Powder-Coated Frame Profiles", "Tinted Sun-Control Glass", "Office Partition Systems", "Weather-Sealed Installation"] },
  { slug: "interior-decor", title: "Interior Decor & CNC Metalwork", category: "Interiors", description: "Precision laser-cut architectural screens, room partitions, and bespoke decorative elements.", items: ["Laser-Cut Metal Screens", "Living Room Partitions", "Mandir Backdrops & Grids", "Custom Display Shelving", "Matte Gold / Textured Finishes"] }
];

export const orderStatuses = [
  "ENQUIRY", "QUOTATION", "CONFIRMED", "MEASUREMENT", "DESIGN", "MATERIAL_PREPARED",
  "FABRICATION", "QUALITY_CHECK", "READY", "INSTALLATION", "COMPLETED"
] as const;

