export type ProductItem = {
  _id: string;
  name: string;
  category: string;
  material: string;
  design?: string;
  application?: string;
  desc: string;
  published: boolean;
};

export const defaultProductsCatalogue: ProductItem[] = [
  {
    _id: "p1",
    name: "Heavy Duty Tata Steel Door Frames (Chaukhat)",
    category: "Frames",
    material: "Tata / Jindal Heavy Steel",
    design: "Double Rebate / Single Rebate",
    application: "Main Entrance & Bedroom Doors",
    desc: "Anti-corrosion coated precision-bent steel frames suitable for exterior & interior masonry installation in Pratapgarh.",
    published: true
  },
  {
    _id: "p2",
    name: "Premium uPVC 3-Track Sliding Windows",
    category: "Windows",
    material: "Multi-chamber Lead-Free uPVC",
    design: "3-Track with SS Mosquito Mesh",
    application: "Residential & Commercial Living Spaces",
    desc: "Soundproof and dust-resistant sliding window systems with toughened float glass and EPDM weather-seal gaskets.",
    published: true
  },
  {
    _id: "p3",
    name: "Frameless Toughened Glass Balcony Railing",
    category: "Railings",
    material: "SS 304 Solid Spigots + 12mm Toughened Glass",
    design: "Frameless Modern Balustrade",
    application: "Terraces, Balconies & Staircases",
    desc: "High-tensile architectural safety glass balustrades with polished stainless steel spigots and slim top grab rail.",
    published: true
  },
  {
    _id: "p4",
    name: "PPGI Pre-Painted Galvanized Door & Window Frames",
    category: "Frames",
    material: "Pre-Painted Galvanized Iron (PPGI)",
    design: "Factory Folded High Precision Profile",
    application: "Homes, Commercial Complexes & Wholesale",
    desc: "Cost-effective, warp-resistant, 100% termite proof PPGI frames engineered for extreme Indian weather conditions.",
    published: true
  },
  {
    _id: "p5",
    name: "Designer Stainless Steel & Iron Main Gate",
    category: "Gates",
    material: "Grade 304 Stainless Steel & Structural Steel",
    design: "Modern CNC Laser-Cut & Tubular Lattice",
    application: "Bungalows, Farmhouses & Commercial Gates",
    desc: "Heavy structural gate fabricated with automated motor bracket compatibility and rust-proof primer finish.",
    published: true
  },
  {
    _id: "p6",
    name: "Modular Kitchen Acrylic & SS Storage Units",
    category: "Interiors",
    material: "Marine Ply / HDHMR + SS 304 Hardware",
    design: "L-Shaped, U-Shaped & Island Kitchens",
    application: "Modern Kitchen Interiors",
    desc: "Soft-close hydraulic pull-out baskets, corner tandem carousels, and durable oil-splash resistant acrylic shutters.",
    published: true
  },
  {
    _id: "p7",
    name: "Powder-Coated Aluminium Sliding Windows",
    category: "Windows",
    material: "Jindal Grade Aluminium Profiles",
    design: "2-Track / 3-Track Heavy Section",
    application: "Office Cabins & Residential Windows",
    desc: "Smooth gliding aluminium window sections with tinted sun-control glass and durable powder-coated finish.",
    published: true
  },
  {
    _id: "p8",
    name: "Architectural Laser Cut Metal Wall Partitions",
    category: "Interiors",
    material: "Mild Steel / Stainless Steel 304",
    design: "Geometric & Floral CNC Lattice",
    application: "Living Room Partitions, Mandir Backdrops & Facades",
    desc: "Precision CNC cut decorative screens finished in matte gold, royal bronze, or industrial textured black.",
    published: true
  }
];
