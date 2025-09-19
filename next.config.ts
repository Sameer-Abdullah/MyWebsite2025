// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",                 
  images: { unoptimized: true },    
  basePath: isProd ? "/MyWebsite2025" : undefined,   
  assetPrefix: isProd ? "/MyWebsite2025/" : undefined,
};

export default nextConfig;
