export type DetailedProduct = {
  slug: string;
  name: string;
  category: "Frames" | "Windows" | "Railings" | "Gates" | "Interiors";
  heroTagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  material: string;
  finish: string;
  customization: string;
  warranty: string;
  leadTime: string;
  description: string;
  applications: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  image: string;
  galleryImages: string[];
  relatedServiceSlug: string;
  relatedProjectSlug?: string;
  faqs: { q: string; a: string }[];
};

export const detailedProducts: DetailedProduct[] = [
  {
    slug: "tata-steel-door-frames-chaukhat",
    name: "Tata Steel Door Frames (Chaukhat)",
    category: "Frames",
    heroTagline: "Anti-termite, 100% rust-proof steel door frames custom-folded to your exact wall thickness.",
    metaTitle: "Tata Steel Door Frames (Chaukhat) Fabrication in Pratapgarh | Sparsh Trading",
    metaDescription: "High-strength Tata Steel door frames (Chaukhat) in Pratapgarh & UP. 100% termite-proof, double & single rebate, anti-rust primer coated. Free site measurement.",
    keywords: [
      "tata steel door frame pratapgarh",
      "steel chaukhat pratapgarh",
      "tata steel door chaukhat manufacturer",
      "metal door frame uttar pradesh",
      "double rebate steel frame",
      "termite proof door frame pratapgarh",
      "jindal steel chaukhat"
    ],
    material: "Tata Structura / Jindal Cold-Rolled Steel (16 & 18 Gauge)",
    finish: "Anti-Rust Zinc Chromate Primer / Ready for Paint",
    customization: "Custom Width, Height & Wall Thickness (Single / Double Rebate)",
    warranty: "15-Year Anti-Deformation & Rust-Resistant Assurance",
    leadTime: "3 to 5 Working Days",
    description: "Fabricated from genuine Tata Structura and Jindal cold-rolled steel sheets. Unlike wooden chaukhat that expands in the rainy season and gets destroyed by termites, our steel frames stay perfectly aligned for decades. Available in single rebate (for single doors) and double rebate (to fit a second mosquito mesh door) with pre-welded heavy hinges and masonry hold-fast anchors.",
    applications: [
      "Main Entrance Doors",
      "Bedroom & Living Room Doors",
      "Bathroom & Balcony Waterproof Openings",
      "Commercial Offices, Schools & Hospitals",
      "Multi-Story Housing & Duplex Projects"
    ],
    features: [
      "100% Termite-Proof, Moisture-Resistant & Fire-Safe",
      "Heavy steel gauge prevents door sagging over decades",
      "Built-in rubber buffer slots for quiet, rattle-free door closing",
      "Pre-welded heavy-duty MS hold-fasts for solid wall anchoring",
      "Coated with anti-rust primer, ready for direct painting"
    ],
    specifications: [
      { label: "Steel Brand", value: "Tata Structura / Jindal Cold-Rolled Steel" },
      { label: "Sheet Thickness", value: "16 Gauge (1.6mm) / 18 Gauge (1.2mm)" },
      { label: "Rebate Style", value: "Single Rebate & Double Rebate (for Wire Mesh Door)" },
      { label: "Standard Sizes", value: "7x3 ft, 7x3.5 ft, 7x4 ft, 8x4 ft & Custom Dimensions" },
      { label: "Hinges Provision", value: "Pre-welded 4-inch Heavy Butt Hinge Plates" },
      { label: "Lock Provision", value: "Pre-cut Standard Mortise Lock Catch Slots" }
    ],
    image: "/media/steel-fabrication/heavy-structural-steel-fabrication-pratapgarh.webp",
    galleryImages: [
      "/media/steel-fabrication/heavy-structural-steel-fabrication-pratapgarh.webp",
      "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
    ],
    relatedServiceSlug: "steel-fabrication",
    relatedProjectSlug: "meera-bhawan-steel-main-gate",
    faqs: [
      {
        q: "Why choose Tata Steel Chaukhat over wooden frames in Pratapgarh?",
        a: "Wooden chaukhat swells in monsoon and is easily ruined by termites. Tata Steel frames stay perfectly square and stable for decades with zero termite risk at almost half the cost of teak wood."
      },
      {
        q: "Can I install a mosquito net door on these steel frames?",
        a: "Yes. We make Double Rebate (दो पल्ले वाली चौखट) steel frames specifically designed to hold your primary wooden door and an outer wire-mesh door on the same frame."
      },
      {
        q: "Do you make custom sizes for unusual wall openings?",
        a: "Yes. We take on-site laser measurements across Pratapgarh, Sultanpur, Jaunpur, and Prayagraj, and fabricate each frame to exact millimeter measurements."
      }
    ]
  },
  {
    slug: "ppgi-steel-door-window-frames",
    name: "PPGI Pre-Painted Galvanized Door & Window Frames",
    category: "Frames",
    heroTagline: "Ready-to-fit galvanized door and window frames with a durable factory-baked paint finish.",
    metaTitle: "PPGI Door & Window Frames Manufacturer in UP | Sparsh Trading",
    metaDescription: "PPGI pre-painted galvanized steel door & window frames in Pratapgarh, Sultanpur & UP. Anti-rust, weather-proof, factory-baked color finish.",
    keywords: [
      "ppgi door frame pratapgarh",
      "pre painted galvanized frame",
      "ppgi chaukhat up",
      "waterproof chaukhat",
      "wholesale ppgi frames",
      "galvanized window frame"
    ],
    material: "Hot-Dip Pre-Painted Galvanized Steel (PPGI)",
    finish: "Factory-Baked Architectural Polyester Coating (Off-White, Teak Wood, Grey)",
    customization: "Available in 100mm, 125mm & 150mm Frame Depths",
    warranty: "10-Year Weather-Resistance Warranty",
    leadTime: "2 to 4 Working Days",
    description: "PPGI (Pre-Painted Galvanized Iron) door and window frames combine the rust resistance of zinc-coated steel with an attractive, baked-on polyester paint finish that requires zero on-site painting. Ideal for modern homes, commercial buildings, and builder projects looking for clean aesthetics and fast fitting.",
    applications: [
      "Residential Apartments & Independent Homes",
      "Commercial Complexes & Showrooms",
      "Hostels, Colleges & Healthcare Centers",
      "Mass Construction Projects"
    ],
    features: [
      "Factory-painted finish eliminates on-site painting work and expense",
      "Zinc coating provides reliable rust protection in wet and humid weather",
      "Lightweight yet rigid roll-formed frame structure",
      "UV-resistant color coating that does not fade quickly"
    ],
    specifications: [
      { label: "Base Material", value: "Hot-Dip Galvanized Structural Steel" },
      { label: "Zinc Coating", value: "GSM 120 (Anti-Rust Protection)" },
      { label: "Paint Layer", value: "20-Micron Baked Topcoat with Primer" },
      { label: "Frame Depth", value: "100mm, 125mm, 150mm (Matched to Wall Thickness)" },
      { label: "Standard Colors", value: "Classic Off-White, Teak Brown, Walnut, Slate Grey" }
    ],
    image: "/media/owner/sparsh-trading-design-partner-pratapgarh.webp",
    galleryImages: [
      "/media/owner/sparsh-trading-design-partner-pratapgarh.webp",
      "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
    ],
    relatedServiceSlug: "steel-fabrication",
    faqs: [
      {
        q: "Does PPGI chaukhat need painting after installation?",
        a: "No. PPGI frames come with a durable factory-baked finish that is scratch-resistant and ready to use right after installation."
      },
      {
        q: "Is PPGI suitable for bathroom and kitchen areas?",
        a: "Yes. The galvanized zinc layer protects the steel from moisture, making it 100% waterproof and rust-free."
      }
    ]
  },
  {
    slug: "upvc-3-track-sliding-windows",
    name: "uPVC 3-Track Sliding Windows with Mosquito Mesh",
    category: "Windows",
    heroTagline: "Soundproof, dust-sealed sliding windows with heavy-duty stainless steel mosquito mesh.",
    metaTitle: "3-Track uPVC Sliding Windows in Pratapgarh & UP | Sparsh Trading",
    metaDescription: "Soundproof 3-track uPVC sliding windows with SS mosquito mesh in Pratapgarh. Multi-chamber profile, toughened glass, EPDM seals. Free site measurement.",
    keywords: [
      "upvc sliding windows pratapgarh",
      "3 track upvc window",
      "soundproof upvc windows uttar pradesh",
      "upvc window manufacturer sultanpur",
      "upvc glass window jaunpur",
      "mosquito mesh upvc window"
    ],
    material: "Lead-Free Multi-Chamber Tropicalized uPVC Profile (RoHS Certified)",
    finish: "UV-Stabilized Bright White / Golden Oak Woodgrain Lamination",
    customization: "Custom 2-Track & 3-Track Dimensions (Glass + Mesh Combinations)",
    warranty: "10-Year Anti-Yellowing & Profile Warranty",
    leadTime: "5 to 7 Working Days",
    description: "Designed for North Indian weather extremes, our 3-track uPVC sliding window systems provide excellent heat insulation, sound reduction, and smooth sliding operation. Features two glass sliding panels plus one dedicated stainless steel 304 mosquito mesh slider.",
    applications: [
      "Road-Facing Living Rooms & Bedrooms (Noise Reduction)",
      "Balconies, Terraces & Verandahs",
      "Master Bedrooms needing Mosquito Protection and Fresh Air",
      "Hotels, Guest Houses & Office Cabins"
    ],
    features: [
      "Significantly reduces outside traffic and street noise",
      "Airtight dual EPDM gaskets block rain, dust, and outdoor smog",
      "Internal galvanized steel reinforcement for strong wind resistance",
      "Heavy-duty nylon rollers for smooth, quiet sliding"
    ],
    specifications: [
      { label: "Profile Width", value: "108mm (3-Track Heavy System)" },
      { label: "Wall Thickness", value: "2.3mm - 2.5mm Heavy Section" },
      { label: "Glass Options", value: "5mm/6mm Saint-Gobain Toughened Clear / Tinted Float Glass" },
      { label: "Mesh Quality", value: "Grade 304 Stainless Steel High-Visibility Mesh" },
      { label: "Locking", value: "Multi-Point Crescent Cam Locks / Touch Locks" }
    ],
    image: "/media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp",
    galleryImages: [
      "/media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp",
      "/media/upvc-windows-doors/soundproof-casement-upvc-window-system.webp",
      "/media/upvc-windows-doors/acoustic-upvc-balcony-sliding-door-pratapgarh.webp",
      "/media/upvc-windows-doors/reinforced-upvc-window-toughened-glass.webp"
    ],
    relatedServiceSlug: "upvc-windows-doors",
    relatedProjectSlug: "ajeet-nagar-soundproof-upvc-windows",
    faqs: [
      {
        q: "How much noise reduction can I expect from uPVC sliding windows?",
        a: "With our multi-chamber profile and airtight EPDM sealing combined with 5mm/6mm toughened glass, external street noise is reduced by up to 70%."
      },
      {
        q: "Will the white uPVC profile turn yellow in direct sunlight?",
        a: "No. We use UV-stabilized, lead-free compound profiles formulated to withstand intense sun and weather without yellowing or cracking."
      }
    ]
  },
  {
    slug: "frameless-toughened-glass-balcony-railing",
    name: "Frameless Toughened Glass Balcony & Staircase Railing",
    category: "Railings",
    heroTagline: "12mm heavy safety glass with solid stainless steel Grade 304 base fittings.",
    metaTitle: "Toughened Glass Balcony Railing in Pratapgarh, Jaunpur & UP | Sparsh Trading",
    metaDescription: "Modern 12mm frameless toughened glass railing for balconies and stairs in Pratapgarh. SS 304 spigots, aluminium base shoe, maximum safety. Get custom quotation.",
    keywords: [
      "toughened glass railing pratapgarh",
      "glass balcony railing up",
      "ss 304 glass spigots railing",
      "staircase glass railing jaunpur",
      "frameless glass railing prayagraj",
      "architectural glass balustrade"
    ],
    material: "12mm Architectural Toughened Safety Glass + Solid SS 304 Spigots",
    finish: "Mirror Polish / Brushed Satin Stainless Steel + Ultra-Clear Glass",
    customization: "Floor Spigots / Continuous Base Channel / Top SS Handrail Options",
    warranty: "Lifetime Rust-Free SS 304 Warranty",
    leadTime: "4 to 7 Working Days",
    description: "Gives balconies, terraces, and staircases an open, modern aesthetic with clear views. Built using 12mm high-strength tempered glass mounted on solid Grade 304 stainless steel floor spigots that never rust in outdoor rain.",
    applications: [
      "Modern Home Balconies & Terraces",
      "Duplex & Villa Internal Staircases",
      "Commercial Building Atriums & Malls",
      "Swimming Pool Enclosures & Rooftop Lounges"
    ],
    features: [
      "12mm tempered safety glass is 5x stronger than regular glass",
      "Solid Grade 304 stainless steel base fittings will never rust",
      "Frameless design creates an open, spacious look with natural light",
      "Optional top grab handrail in SS 304 or Teak wood"
    ],
    specifications: [
      { label: "Glass Specification", value: "12mm High-Impact Tempered Float Glass (Polished Edges)" },
      { label: "Mounting System", value: "Solid Core SS 304 Spigots / Aluminium Base Channel" },
      { label: "Standard Height", value: "3.0 Feet / 3.5 Feet / 4.0 Feet" },
      { label: "Top Handrail", value: "Slim SS 304 Slot Tube / Frameless Polished Edge" },
      { label: "Fasteners", value: "Hilti Stainless Steel Expansion Anchor Bolts" }
    ],
    image: "/media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp",
    galleryImages: [
      "/media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp",
      "/media/toughened-glass-railing/ss-304-spigots-glass-balcony-railing.webp",
      "/media/toughened-glass-railing/staircase-toughened-glass-railing-ss-handrail.webp",
      "/media/toughened-glass-railing/terrace-architectural-glass-balustrade-pratapgarh.webp"
    ],
    relatedServiceSlug: "toughened-glass-railing",
    relatedProjectSlug: "katra-road-toughened-glass-railing",
    faqs: [
      {
        q: "Is 12mm toughened glass safe for families with children?",
        a: "Yes. 12mm tempered glass is extremely strong and impact-resistant. In the rare event of damage, it breaks into small, dull granules rather than sharp shards."
      },
      {
        q: "Will the stainless steel fittings rust in outdoor rain?",
        a: "Never. We use genuine Grade 304 stainless steel with high nickel content, ensuring zero rusting in outdoor weather."
      }
    ]
  },
  {
    slug: "designer-ss-304-steel-main-gate",
    name: "Designer Steel & CNC Laser Cut Main Gate",
    category: "Gates",
    heroTagline: "Heavy structural steel boundary gates with clean CNC laser-cut patterns and rust-preventive coating.",
    metaTitle: "Designer Steel Main Gate Fabrication in Pratapgarh & UP | Sparsh Trading",
    metaDescription: "Custom CNC laser cut steel & SS 304 main gates in Pratapgarh, Sultanpur, Jaunpur. Heavy duty structural tubes, brass pivot bearings, motorized compatibility. Enquire now.",
    keywords: [
      "steel main gate pratapgarh",
      "cnc laser cut gate design",
      "ss 304 main entrance gate",
      "iron gate manufacturer sultanpur",
      "designer boundary gate prayagraj",
      "heavy steel gate fabrication"
    ],
    material: "Structural Mild Steel / SS 304 Tubes & 3mm-5mm Laser Cut Sheets",
    finish: "Zinc Epoxy Primer + Polyurethane (PU) Matte/Gloss Finish",
    customization: "Custom Geometric / Floral CNC Motifs & Swing/Sliding Mechanisms",
    warranty: "5-Year Structural Stability Warranty",
    leadTime: "7 to 12 Working Days",
    description: "Custom-made front entrance gates fabricated from heavy-gauge structural box tubes and precision laser-cut sheet panels. Equipped with smooth ball-bearing pivot hinges for effortless opening and closing. Primed with high-grade anti-rust epoxy before the final paint coat.",
    applications: [
      "Bungalows & Independent Houses",
      "Farmhouse Entrances",
      "Commercial Buildings & Warehouses",
      "Gated Community Security Entrances"
    ],
    features: [
      "Heavy structural steel prevents gate sagging and misalignment over time",
      "Clean CNC laser cuts with smooth edges and neat welds",
      "Treated with 2 coats of anti-rust primer before topcoat application",
      "Compatible with automatic sliding or swing gate motors"
    ],
    specifications: [
      { label: "Outer Frame", value: "75x40mm or 100x50mm Heavy Structural Box Tube" },
      { label: "Laser Cut Panel", value: "3mm / 4mm Cold-Rolled Metal Sheet" },
      { label: "Pivot Hinges", value: "Heavy Industrial Ball Bearing / Brass Bush Hinges" },
      { label: "Locking", value: "Heavy Central Tower Bolt, Drop Pin & Padlock Hasps" },
      { label: "Automation Ready", value: "Yes (Compatible with Swing & Sliding Arm Motors)" }
    ],
    image: "/media/owner/sparsh-trading-workshop-fabrication-master.webp",
    galleryImages: [
      "/media/owner/sparsh-trading-workshop-fabrication-master.webp",
      "/media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
    ],
    relatedServiceSlug: "steel-fabrication",
    relatedProjectSlug: "meera-bhawan-steel-main-gate",
    faqs: [
      {
        q: "Can you make a gate based on a custom photo or drawing?",
        a: "Yes! You can share any photo, CAD drawing, or design reference, and our workshop team will fabricate the exact gate to your opening dimensions."
      },
      {
        q: "How do you protect the gate from rusting at welded joints?",
        a: "Every weld is ground smooth, cleaned, and coated with industrial zinc epoxy primer before applying the final polyurethane paint."
      }
    ]
  },
  {
    slug: "acrylic-modular-kitchen-cabinets",
    name: "Acrylic & Marine Ply Modular Kitchen with SS Baskets",
    category: "Interiors",
    heroTagline: "Waterproof BWP marine ply cabinets with scratch-resistant high-gloss acrylic shutters.",
    metaTitle: "Modular Kitchen Manufacturer in Pratapgarh & UP | Sparsh Trading",
    metaDescription: "Custom modular kitchens in Pratapgarh with high-gloss acrylic shutters, marine grade ply, SS 304 tandem baskets & quartz counters. Free 3D layout plan.",
    keywords: [
      "modular kitchen pratapgarh",
      "acrylic modular kitchen up",
      "modular kitchen manufacturer jaunpur",
      "l shaped kitchen sultanpur",
      "kitchen trolleys and baskets prayagraj",
      "waterproof kitchen cabinets"
    ],
    material: "IS:710 Marine Grade BWP Plywood / Action TESA HDHMR + SS 304 Baskets",
    finish: "High-Gloss Anti-Scratch Acrylic / 1mm Textured Laminates",
    customization: "L-Shape, U-Shape, Parallel & Island Layouts with Custom Modular Drawers",
    warranty: "10-Year Warranty on Marine Ply & Lifetime Hardware Warranty",
    leadTime: "7 to 14 Working Days",
    description: "Custom-designed for Indian cooking habits. Built with 100% boiling waterproof (BWP) marine plywood carcasses, soft-close hydraulic tandem drawers, and genuine Grade 304 stainless steel pull-out baskets. Scratch-resistant acrylic surfaces wipe clean with a single wet cloth.",
    applications: [
      "L-Shaped, U-Shaped, Parallel & Island Kitchens",
      "Tall Pantry Storage Units",
      "Under-Counter Cutlery, Thali & Bottle Pull-Outs",
      "Corner Magic Corners & S-Carousels"
    ],
    features: [
      "100% Boiling Water Proof (BWP) ply will not swell or degrade from sink moisture",
      "Grade 304 stainless steel baskets with smooth soft-close slides",
      "Seamless acrylic shutters that clean easily with water",
      "Machine edge-banding with zero glue marks"
    ],
    specifications: [
      { label: "Carcass Material", value: "16mm/18mm Calibrated BWP Marine Ply (IS:710 Certified)" },
      { label: "Shutter Core", value: "18mm HDHMR with 1.5mm Ultra-High Gloss Acrylic Sheet" },
      { label: "Hardware & Slides", value: "Soft-Close Hydraulic Tandem Box Drawers" },
      { label: "Baskets Material", value: "Grade 304 Electro-Polished Stainless Steel" },
      { label: "Countertop Support", value: "Granite / Quartz Pre-Levelled Frame Structure" }
    ],
    image: "/media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.webp",
    galleryImages: [
      "/media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.webp",
      "/media/modular-kitchen/contemporary-island-modular-kitchen-countertop.webp",
      "/media/modular-kitchen/hydraulic-overhead-modular-kitchen-cabinets.webp",
      "/media/modular-kitchen/stainless-steel-304-kitchen-tandem-baskets.webp",
      "/media/modular-kitchen/tall-pantry-storage-modular-kitchen-pratapgarh.webp"
    ],
    relatedServiceSlug: "modular-kitchen",
    relatedProjectSlug: "civil-lines-modular-kitchen",
    faqs: [
      {
        q: "How long does a modular kitchen take from order to installation?",
        a: "After finalizing your 3D layout and measurements, workshop fabrication takes 7 to 10 days, followed by 1 to 2 days for neat on-site fitting."
      },
      {
        q: "Are the kitchen cabinets resistant to turmeric and oil stains?",
        a: "Yes. Our high-gloss acrylic surfaces are non-porous and oil-resistant. Spills wipe away cleanly with soapy water without leaving stains."
      }
    ]
  },
  {
    slug: "powder-coated-aluminium-sliding-windows",
    name: "Powder-Coated Aluminium Sliding Windows & Partitions",
    category: "Windows",
    heroTagline: "Slim Domal section aluminium windows and office partitions with weather-sealed tinted glass.",
    metaTitle: "Aluminium Sliding Windows & Partitions in Pratapgarh | Sparsh Trading",
    metaDescription: "Domal section aluminium sliding windows and office glass partitions in Pratapgarh & UP. Powder-coated, weather-proof, tinted glass options. Contact for best rates.",
    keywords: [
      "aluminium windows pratapgarh",
      "domal section aluminium window",
      "powder coated aluminium partition",
      "aluminium sliding window sultanpur",
      "office glass partition jaunpur"
    ],
    material: "Jindal Architectural Grade Aluminium Alloy (6063-T6)",
    finish: "Electrostatic Powder Coating / Anodized Bronze & Champagne",
    customization: "Custom Width, Height, Glass Tint & Track Configurations",
    warranty: "7-Year Finish & Hardware Warranty",
    leadTime: "3 to 5 Working Days",
    description: "Constructed with heavy Jindal aluminium extruded sections and pure polyester powder coating. Provides slim, clean sightlines with smooth gliding action and sun-control tinted float glass for homes and commercial spaces across Uttar Pradesh.",
    applications: [
      "Living Room & Bedroom Windows",
      "Office Cabin Glass Partitions",
      "Shopfronts & Commercial Showrooms",
      "Balcony Enclosures & Glazing"
    ],
    features: [
      "Slim aluminium sightlines maximize outdoor visibility and natural light",
      "Corrosion-proof powder-coated finish will not peel or chip",
      "Interlocking sash design prevents rainwater leakage and rattling in wind",
      "Reliable and durable solution for residential and commercial openings"
    ],
    specifications: [
      { label: "Aluminium Grade", value: "Jindal 6063-T6 Extrusion Alloy" },
      { label: "Section Profile", value: "18mm / 27mm / 35mm Domal Heavy Section" },
      { label: "Powder Coating", value: "Pure Polyester 60-80 Micron Coating" },
      { label: "Glazing", value: "5mm/6mm Clear, Tinted Black, Brown, or Reflective Float Glass" },
      { label: "Weather Sealing", value: "High-Density Siliconized Wool Strips" }
    ],
    image: "/media/upvc-windows-doors/powder-coated-domal-aluminium-sliding-window.webp",
    galleryImages: [
      "/media/upvc-windows-doors/powder-coated-domal-aluminium-sliding-window.webp",
      "/media/upvc-windows-doors/tropicalized-lead-free-upvc-profile-inspection.webp"
    ],
    relatedServiceSlug: "upvc-windows-doors",
    faqs: [
      {
        q: "What is the difference between normal aluminium sections and Domal section windows?",
        a: "Domal sections are significantly heavier, have rounded ergonomic profiles, seal better against wind, and glide much smoother without the rattling noise of light aluminium windows."
      }
    ]
  },
  {
    slug: "cnc-laser-cut-metal-partitions",
    name: "CNC Laser-Cut Metal Partitions & Mandir Backdrops",
    category: "Interiors",
    heroTagline: "Decorative room divider screens and mandir jaali panels in MS and stainless steel.",
    metaTitle: "CNC Laser Cut Metal Partitions in Pratapgarh & UP | Sparsh Trading",
    metaDescription: "Custom CNC laser cut decorative metal partitions, jaali screens & mandir backdrops in Pratapgarh. SS 304, Mild Steel, gold/bronze PU coatings. Request quote.",
    keywords: [
      "cnc laser cut partition pratapgarh",
      "decorative metal jaali screen",
      "mandir metal backdrop up",
      "laser cut room divider prayagraj",
      "architectural metal screen jaunpur"
    ],
    material: "2mm - 4mm Precision Laser Cut Mild Steel / SS 304",
    finish: "Metallic Gold, Rose Gold, Antique Bronze & Matte Black PU",
    customization: "100+ Custom CNC Geometric & Floral Patterns Cut to Exact Dimensions",
    warranty: "5-Year Anti-Chipping Finish Guarantee",
    leadTime: "4 to 7 Working Days",
    description: "Precision laser-cut architectural screens for separating living and dining areas, creating mandir backdrops, or adding elegant jaali features to railings and facades. Finished in durable metallic gold, bronze, or matte black.",
    applications: [
      "Living-Dining Room Partitions",
      "Pooja Room & Mandir Backdrops",
      "Staircase Railing Decorative Jaali Panels",
      "Building Facade Screens & AC Outdoor Covers"
    ],
    features: [
      "Over 100+ modern geometric, floral, and sacred motif patterns",
      "Laser cutting achieves sub-millimeter precision with smooth, touch-safe edges",
      "Welded in rigid structural border frames for easy bolt-on installation",
      "Finished with luxury metallic PU coatings"
    ],
    specifications: [
      { label: "Sheet Thickness", value: "2.0mm, 3.0mm, 4.0mm Solid Sheet" },
      { label: "Outer Frame", value: "25x25mm / 40x20mm Hollow Box Section" },
      { label: "Cutting Tech", value: "Fiber Optic High-Power CNC Laser Machine" },
      { label: "Installation", value: "Concealed Floor & Ceiling Anchors / Wall Flanges" }
    ],
    image: "/media/interior-decor/laser-cut-metal-living-room-partition-screen.webp",
    galleryImages: [
      "/media/interior-decor/laser-cut-metal-living-room-partition-screen.webp",
      "/media/interior-decor/decorative-cnc-metal-jaali-screen-mandir-backdrop.webp"
    ],
    relatedServiceSlug: "interior-decor",
    faqs: [
      {
        q: "Can I customize the pattern design for my partition?",
        a: "Yes! You can choose from our catalogue of 100+ patterns or send us your own CAD/vector design, and our laser machines will cut it with 100% precision."
      }
    ]
  }
];

export function getProductBySlug(slug: string): DetailedProduct | undefined {
  return detailedProducts.find((p) => p.slug === slug);
}
