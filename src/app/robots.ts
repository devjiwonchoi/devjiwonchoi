import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
    },
    host: 'https://www.jiwonchoi.dev',
    sitemap: 'https://www.jiwonchoi.dev/sitemap.xml',
  }
}
