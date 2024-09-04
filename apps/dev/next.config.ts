import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    typedEnv: true,
    dynamicIO: true,
  },
}

export default nextConfig
