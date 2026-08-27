export type ProjectItem = {
  _id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  materials: string[];
  published: boolean;
  featured: boolean;
};

export const defaultProjects: ProjectItem[] = [
  {
    _id: "prj-1",
    title: "Modern L-Shaped Modular Kitchen & Pantry",
    category: "Modular Kitchen",
    location: "Civil Lines, Pratapgarh",
    description: "Acrylic gloss finish cabinetry with German tandem soft-close baskets, quartz stone countertop, and corner carousel.",
    materials: ["Marine Grade HDHMR", "SS 304 Baskets", "Quartz Stone"],
    published: true,
    featured: true
  },
  {
    _id: "prj-2",
    title: "Frameless Toughened Glass Balcony Railing",
    category: "Toughened Glass Railing",
    location: "Katra Road, Pratapgarh",
    description: "12mm crystal clear toughened glass with mirror-polished SS 304 base spigots and slim profile safety top handrail.",
    materials: ["12mm Toughened Glass", "SS 304 Spigots", "Stainless Steel Top Rail"],
    published: true,
    featured: true
  },
  {
    _id: "prj-3",
    title: "Heavy-Duty CNC Laser Cut Steel Main Entrance Gate",
    category: "Steel Fabrication",
    location: "Meera Bhawan Road, Pratapgarh",
    description: "Anti-rust zinc primer coated structural steel gate with precision CNC geometric pattern and heavy brass pivot hinges.",
    materials: ["Structural Mild Steel", "CNC Sheet Cut", "Polyurethane Coating"],
    published: true,
    featured: true
  },
  {
    _id: "prj-4",
    title: "3-Track Soundproof uPVC Sliding Windows",
    category: "uPVC Windows & Doors",
    location: "Ajeet Nagar, Pratapgarh",
    description: "Dual & triple track uPVC sliding window systems with toughened glass, mosquito mesh, and multi-point security locks.",
    materials: ["Lead-Free uPVC Profile", "EPDM Gaskets", "Toughened Glass"],
    published: true,
    featured: true
  }
];
