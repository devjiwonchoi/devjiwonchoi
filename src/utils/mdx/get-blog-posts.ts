import { readdirSync } from 'fs'
import { extname, join } from 'path'

function slugToTitle(slug: string) {
  // replace all '-' with ' '
  // replace all '_' with '.'
  return slug.replaceAll('-', ' ').replace('_', '.')
}

function parseFilenameToPost(filename: string): BlogPost {
  // filename = `yyyy-mm-dd.tag1,tag2,tag3.this-is-slug.mdx`
  const resources: string[] = filename.split('.')
  const id = resources[0] // n
  const date = resources[1] // yyyy-mm-dd
  const tags: string[] = resources[2].split(',') // [tag1, tag2, tag3]
  const readTime = resources[3] // n
  const slug = resources[4] // this-is-slug

  const title = slugToTitle(slug)

  return {
    id,
    date,
    tags,
    readTime,
    slug,
    title,
  }
}

export type BlogPost = {
  id: string
  date: string
  tags: string[]
  readTime: string
  slug: string
  title: string
}

// since we run this in build time, we can use process.cwd()
export const blogDocsDir = join(process.cwd(), 'docs', 'blog')

export function getBlogPosts(): BlogPost[] {
  const dirents = readdirSync(blogDocsDir, { withFileTypes: true })
  const posts = dirents.map((dirent) => {
    if (!dirent.isFile()) return

    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    return parseFilenameToPost(direntName)
  })

  return posts.filter(Boolean) as BlogPost[]
}
