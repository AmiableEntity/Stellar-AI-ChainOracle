import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Prepare for future Soroban/WASM support
    serverComponentsExternalPackages: ["@stellar/stellar-sdk"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
