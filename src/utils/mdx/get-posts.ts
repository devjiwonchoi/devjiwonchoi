import 'server-only'
import { readdir, readFile } from 'fs/promises'
import { extname, join } from 'path'
import { parseMDXToJSON } from './utils'
import { IS_DEV } from '../constants'
import type { Blog, BlogList } from '../types'

export async function getDocs({
  type,
  slug,
}: {
  type: 'blog' | 'project'
  slug?: string
}): Promise<Blog | BlogList> {
  if (IS_DEV) {
    const targetDir = join(process.cwd(), 'src', 'docs', type)
    if (slug) {
      const source = await readFile(join(targetDir, `${slug}.mdx`), 'utf-8')
      return parseMDXToJSON({ source })
    }
    return getOnDemandDocsList(targetDir)
  }

  const targetDir = join(process.cwd(), 'public', 'mdx', type)
  const targetOutJson = join(targetDir, `${slug ?? 'index'}.json`)
  return JSON.parse(await readFile(targetOutJson, 'utf-8'))
}

export async function getOnDemandDocsList(targetDir: string) {
  const dirents = await readdir(targetDir, { withFileTypes: true })
  const postJobs = dirents.map(async (dirent) => {
    // We are looking for a .mdx file
    if (!dirent.isFile()) return
    const direntName = dirent.name
    const ext = extname(direntName)
    if (ext !== '.mdx') return

    const resolvedDirentPath = join(dirent.path, direntName)
    const source = await readFile(resolvedDirentPath, 'utf-8')
    return parseMDXToJSON({ source, frontmatterOnly: true })
  })

  return (await Promise.all(postJobs)).filter(Boolean) as BlogList
}