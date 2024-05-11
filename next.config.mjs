import NextBundleAnalyzer from '@next/bundle-analyzer'

const isAnalyzeMode = Boolean(process.env.ANALYZE)

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    typedRoutes: true,
  },
}

export default isAnalyzeMode ? NextBundleAnalyzer(nextConfig) : nextConfig
