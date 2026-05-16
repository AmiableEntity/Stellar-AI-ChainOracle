import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stellar SDK uses Node.js-only modules — keep it server-side only
  serverExternalPackages: ["@stellar/stellar-sdk"],
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
