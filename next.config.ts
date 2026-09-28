import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    /** Cache do otimizador em disco/CDN (1 dia). */
    minimumCacheTTL: 60 * 60 * 24,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384, 640],
    remotePatterns: [
      // MinIO — mídia enviada via CMS Landing (ambiental-system)
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/landing-media/**" },
      { protocol: "https", hostname: "minio.ambiental.com.br", pathname: "/landing-media/**" },
      { protocol: "https", hostname: "minio.bomanejo.com.br", pathname: "/landing-media/**" },
      { protocol: "https", hostname: "s3.bomanejo.com.br", pathname: "/landing-media/**" },
    ],
  },
};

export default nextConfig;
