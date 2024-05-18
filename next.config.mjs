import NextBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    typedRoutes: true,
  },
}

export default Boolean(process.env.ANALYZE)
  ? NextBundleAnalyzer({
      enabled: true,
      openAnalyzer: true,
      analyzerMode: 'static',
      logLevel: 'info',
    })(nextConfig)
  : nextConfig
