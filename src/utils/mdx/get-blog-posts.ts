import { readdirSync } from 'fs'
import { readdir, readFile, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { components } from './components'

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
  const readTime = resources[3] // m
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
  title: string
  slug: string
  content?: string
}

export const blogDocsDir = join(process.cwd(), 'src', 'docs', 'blog')
export const outputDir = join(process.cwd(), '.vercel', 'output')

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

// mission: get all blog posts, and return as posts and post-id
// - go through all files in blog directory
// - if is .mdx, readfile
// - parse frontmatter and content
// - save to posts and post-id

export async function protoBlog() {
  const dirents = await readdir(blogDocsDir, { withFileTypes: true })
  const postJobs = dirents.map(async (dirent) => {
    if (!dirent.isFile()) return

    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    const source = await readFile(join(dirent.path, direntName), 'utf-8')
    const { frontmatter, content } = await compileMDX<BlogPost>({
      source,
      components,
      options: { parseFrontmatter: true },
    })

    const json = JSON.stringify({ ...frontmatter, content })
    await writeFile(`${outputDir}/post-${frontmatter.id}.json`, json)

    return { ...frontmatter } as BlogPost
  })

  const posts = (await Promise.all(postJobs)).filter(Boolean) as BlogPost[]
  const json = JSON.stringify(posts)
  await writeFile(`${outputDir}/posts.json`, json)
}
