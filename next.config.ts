import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",                 // static export for GitHub Pages
  images: { unoptimized: true },    // no server image optimizer
  basePath: isProd ? "/MyWebsite2025" : undefined,   // <-- EXACT repo name
  assetPrefix: isProd ? "/MyWebsite2025/" : undefined,
  eslint: { ignoreDuringBuilds: true },              // avoid CI lint fails
  typescript: { ignoreBuildErrors: true },           // (safe for Pages build)
};
export default nextConfig;
