import type { NextConfig } from "next";

// GitHub Pages: siden ligger i undermappen /tkstudio og lages som vanlige filer.
// Lokalt (npm run dev) ligger den på rot, så localhost:3120 virker som før.
const basePath = process.env.NODE_ENV === "production" ? "/tkstudio" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  // GitHub Pages har ingen server som kan krympe bilder. Bildene er allerede små WebP-filer.
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
