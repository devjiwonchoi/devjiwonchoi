import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    typedEnv: true,
    typedRoutes: true,
    turbopackPersistentCaching: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
