import { writeFileSync } from 'fs'
import { blogDocsJson, getBlogPosts } from '@/utils/mdx/get-blog-posts'
;(function setupBlogPosts() {
  const posts = getBlogPosts()
  const json = JSON.stringify(posts, null, 2)
  writeFileSync(blogDocsJson, json)
})()
