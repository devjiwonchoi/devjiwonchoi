import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
    ppr: true,
    typedEnv: true,
    typedRoutes: true,
    turbopackPersistentCaching: true,
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
