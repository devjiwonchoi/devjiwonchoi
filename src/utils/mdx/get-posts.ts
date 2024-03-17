import 'server-only'
import { readdir, readFile } from 'fs/promises'
import { extname, join } from 'path'
import matter from 'gray-matter'
import { slugify } from './utils'
import { IS_DEV } from '../constants'
import type { BlogPost } from '../types'

const blogDocsDir = join(process.cwd(), 'src', 'docs', 'blog')
export async function onDemandGetPosts() {
  const dirents = await readdir(blogDocsDir, { withFileTypes: true })
  const postJobs = dirents.map(async (dirent) => {
    // We are looking for a .mdx file
    if (!dirent.isFile()) return
    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    // Read the file and parse as frontmatter and content
    const resolvedDirentPath = join(dirent.path, direntName)
    const source = await readFile(resolvedDirentPath, 'utf-8')
    const { data: frontmatter } = matter(source)

    // Generate slug and id here
    // Ensure id is number-formatted string
    const id: string = frontmatter.id.toString()
    if (!id || isNaN(parseInt(id))) return
    const slug = `${slugify(frontmatter.title)}-${id}`

    // frontmatter parses date as a Date object
    // See https://github.com/jonschlinkert/gray-matter/issues/62
    const date = new Date(frontmatter.date)?.toISOString()?.split('T')?.[0]

    return { ...frontmatter, id, slug, date } as BlogPost
  })

  return (await Promise.all(postJobs)).filter(Boolean) as BlogPost[]
}

export async function onDemandGetPost(slug: string) {
  // Read the file and parse as frontmatter and content
  const resolvedDirentPath = join(blogDocsDir, `${slug}.mdx`)
  const source = await readFile(resolvedDirentPath, 'utf-8')
  const { data: frontmatter, content } = matter(source)

  const id: string = frontmatter.id.toString()
  // frontmatter parses date as a Date object
  // See https://github.com/jonschlinkert/gray-matter/issues/62
  const date = new Date(frontmatter.date)?.toISOString()?.split('T')?.[0]

  return { ...frontmatter, id, slug, date, content } as BlogPost
}

export const getPosts = async () =>
  IS_DEV
    ? onDemandGetPosts()
    : ((await import(`../../../public/mdx/blog/posts.json`))
        .default as BlogPost[])

export const getPost = async ({ id, slug }: { id: string; slug: string }) =>
  IS_DEV
    ? onDemandGetPost(slug)
    : ((await import(`../../../public/mdx/blog/post-${id}.json`))
        .default as BlogPost)

// mission: convert mdx to json and store in public/