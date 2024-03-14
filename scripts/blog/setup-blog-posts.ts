import { mkdirSync, writeFileSync } from 'fs'
import { outputDir, getBlogPosts } from '@/utils/mdx/get-blog-posts'
;(function setupBlogPosts() {
  const posts = getBlogPosts()
  const json = JSON.stringify(posts, null, 2)

  mkdirSync(outputDir, { recursive: true })
  writeFileSync(`${outputDir}/posts.json`, json)
})()
