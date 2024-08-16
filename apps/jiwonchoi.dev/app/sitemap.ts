import type { MetadataRoute } from 'next'
import { PROD_BASE_URL } from '@/utils/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [''].map((route) => ({
    url: `${PROD_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes]
}
