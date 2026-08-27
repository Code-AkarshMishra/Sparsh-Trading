export type MediaItem = {
  id: string;
  title: string;
  serviceSlug: string;
  category: string;
  type: "image" | "video";
  url: string;
  thumbnail?: string;
  description?: string;
  featured?: boolean;
};

/**
 * SPARSH TRADING - OFFICIAL MEDIA CATALOGUE
 * Integrated with real photos & site videos from public/media/
 */

export const mediaCatalogue: MediaItem[] = [
  // 1. Modular Kitchen (Photos & Videos)
  {
    id: "mk-1",
    title: "Modern L-Shaped Modular Kitchen Layout",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen1.jpeg",
    description: "Custom acrylic gloss cabinetry with soft-close tandem drawers and chimney integration."
  },
  {
    id: "mk-2",
    title: "Contemporary Island Kitchen & Countertop",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen2.jpeg",
    description: "Dual-tone modular kitchen cabinets with quartz stone worktop and built-in appliance bays."
  },
  {
    id: "mk-3",
    title: "Overhead Kitchen Storage & Corner Carousel",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen3.jpeg",
    description: "Hydraulic lift-up frosted glass cabinets with integrated under-cabinet warm LED lighting."
  },
  {
    id: "mk-4",
    title: "SS 304 Pull-Out Storage & Cutlery Baskets",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen4.jpeg",
    description: "Heavy gauge stainless steel storage baskets with silent telescopic drawer channels."
  },
  {
    id: "mk-5",
    title: "Premium Finish Modular Kitchen Pantry Setup",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen5.jpeg",
    description: "Multi-tier tall pantry unit with easy glide mechanisms and maximum space utilization."
  },
  {
    id: "mk-6",
    title: "Complete Modular Kitchen Cabinetry Fitting",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/media/modular-kitchen/kitchen6.jpeg",
    description: "Marine HDHMR water-resistant board structure with anti-scratch seamless edge banding."
  },
  {
    id: "mk-v1",
    title: "Modular Kitchen Soft-Close Hardware Demo Video",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "video",
    url: "/media/modular-kitchen/kitchen-video-1.mp4",
    description: "Site demonstration of smooth drawer glide and hydraulic cabinet hinge operation."
  },
  {
    id: "mk-v2",
    title: "Finished Modular Kitchen Walkthrough Video",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "video",
    url: "/media/modular-kitchen/kitchen-video-2.mp4",
    description: "Completed modular kitchen site installation with turnkey finishes in Pratapgarh."
  },

  // 2. Toughened Glass Railing (Photos)
  {
    id: "glass-1",
    title: "Frameless Toughened Glass Balcony Railing",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/media/toughened-glass-railing/glassrail.jpeg",
    description: "12mm safety toughened glass mounted with heavy SS 304 floor spigot clamps."
  },
  {
    id: "glass-2",
    title: "Staircase Glass Railing with SS Handrail",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/media/toughened-glass-railing/glassrail2.jpeg",
    description: "Architectural staircase glass balustrade with seamless continuous stainless steel top pipe."
  },
  {
    id: "glass-3",
    title: "Terrace & Balcony Architectural Glass Balustrade",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/media/toughened-glass-railing/glassrail3.jpeg",
    description: "Weather-resistant toughened glass with mirror polished SS fittings for residential balconies."
  },
  {
    id: "glass-4",
    title: "Modern Glass Railing Fitting on High Elevation",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/media/toughened-glass-railing/glassrail4.jpeg",
    description: "Precision laser alignment and high tensile anchoring for maximum structural safety."
  },

  // 3. uPVC Windows & Doors (Photos & Video)
  {
    id: "upvc-1",
    title: "3-Track Sliding uPVC Window with SS Mesh",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc.jpeg",
    description: "Multi-chamber lead-free uPVC profile with mosquito mesh shutter and soundproof seals."
  },
  {
    id: "upvc-2",
    title: "Heavy-Duty Casement uPVC Window System",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc1.jpeg",
    description: "Acoustic insulated casement window with dual EPDM weather strips and multi-point lock."
  },
  {
    id: "upvc-3",
    title: "Soundproof uPVC Balcony Sliding Door",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc2.jpeg",
    description: "Smooth sliding heavy section uPVC door designed for large exterior openings and ventilation."
  },
  {
    id: "upvc-4",
    title: "Architectural uPVC Window & Glass Shutter",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc3.jpeg",
    description: "Toughened float glass panels encased in reinforced galvanized steel core uPVC frames."
  },
  {
    id: "upvc-5",
    title: "Custom Sized uPVC Sliding Window Installation",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc4.jpeg",
    description: "Millimeter-precision site installation with thermal expansion joint sealing."
  },
  {
    id: "upvc-6",
    title: "Reinforced uPVC Profile Quality Inspection",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/media/upvc-windows-doors/upvc5.jpeg",
    description: "UV-stabilized virgin uPVC material tested for extreme temperature resistance."
  },
  {
    id: "upvc-v1",
    title: "uPVC Smooth Sliding & Acoustic Seal Video Demo",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "video",
    url: "/media/upvc-windows-doors/upvc-video.mp4",
    description: "Live demonstration of effortless gliding motion, sound reduction and tight lock latching."
  },

  // 4. Interior Decor & Architectural Metalwork
  {
    id: "interior-1",
    title: "Laser Cut Metal Living Room Partition",
    serviceSlug: "interior-decor",
    category: "Interior Decor",
    type: "image",
    url: "/media/interior-decor/interior.jpeg",
    description: "Geometric CNC laser cut metal partition screen with premium powder-coat finish."
  },
  {
    id: "interior-2",
    title: "Architectural Decorative Metal Accent & Screen",
    serviceSlug: "interior-decor",
    category: "Interior Decor",
    type: "image",
    url: "/media/interior-decor/interior-decor-2.jpeg",
    description: "Custom crafted architectural metal screen for interior spatial division and aesthetics."
  },

  // 5. Steel Fabrication & Structural Work
  {
    id: "steel-1",
    title: "Heavy-Duty Structural Steel & Iron Fabrication",
    serviceSlug: "steel-fabrication",
    category: "Steel Fabrication",
    type: "image",
    url: "/media/image.jpeg",
    description: "Precision welded structural steel frame with anti-rust zinc primer coat."
  },
  {
    id: "steel-v1",
    title: "Sparsh Trading Workshop & Fabrication Video",
    serviceSlug: "steel-fabrication",
    category: "Steel Fabrication",
    type: "video",
    url: "/media/introvideo.mp4",
    description: "Workshop machinery, cutting, precision welding and craftsmanship at our Pratapgarh workshop."
  },

  // 6. PPGI Frames & Aluminium Windows
  {
    id: "ppgi-1",
    title: "PPGI Pre-Painted Steel Door Frames (Chaukhat)",
    serviceSlug: "ppgi-steel-door-window-frames",
    category: "PPGI Frames",
    type: "image",
    url: "/media/image.jpeg",
    description: "Rust-proof, termite-proof galvanized iron frames for residential and commercial construction."
  },
  {
    id: "alu-1",
    title: "Powder-Coated Aluminium Sliding Window System",
    serviceSlug: "aluminium-windows",
    category: "Aluminium Windows",
    type: "image",
    url: "/media/upvc-windows-doors/upvc1.jpeg",
    description: "Slim profile Jindal section aluminium frames with tinted sun-control glass."
  }
];

export function getMediaByService(serviceSlug: string) {
  return mediaCatalogue.filter((item) => item.serviceSlug === serviceSlug);
}

export function getMediaByCategory(category: string) {
  if (category === "All") return mediaCatalogue;
  if (category === "Videos") return mediaCatalogue.filter((item) => item.type === "video");
  return mediaCatalogue.filter((item) => item.category.toLowerCase() === category.toLowerCase());
}

export const galleryCategories = [
  "All",
  "Modular Kitchen",
  "uPVC Windows & Doors",
  "Toughened Glass Railing",
  "Steel Fabrication",
  "PPGI Frames",
  "Interior Decor",
  "Aluminium Windows",
  "Videos"
];
