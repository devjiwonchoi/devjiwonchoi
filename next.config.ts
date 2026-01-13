import type { NextConfig } from "next";

import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    typedEnv: true,
    turbopackFileSystemCacheForDev: true,
  },
};

export default withWorkflow(nextConfig);
