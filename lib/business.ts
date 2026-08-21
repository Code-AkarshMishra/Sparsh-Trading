export const business = {
  name: "SPARSH TRADING",
  office: "Meera Bhawan, Near Meera Bhawan Chauraha, Ashtbhuja Nagar, Pratapgarh, Uttar Pradesh - 230001",
  workshop: "Sagra Dhalayi, City Road, Pratapgarh, Uttar Pradesh",
  phones: ["8795662161", "7007710096"],
  whatsapp: "918795662161",
  serviceArea: "Pratapgarh, Uttar Pradesh",
  tagline: "Built Strong.\nDesigned to Last.",
  description:
    "Metal fabrication, architectural solutions, windows, doors, railings and interiors crafted for homes and businesses in Pratapgarh."
};

export const metrics = [
  { value: "7+", label: "Core services" },
  { value: "10", label: "Project stages" },
  { value: "2", label: "Direct contact lines" },
  { value: "1", label: "Local workshop" }
];

export const services = [
  { slug: "modular-kitchen", title: "Modular Kitchen", category: "Kitchen", description: "Storage, cabinets and counter solutions shaped around your home.", items: ["Storage solutions", "Cabinets", "Counter solutions", "Custom designs", "Installation"] },
  { slug: "upvc-windows-doors", title: "uPVC Windows & Doors", category: "uPVC", description: "Practical window and door systems for light, ventilation and everyday use.", items: ["uPVC windows", "Sliding windows", "Casement windows", "uPVC doors", "Custom sizes"] },
  { slug: "interior-decor", title: "Interior Decor", category: "Interiors", description: "Functional interior elements with clean lines and durable finishes.", items: ["Interior metal elements", "Modern interiors", "Decorative solutions", "Functional architectural elements"] },
  { slug: "steel-fabrication", title: "Steel Fabrication", category: "Steel", description: "Made-to-measure steelwork for doors, frames, gates and structures.", items: ["Steel doors", "Steel frames", "Gates", "Grills", "Structural/custom fabrication"] },
  { slug: "toughened-glass-railing", title: "Toughened Glass Railing", category: "Railings", description: "Modern glass and metal railing systems for staircases and balconies.", items: ["Staircase railings", "Balcony railings", "Glass + metal railing", "Modern railing systems"] },
  { slug: "aluminium-windows", title: "Aluminium Windows", category: "Aluminium", description: "Lightweight aluminium window systems with custom sizing.", items: ["Sliding aluminium windows", "Aluminium frames", "Custom window systems"] },
  { slug: "ppgi-steel-door-window-frames", title: "PPGI / Steel Door & Window Frames", category: "Frames", description: "Reliable PPGI and steel frames for homes, builders and wholesale supply.", items: ["PPGI frames", "Steel door frames", "Steel window frames", "Wholesale supply"] }
];

export const orderStatuses = [
  "ENQUIRY", "QUOTATION", "CONFIRMED", "MEASUREMENT", "DESIGN", "MATERIAL_PREPARED",
  "FABRICATION", "QUALITY_CHECK", "READY", "INSTALLATION", "COMPLETED"
] as const;
