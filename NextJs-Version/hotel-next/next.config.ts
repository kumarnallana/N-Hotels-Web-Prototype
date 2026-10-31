import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // optimizePackageImports is automatic in Next.js 16+
};

export default nextConfig;
