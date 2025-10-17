import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    typedEnv: true,
    typedRoutes: true,
    turbopackFileSystemCacheForDev: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
