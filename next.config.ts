import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: "8mb" },
    optimizePackageImports: ["framer-motion", "@react-pdf/renderer"]
  }
};

export default nextConfig;
