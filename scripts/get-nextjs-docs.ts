import { writeFile } from 'fs/promises'
import { join } from 'path'
import { fetchGitHubAPI } from '../src/utils/fetch-github-api'
import dotenv from 'dotenv'

dotenv.config({ path: join(process.cwd(), '.env.local') })

type GitHubAPIResponse = {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  _links: {
    self: string
    git: string
    html: string
  }
}

type NextDoc = {
  path: string
  docUrl: string
  prodUrl: string
  sha: string
  size: number
  content: string
}

async function isValidURL(url: string) {
  try {
    new URL(url)
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

async function docPathToProdURL(path: string) {
  const prodPath = path
    .split('/')
    .map((part) => part.replace(/^\d{2}-/, '')) // remove all 0x- prefix
    .join('/')
    .replace('.mdx', '')
  const prodUrl = `https://nextjs.org/${prodPath}`

  if (await isValidURL(prodUrl)) {
    return prodUrl
  }

  return ''
}

async function getNextJSDocs(endpoint?: string): Promise<NextDoc[]> {
  endpoint = endpoint
    ? `/repos/vercel/next.js/contents/${endpoint}`
    : '/repos/vercel/next.js/contents/docs'
  const response: GitHubAPIResponse[] = await fetchGitHubAPI({
    endpoint,
  })

  const docs = []
  for (const { type, name, url, path, sha, size } of response) {
    if (type === 'file' && name.endsWith('.mdx')) {
      const file = await fetchGitHubAPI({
        url: url,
      })
      const content = Buffer.from(file.content, file.encoding).toString('utf-8')
      const nextDoc: NextDoc = {
        path,
        docUrl: url,
        prodUrl: await docPathToProdURL(path),
        sha,
        size,
        content,
      }
      docs.push(nextDoc)
      continue
    }
    if (type === 'dir') {
      docs.push(...(await getNextJSDocs(path)))
    }
  }

  return docs
}

async function main() {
  const docs = await getNextJSDocs()
  await writeFile(join(process.cwd(), 'nextjs-docs.json'), JSON.stringify(docs))
}

main().catch(console.error)
