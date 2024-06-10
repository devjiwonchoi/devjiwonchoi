import type { Embedding } from 'ai'
import dotenv from 'dotenv'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { generateEmbeddingFromMarkdown } from './generate-embedding-from-md'
import { fetchGitHubAPI } from '../src/utils/fetch-github-api'

dotenv.config({ path: '.env.local' })

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
  embedding: Embedding
}

async function docPathToProdURL(path: string) {
  const prodPath = path
    .split('/')
    .map((part) => part.replace(/^\d{2}-/, '')) // remove all 0x- prefix
    .join('/')
    .replaceAll('/index', '')
    .replaceAll('.mdx', '')

  return `https://nextjs.org/${prodPath}`
}

async function getNextJSDocs(endpoint?: string): Promise<NextDoc[]> {
  endpoint = endpoint
    ? `/repos/vercel/next.js/contents/${endpoint}`
    : '/repos/vercel/next.js/contents/docs'
  const response: GitHubAPIResponse[] = await fetchGitHubAPI({
    endpoint,
  })

  const docs: NextDoc[] = []
  const job = response.map(
    async ({ type, name, url, html_url, path, sha, size }) => {
      if (type === 'file' && name.endsWith('.mdx')) {
        const file = await fetchGitHubAPI({
          url,
        })
        const content = Buffer.from(file.content, file.encoding).toString(
          'utf-8'
        )
        const embedding = await generateEmbeddingFromMarkdown(content)
        const nextDoc: NextDoc = {
          path,
          docUrl: html_url,
          prodUrl: await docPathToProdURL(path),
          sha,
          size,
          embedding,
        }
        docs.push(nextDoc)
      } else if (type === 'dir') {
        docs.push(...(await getNextJSDocs(path)))
      } else {
        console.log(`Skipped ${name}`)
      }
    }
  )

  await Promise.all(job)
  return docs
}

async function main() {
  console.log('Fetching Next.js docs...')

  let docs: NextDoc[] = []
  const start = Date.now()
  try {
    docs = await getNextJSDocs()
  } finally {
    console.log(`Finished in ${Date.now() - start}ms`)
    console.log(`Fetched ${docs.length} docs`)

    await writeFile(
      join(process.cwd(), 'public', 'json', 'nextjs-docs.json'),
      JSON.stringify(docs)
    )
  }
}

main().catch(console.error)
