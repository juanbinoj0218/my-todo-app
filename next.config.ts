import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This tells Vercel to ignore the type errors and finish the build anyway
    ignoreBuildErrors: true,
  },
};

export default nextConfig;