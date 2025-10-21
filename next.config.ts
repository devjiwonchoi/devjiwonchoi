import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
