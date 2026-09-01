import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // MinIO — mídia enviada via CMS Landing (ambiental-system)
      { protocol: "http", hostname: "localhost", port: "9000", pathname: "/landing-media/**" },
      { protocol: "https", hostname: "minio.ambiental.com.br", pathname: "/landing-media/**" },
    ],
  },
};

export default nextConfig;
