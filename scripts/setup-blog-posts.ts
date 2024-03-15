import { mkdir, readdir, readFile, rm, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/utils/types'

const blogDocsDir = join(process.cwd(), 'docs', 'blog')
const outputDir = join(process.cwd(), '.vercel', 'output')

// ref: https://github.com/leerob/leerob.io
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

async function setUpBlogPosts() {
  // Read docs/blog directory
  const dirents = await readdir(blogDocsDir, { withFileTypes: true })
  // Create .vercel/output directory to ensure it exists
  await mkdir(outputDir, { recursive: true })

  const postJobs = dirents.map(async (dirent) => {
    // We are looking for a .mdx file
    if (!dirent.isFile()) return
    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    // Read the file and parse as frontmatter and content
    const resolvedDirentPath = join(dirent.path, direntName)
    const source = await readFile(resolvedDirentPath, 'utf-8')
    const { data: frontmatter, content } = matter(source)

    // Generate slug and id here
    // Ensure id is number-formatted string
    const id: string = frontmatter.id.toString()
    if (!id || isNaN(parseInt(id))) return
    const slug = `${slugify(frontmatter.title)}-${id}`

    // frontmatter parses date as a Date object
    // See https://github.com/jonschlinkert/gray-matter/issues/62
    const date = new Date(frontmatter.date)?.toISOString()?.split('T')?.[0]

    // Write the post to .vercel/output as post-${id}.json
    const post = JSON.stringify({ ...frontmatter, id, slug, content, date })
    await writeFile(`${outputDir}/post-${id}.json`, post)

    // Ensure the file names are consistent
    const expectedDirentName = `${id}-${slug}${ext}`
    if (direntName !== expectedDirentName) {
      await rm(resolvedDirentPath)
      await writeFile(join(dirent.path, expectedDirentName), source)
    }

    return { ...frontmatter, id, slug, date } as BlogPost
  })

  // All those posts to a single posts.json file without content
  const posts = JSON.stringify(
    (await Promise.all(postJobs)).filter(Boolean) as BlogPost[],
  )
  await writeFile(`${outputDir}/posts.json`, posts)
}

export async function getPosts() {
  try {
    await setUpBlogPosts()
  } catch (error) {
    throw new Error(error as string)
  } finally {
    return (await import(`.vercel/output/posts.json`)).default as BlogPost[]
  }
}

setUpBlogPosts()
