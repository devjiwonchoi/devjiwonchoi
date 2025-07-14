import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    typedEnv: true,
    turbopackPersistentCaching: true,
    devtoolSegmentExplorer: true,
    browserDebugInfoInTerminal: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
