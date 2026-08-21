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
 * SPARSH TRADING - CENTRAL MEDIA CATALOGUE
 * 
 * To add your photos and videos:
 * 1. Put your files inside the `public/media/<service-folder>/` folder.
 *    (For example: `public/media/modular-kitchen/kitchen-1.jpg` or `public/media/steel-fabrication/gate-video.mp4`)
 * 2. Add an entry below with the path (e.g. url: "/media/modular-kitchen/kitchen-1.jpg").
 * 3. The images and videos will automatically appear in that service's page AND in the Category Gallery!
 */

export const mediaCatalogue: MediaItem[] = [
  // 1. Modular Kitchen
  {
    id: "mk-1",
    title: "L-Shaped Modern Modular Kitchen",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/brand-wordmark.png", // Fallback until user replaces with photo
    description: "Custom acrylic finish cabinets with stainless steel pull-out baskets."
  },
  {
    id: "mk-2",
    title: "Island Kitchen Counter & Overhead Storage",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "image",
    url: "/brand-logo.png",
    description: "Soft-close hydraulic cabinets with durable quartz countertop."
  },
  {
    id: "mk-v1",
    title: "Modular Kitchen Soft-Close Hardware Demo",
    serviceSlug: "modular-kitchen",
    category: "Modular Kitchen",
    type: "video",
    url: "/hero-video.mp4",
    description: "Walkthrough of custom modular kitchen drawers and corner carousel."
  },

  // 2. uPVC Windows & Doors
  {
    id: "upvc-1",
    title: "3-Track Sliding uPVC Window with Mosquito Mesh",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/brand-wordmark.png",
    description: "Heavy-duty uPVC profile with acoustic weather-stripping."
  },
  {
    id: "upvc-2",
    title: "Casement uPVC Door with Toughened Glass",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "image",
    url: "/brand-logo.png",
    description: "Multi-point locking system for residential security."
  },
  {
    id: "upvc-v1",
    title: "uPVC Window Smooth Sliding & Locking Video",
    serviceSlug: "upvc-windows-doors",
    category: "uPVC Windows & Doors",
    type: "video",
    url: "/hero-video.mp4",
    description: "Demonstration of smooth sliding motion and air-tight sealing."
  },

  // 3. Steel Fabrication
  {
    id: "steel-1",
    title: "Heavy-Duty Designer Main Entrance Gate",
    serviceSlug: "steel-fabrication",
    category: "Steel Fabrication",
    type: "image",
    url: "/brand-wordmark.png",
    description: "Anti-rust primer coated structural steel gate with CNC cut accents."
  },
  {
    id: "steel-2",
    title: "Industrial Warehouse Steel Truss & Frame",
    serviceSlug: "steel-fabrication",
    category: "Steel Fabrication",
    type: "image",
    url: "/brand-logo.png",
    description: "Precision welded heavy angle & pipe fabrication."
  },
  {
    id: "steel-v1",
    title: "Workshop Steel Cutting & Precision Welding",
    serviceSlug: "steel-fabrication",
    category: "Steel Fabrication",
    type: "video",
    url: "/hero-video.mp4",
    description: "On-site fabrication process at our Pratapgarh workshop."
  },

  // 4. Toughened Glass Railing
  {
    id: "glass-1",
    title: "Frameless Toughened Glass Balcony Railing",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/brand-wordmark.png",
    description: "12mm crystal clear toughened glass with SS 304 spigot fittings."
  },
  {
    id: "glass-2",
    title: "Staircase Glass Railing with Wood/SS Handrail",
    serviceSlug: "toughened-glass-railing",
    category: "Toughened Glass Railing",
    type: "image",
    url: "/brand-logo.png",
    description: "Elegant indoor staircase glass balustrade."
  },

  // 5. Aluminium Windows
  {
    id: "alu-1",
    title: "Powder-Coated Aluminium Sliding Windows",
    serviceSlug: "aluminium-windows",
    category: "Aluminium Windows",
    type: "image",
    url: "/brand-wordmark.png",
    description: "Slim frame profile with tinted sun-control glass."
  },
  {
    id: "alu-2",
    title: "Commercial Aluminium Partition Frame",
    serviceSlug: "aluminium-windows",
    category: "Aluminium Windows",
    type: "image",
    url: "/brand-logo.png",
    description: "Office cabin partition with aluminium framing and frosted glass."
  },

  // 6. PPGI / Steel Door & Window Frames
  {
    id: "ppgi-1",
    title: "PPGI Pre-Painted Steel Door Frames",
    serviceSlug: "ppgi-steel-door-window-frames",
    category: "PPGI Frames",
    type: "image",
    url: "/brand-wordmark.png",
    description: "Rust-proof, termite-proof galvanized iron frames for construction projects."
  },
  {
    id: "ppgi-2",
    title: "Double Rebate PPGI Window Frames",
    serviceSlug: "ppgi-steel-door-window-frames",
    category: "PPGI Frames",
    type: "image",
    url: "/brand-logo.png",
    description: "Factory fabricated PPGI frames for glass and wire mesh shutters."
  },

  // 7. Interior Decor
  {
    id: "interior-1",
    title: "Architectural Metal Partition & Wall Decor",
    serviceSlug: "interior-decor",
    category: "Interior Decor",
    type: "image",
    url: "/brand-wordmark.png",
    description: "Laser cut decorative metal screen in matte gold/black finish."
  },
  {
    id: "interior-2",
    title: "Custom Steel & Wood Display Shelving",
    serviceSlug: "interior-decor",
    category: "Interior Decor",
    type: "image",
    url: "/brand-logo.png",
    description: "Industrial style wall rack and retail shelving units."
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
  "Steel Fabrication",
  "Toughened Glass Railing",
  "Aluminium Windows",
  "PPGI Frames",
  "Interior Decor",
  "Videos"
];
