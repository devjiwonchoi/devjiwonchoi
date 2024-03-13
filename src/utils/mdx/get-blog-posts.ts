import { readdirSync } from 'fs'
import { extname, join } from 'path'

function slugToTitle(slug: string) {
  // replace all '-' with ' '
  // replace all '_' with '.'
  return slug.replaceAll('-', ' ').replace('_', '.')
}

function parseFilenameToPosts(filename: string) {
  // filename = `yyyy-mm-dd.tag1,tag2,tag3.this-is-slug.mdx`
  const resources: string[] = filename.split('.')
  const date = resources[0] // yyyy-mm-dd
  const tags: string[] = resources[1].split(',') // [tag1, tag2, tag3]
  const readTime = resources[2] // n
  const slug = resources[3] // this-is-slug

  const title = slugToTitle(slug)

  return {
    date,
    tags,
    readTime,
    slug,
    title,
  }
}

export function getBlogPosts() {
  // since we run this in build time, we can use process.cwd()
  const dir = join(process.cwd(), 'docs', 'blog')
  const dirents = readdirSync(dir, { withFileTypes: true })
  const posts = dirents.map((dirent) => {
    if (!dirent.isFile()) return

    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    return parseFilenameToPosts(direntName)
  })

  return posts.filter(Boolean)
}
