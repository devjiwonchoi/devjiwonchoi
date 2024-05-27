import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/app/blog/utils'
import { PROD_BASE_URL } from '@/utils/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const blogs = getBlogPosts()
    .filter(({ isReady }) => isReady)
    .map(({ slug, metadata: { datePublished, dateModified } }) => ({
      url: `${PROD_BASE_URL}/blog/${slug}`,
      lastModified: dateModified ?? datePublished,
    }))

  const routes = ['', '/blog'].map((route) => ({
    url: `${PROD_BASE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs]
}
