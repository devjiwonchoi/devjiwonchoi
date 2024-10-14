import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    typedEnv: true,
  },
}

export default nextConfig
