import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: true,
    typedEnv: true,
    turbopackPersistentCaching: true,
    devtoolSegmentExplorer: true,
  },
};

export default nextConfig;
