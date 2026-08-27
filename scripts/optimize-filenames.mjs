import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");

// Mapping of old relative paths to new SEO-optimized keyword filenames
const RENAMES = [
  // Videos
  {
    from: "hero-video.mp4",
    to: "sparsh-trading-workshop-fabrication-pratapgarh.mp4"
  },
  {
    from: "media/introvideo.mp4",
    to: "media/steel-fabrication/sparsh-trading-fabrication-machinery-demo.mp4"
  },
  
  // Structural Steel & PPGI
  {
    from: "media/image.webp",
    to: "media/steel-fabrication/heavy-structural-steel-fabrication-pratapgarh.webp"
  },
  {
    from: "media/image.jpeg",
    to: "media/steel-fabrication/heavy-structural-steel-fabrication-pratapgarh.jpeg"
  },

  // Modular Kitchen
  {
    from: "media/modular-kitchen/kitchen1.webp",
    to: "media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.webp"
  },
  {
    from: "media/modular-kitchen/kitchen1.jpeg",
    to: "media/modular-kitchen/modern-l-shaped-acrylic-modular-kitchen.jpeg"
  },
  {
    from: "media/modular-kitchen/kitchen2.webp",
    to: "media/modular-kitchen/contemporary-island-modular-kitchen-countertop.webp"
  },
  {
    from: "media/modular-kitchen/kitchen2.jpeg",
    to: "media/modular-kitchen/contemporary-island-modular-kitchen-countertop.jpeg"
  },
  {
    from: "media/modular-kitchen/kitchen3.webp",
    to: "media/modular-kitchen/hydraulic-overhead-modular-kitchen-cabinets.webp"
  },
  {
    from: "media/modular-kitchen/kitchen3.jpeg",
    to: "media/modular-kitchen/hydraulic-overhead-modular-kitchen-cabinets.jpeg"
  },
  {
    from: "media/modular-kitchen/kitchen4.webp",
    to: "media/modular-kitchen/stainless-steel-304-kitchen-tandem-baskets.webp"
  },
  {
    from: "media/modular-kitchen/kitchen4.jpeg",
    to: "media/modular-kitchen/stainless-steel-304-kitchen-tandem-baskets.jpeg"
  },
  {
    from: "media/modular-kitchen/kitchen5.webp",
    to: "media/modular-kitchen/tall-pantry-storage-modular-kitchen-pratapgarh.webp"
  },
  {
    from: "media/modular-kitchen/kitchen5.jpeg",
    to: "media/modular-kitchen/tall-pantry-storage-modular-kitchen-pratapgarh.jpeg"
  },
  {
    from: "media/modular-kitchen/kitchen6.webp",
    to: "media/modular-kitchen/waterproof-marine-ply-modular-kitchen-fitting.webp"
  },
  {
    from: "media/modular-kitchen/kitchen6.jpeg",
    to: "media/modular-kitchen/waterproof-marine-ply-modular-kitchen-fitting.jpeg"
  },

  // Toughened Glass Railing
  {
    from: "media/toughened-glass-railing/glassrail.webp",
    to: "media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.webp"
  },
  {
    from: "media/toughened-glass-railing/glassrail.jpeg",
    to: "media/toughened-glass-railing/frameless-12mm-toughened-glass-balcony-railing.jpeg"
  },
  {
    from: "media/toughened-glass-railing/glassrail1.webp",
    to: "media/toughened-glass-railing/ss-304-spigots-glass-balcony-railing.webp"
  },
  {
    from: "media/toughened-glass-railing/glassrail1.jpeg",
    to: "media/toughened-glass-railing/ss-304-spigots-glass-balcony-railing.jpeg"
  },
  {
    from: "media/toughened-glass-railing/glassrail2.webp",
    to: "media/toughened-glass-railing/staircase-toughened-glass-railing-ss-handrail.webp"
  },
  {
    from: "media/toughened-glass-railing/glassrail2.jpeg",
    to: "media/toughened-glass-railing/staircase-toughened-glass-railing-ss-handrail.jpeg"
  },
  {
    from: "media/toughened-glass-railing/glassrail3.webp",
    to: "media/toughened-glass-railing/terrace-architectural-glass-balustrade-pratapgarh.webp"
  },
  {
    from: "media/toughened-glass-railing/glassrail3.jpeg",
    to: "media/toughened-glass-railing/terrace-architectural-glass-balustrade-pratapgarh.jpeg"
  },
  {
    from: "media/toughened-glass-railing/glassrail4.webp",
    to: "media/toughened-glass-railing/high-elevation-glass-railing-fitting-up.webp"
  },
  {
    from: "media/toughened-glass-railing/glassrail4.jpeg",
    to: "media/toughened-glass-railing/high-elevation-glass-railing-fitting-up.jpeg"
  },

  // uPVC Windows & Doors & Aluminium
  {
    from: "media/upvc-windows-doors/upvc.webp",
    to: "media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc.jpeg",
    to: "media/upvc-windows-doors/3-track-sliding-upvc-window-with-mosquito-mesh.jpeg"
  },
  {
    from: "media/upvc-windows-doors/upvc1.webp",
    to: "media/upvc-windows-doors/soundproof-casement-upvc-window-system.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc1.jpeg",
    to: "media/upvc-windows-doors/soundproof-casement-upvc-window-system.jpeg"
  },
  {
    from: "media/upvc-windows-doors/upvc2.webp",
    to: "media/upvc-windows-doors/acoustic-upvc-balcony-sliding-door-pratapgarh.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc2.jpeg",
    to: "media/upvc-windows-doors/acoustic-upvc-balcony-sliding-door-pratapgarh.jpeg"
  },
  {
    from: "media/upvc-windows-doors/upvc3.webp",
    to: "media/upvc-windows-doors/reinforced-upvc-window-toughened-glass.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc3.jpeg",
    to: "media/upvc-windows-doors/reinforced-upvc-window-toughened-glass.jpeg"
  },
  {
    from: "media/upvc-windows-doors/upvc4.webp",
    to: "media/upvc-windows-doors/powder-coated-domal-aluminium-sliding-window.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc4.jpeg",
    to: "media/upvc-windows-doors/powder-coated-domal-aluminium-sliding-window.jpeg"
  },
  {
    from: "media/upvc-windows-doors/upvc5.webp",
    to: "media/upvc-windows-doors/tropicalized-lead-free-upvc-profile-inspection.webp"
  },
  {
    from: "media/upvc-windows-doors/upvc5.jpeg",
    to: "media/upvc-windows-doors/tropicalized-lead-free-upvc-profile-inspection.jpeg"
  },

  // Interior Decor & Partitions
  {
    from: "media/interior-decor/interior.webp",
    to: "media/interior-decor/laser-cut-metal-living-room-partition-screen.webp"
  },
  {
    from: "media/interior-decor/interior.jpeg",
    to: "media/interior-decor/laser-cut-metal-living-room-partition-screen.jpeg"
  },
  {
    from: "media/interior-decor/interior-decor-2.webp",
    to: "media/interior-decor/decorative-cnc-metal-jaali-screen-mandir-backdrop.webp"
  },
  {
    from: "media/interior-decor/interior-decor-2.jpeg",
    to: "media/interior-decor/decorative-cnc-metal-jaali-screen-mandir-backdrop.jpeg"
  },

  // Leadership / Partners
  {
    from: "media/owner/partner1.webp",
    to: "media/owner/sparsh-trading-operations-partner-pratapgarh.webp"
  },
  {
    from: "media/owner/partner1.jpg",
    to: "media/owner/sparsh-trading-operations-partner-pratapgarh.jpg"
  },
  {
    from: "media/owner/partner2.webp",
    to: "media/owner/sparsh-trading-design-partner-pratapgarh.webp"
  },
  {
    from: "media/owner/partner2.jpg",
    to: "media/owner/sparsh-trading-design-partner-pratapgarh.jpg"
  },
  {
    from: "media/owner/owner-photo.webp",
    to: "media/owner/sparsh-trading-workshop-fabrication-master.webp"
  },
  {
    from: "media/owner/owner-photo.jpg",
    to: "media/owner/sparsh-trading-workshop-fabrication-master.jpg"
  }
];

// Ensure target directories exist and copy files
for (const item of RENAMES) {
  const src = path.join(PUBLIC, item.from);
  const dest = path.join(PUBLIC, item.to);

  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied: ${item.from} → ${item.to}`);
  } else {
    console.warn(`! Source not found: ${src}`);
  }
}

console.log("\n🎉 All media files copied with SEO-optimized descriptive filenames!");
