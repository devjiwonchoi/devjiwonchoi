import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: true,
    typedEnv: true,
  },
}

export default nextConfig
