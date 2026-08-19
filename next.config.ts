import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Wildcard: permit any HTTPS host (tenant logo_URL bisa berasal dari
      // domain kustom travel, Supabase Storage, cloudinary, dll).
      {
        protocol: "https",
        hostname: "*",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;


