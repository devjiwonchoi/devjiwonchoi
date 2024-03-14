import { writeFileSync } from 'fs'
import { join } from 'path'
import { blogDocsDir, getBlogPosts } from '@/utils/mdx/get-blog-posts'
;(function setupBlogPosts() {
  const posts = getBlogPosts()
  const json = JSON.stringify(posts, null, 2)
  console.log(posts, json)
  writeFileSync(join(blogDocsDir, 'blog.json'), json)
})()
