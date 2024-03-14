import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/utils/types'

const blogDocsDir = join(process.cwd(), 'src', 'docs', 'blog')
const outputDir = join(process.cwd(), '.vercel', 'output')

async function protoBlog() {
  const dirents = await readdir(blogDocsDir, { withFileTypes: true })
  await mkdir(outputDir, { recursive: true })

  const postJobs = dirents.map(async (dirent) => {
    if (!dirent.isFile()) return

    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    const source = await readFile(join(dirent.path, direntName), 'utf-8')
    const { data: frontmatter, content } = matter(source)

    const slug = direntName.replace(ext, '')
    const id = slug.split('-').pop()

    if (!id || isNaN(parseInt(id))) return

    const json = JSON.stringify({ id, slug, content, ...frontmatter })
    await writeFile(`${outputDir}/post-${id}.json`, json)

    return { id, slug, ...frontmatter } as BlogPost
  })

  const posts = (await Promise.all(postJobs)).filter(Boolean) as BlogPost[]
  const json = JSON.stringify(posts)
  await writeFile(`${outputDir}/posts.json`, json)
}

protoBlog()
