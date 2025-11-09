import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@local-services/ui", "@local-services/types"],
  experimental: {
    optimizePackageImports: ["@local-services/ui"],
  },
};

export default nextConfig;
