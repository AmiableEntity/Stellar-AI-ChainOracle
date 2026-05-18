import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stellar SDK uses Node.js-only modules — keep it server-side only
  serverExternalPackages: ["@stellar/stellar-sdk", "@stellar/stellar-base"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent client bundle from trying to bundle Node.js-only stellar modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
