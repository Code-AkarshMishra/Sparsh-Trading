// Comprehensive SEO Keyword Directory for Sparsh Trading
// 500+ Highly Targeted Commercial, Transactional, and Regional Search Keywords

export const regionalCities = [
  "Pratapgarh", "Sultanpur", "Jaunpur", "Prayagraj", "Allahabad", "Varanasi",
  "Lucknow", "Ayodhya", "Faizabad", "Raebareli", "Amethi", "Fatehpur",
  "Bhadohi", "Kaushambi", "Mirzapur", "Azamgarh", "Gorakhpur", "Barabanki"
];

export const pratapgarhLocalities = [
  "Meera Bhawan", "Katra Road", "Civil Lines", "Ajeet Nagar", "City Road",
  "Sagra Dhalayi", "Bela Pratapgarh", "Patti", "Kunda", "Lalganj Ajhara",
  "Raniganj", "Sangramgarh", "Kohndaur", "Mandhata", "Babaganj", "Gaura"
];

export const coreCategories = [
  {
    name: "Tata Steel Door Frames (Chaukhat)",
    slug: "tata-steel-door-frames",
    keywords: [
      "tata steel door frame price", "heavy chaukhat manufacturer", "double rebate steel frame",
      "single rebate chaukhat", "anti rust door chaukhat", "factory folded steel frame",
      "iron door frame price per foot", "tata structural steel chaukhat", "termite proof door frame",
      "masonry steel door frame", "powder coated chaukhat", "metal window frame",
      "heavy duty steel chaukhat wholesale", "residential door frame fabrication"
    ]
  },
  {
    name: "PPGI Pre-Painted Galvanized Frames",
    slug: "ppgi-steel-door-window-frames",
    keywords: [
      "ppgi door frame supplier", "pre painted galvanized iron frame", "ppgi chaukhat price",
      "waterproof door frame", "anti corrosion ppgi frame", "ready made chaukhat",
      "modern ppgi window frame", "commercial ppgi door frame", "fire resistant metal frame",
      "cost effective door frame", "ppgi wholesale dealer", "galvanized steel chaukhat"
    ]
  },
  {
    name: "Soundproof uPVC Windows & Doors",
    slug: "upvc-windows-doors",
    keywords: [
      "upvc sliding windows price", "3 track upvc window with mesh", "soundproof glass windows",
      "lead free upvc profiles", "upvc casement window", "dust proof window systems",
      "upvc french doors", "upvc balcony sliding doors", "upvc window manufacturer",
      "upvc window dealer", "energy efficient upvc frames", "upvc toughened glass windows",
      "acoustic window replacement", "german profile upvc windows"
    ]
  },
  {
    name: "Toughened Glass Balcony & Staircase Railings",
    slug: "toughened-glass-railing",
    keywords: [
      "12mm toughened glass railing price", "frameless glass balcony railing", "ss 304 glass spigots",
      "stainless steel glass balustrade", "modern terrace glass railing", "architectural safety glass",
      "staircase glass railing design", "glass handrail installation", "corrosion proof ss railing",
      "clear float toughened glass", "commercial facade glass railing", "glass balcony grill design"
    ]
  },
  {
    name: "Heavy Steel Fabrication & Main Gates",
    slug: "steel-fabrication",
    keywords: [
      "cnc laser cut main gate", "heavy structural steel fabrication", "designer iron main gate price",
      "bungalow entrance gate design", "tubular steel boundary gate", "automated motor gate bracket",
      "iron window grill fabrication", "industrial steel shed fabricator", "staircase ms railing",
      "heavy mild steel gate", "rust proof primer coated gate", "custom metal welding workshop"
    ]
  },
  {
    name: "Modular Kitchen & Interior Solutions",
    slug: "modular-kitchen",
    keywords: [
      "acrylic modular kitchen price", "l shaped modular kitchen design", "ss 304 pull out baskets",
      "hydraulic soft close kitchen cabinets", "waterproof marine ply kitchen", "hdhmr kitchen shutters",
      "island modular kitchen", "u shaped modular kitchen", "kitchen trolley manufacturer",
      "tandem box drawer kitchen", "pantry unit cabinet", "modern interior decor partitions"
    ]
  },
  {
    name: "Powder-Coated Aluminium Windows & Partitions",
    slug: "aluminium-windows",
    keywords: [
      "aluminium sliding window section", "jindal aluminium window price", "powder coated aluminium partition",
      "office cabin glass partition", "domal section aluminium window", "tinted glass aluminium door",
      "heavy aluminium profile frame", "anodized aluminium windows", "slim aluminium profile doors"
    ]
  }
];

// Generate 500+ Localized Long-Tail Search Queries
export function generateAllSeoKeywords(): string[] {
  const list: string[] = [];

  coreCategories.forEach((cat) => {
    cat.keywords.forEach((kw) => {
      // Add base keyword
      list.push(kw);

      // Add city combinations
      regionalCities.slice(0, 8).forEach((city) => {
        list.push(`${kw} in ${city}`);
        list.push(`best ${kw} ${city}`);
      });

      // Add Pratapgarh locality combinations
      pratapgarhLocalities.slice(0, 6).forEach((loc) => {
        list.push(`${kw} in ${loc} Pratapgarh`);
      });
    });
  });

  return Array.from(new Set(list));
}

export const seoKeywordsList = generateAllSeoKeywords();
