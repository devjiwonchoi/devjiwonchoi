import { PROD_BASE_URL } from '@/utils/constants'
import { getBlogPosts } from '@/app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  const itemsXml = allBlogs
    .sort((a: any, b: any) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post: any) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${PROD_BASE_URL}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt,
          ).toUTCString()}</pubDate>
        </item>`,
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${PROD_BASE_URL}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
