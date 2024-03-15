import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/utils/types'

const blogDocsDir = join(process.cwd(), 'docs', 'blog')
const outputDir = join(process.cwd(), '.vercel', 'output')

;(async function setUpBlogPosts() {
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
    // See https://github.com/jonschlinkert/gray-matter/issues/62
    const date = new Date(frontmatter.date)?.toISOString()?.split('T')?.[0]

    if (!id || isNaN(parseInt(id))) return

    const json = JSON.stringify({ ...frontmatter, id, slug, content, date })
    await writeFile(`${outputDir}/post-${id}.json`, json)

    return { ...frontmatter, id, slug, date } as BlogPost
  })

  const posts = (await Promise.all(postJobs)).filter(Boolean) as BlogPost[]
  const json = JSON.stringify(posts)
  await writeFile(`${outputDir}/posts.json`, json)
})()
