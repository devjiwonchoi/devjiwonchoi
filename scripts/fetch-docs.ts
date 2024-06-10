import type { Embedding } from 'ai'
import dotenv from 'dotenv'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { fetchGitHubAPI } from '../src/utils/fetch-github-api'
import { generateEmbeddings } from './generate-embeddings'

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

export type NextDoc = {
  sha: string
  docUrl: string
  prodUrl: string
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

async function errorPathToProdURL(path: string) {
  const prodPath = path.replace('errors/', 'docs/messages/').replace('.mdx', '')
  return `https://nextjs.org/${prodPath}`
}

async function fetchNextDocs({
  endpoint,
  docType,
}: {
  endpoint: string
  docType: string
}): Promise<NextDoc[]> {
  const response: GitHubAPIResponse[] = await fetchGitHubAPI({
    endpoint,
  })

  const docs: NextDoc[] = []
  const job = response.map(async ({ type, name, url, html_url, path, sha }) => {
    if (type === 'file' && name.endsWith('.mdx')) {
      const file = await fetchGitHubAPI({
        url,
      })
      const content = Buffer.from(file.content, file.encoding).toString('utf-8')
      const embeddings = await generateEmbeddings(content)
      for (const embedding of embeddings) {
        docs.push({
          docUrl: html_url,
          prodUrl:
            docType === 'errors'
              ? await errorPathToProdURL(path)
              : await docPathToProdURL(path),
          sha,
          embedding,
        })
      }
    } else if (type === 'dir') {
      docs.push(
        ...(await fetchNextDocs({
          endpoint: `/repos/vercel/next.js/contents/${path}`,
          docType,
        }))
      )
    } else {
      console.log(`Skipped ${name}`)
    }
  })

  await Promise.all(job)
  return docs
}

async function docs() {
  console.log('Fetching Next.js docs...')

  const start = Date.now()
  let docs: NextDoc[] = []
  try {
    docs = await fetchNextDocs({
      endpoint: '/repos/vercel/next.js/contents/docs',
      docType: 'docs',
    })
  } finally {
    console.log(`Finished fetching Next.js docs in ${Date.now() - start}ms`)
    await writeFile(
      join(process.cwd(), 'public', 'json', 'nextjs-docs.json'),
      JSON.stringify(docs)
    )
  }
}

async function errors() {
  console.log('Fetching Next.js error docs...')

  const start = Date.now()
  let docs: NextDoc[] = []
  try {
    docs = await fetchNextDocs({
      endpoint: '/repos/vercel/next.js/contents/errors',
      docType: 'errors',
    })
  } finally {
    console.log(`Finished fetching Next.js errors in ${Date.now() - start}ms`)
    await writeFile(
      join(process.cwd(), 'public', 'json', 'nextjs-errors.json'),
      JSON.stringify(docs)
    )
  }
}

docs().catch(console.error)
errors().catch(console.error)
