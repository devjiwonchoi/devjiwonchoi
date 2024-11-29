import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: true,
    typedEnv: true,
    turbo: {
      unstablePersistentCaching: true,
    },
  },
}

export default nextConfig
