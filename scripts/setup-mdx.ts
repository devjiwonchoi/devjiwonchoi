import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { extname, join } from 'path'
import { parseMDXToJSON } from '@/utils/mdx/utils'
import { BlogPost } from '@/utils/types'

async function setupMDX({ type }: { type: 'blog' | 'projects' }) {
  const docsDir = join(process.cwd(), 'src', 'docs', type)
  const outDir = join(process.cwd(), 'public', 'mdx', type)

  const dirents = await readdir(docsDir, { withFileTypes: true })
  await mkdir(outDir, { recursive: true })

  const postJobs = dirents.map(async (dirent) => {
    const direntName = dirent.name
    const ext = extname(direntName)
    if (!dirent.isFile() || ext !== '.mdx') return

    // Read the file and parse as frontmatter and content
    const source = await readFile(dirent.path, 'utf-8')
    const { content, ...post } = (await parseMDXToJSON({ source })) as BlogPost
    await writeFile(
      `${outDir}/${post.slug}.json`,
      JSON.stringify({ ...post, content }),
    )

    const expectedDirentName = `${post.slug}${ext}`
    if (direntName !== expectedDirentName) {
      throw new Error(
        `Expected ${dirent.path} to be named ${expectedDirentName}`,
      )
    }

    return post
  })

  // All those posts to a single posts.json file without content
  const posts = JSON.stringify((await Promise.all(postJobs)).filter(Boolean))
  await writeFile(`${outDir}/index.json`, posts)
}

setupMDX({ type: 'blog' })
