/** @type {import('next').NextConfig} */

const config = {
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en',
      },
      {
        source: '/blog',
        destination: '/en/blog',
      },
      {
        source: '/blog/:slug',
        destination: '/en/blog/:slug',
      },
      {
        source: '/request',
        destination: '/en/request',
      },
    ]
  },
}

export default config
