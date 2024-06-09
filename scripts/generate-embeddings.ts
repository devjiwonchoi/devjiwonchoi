import type { Embedding } from 'ai'
import { openai } from '@ai-sdk/openai'
import { embedMany } from 'ai'

function splitContentByHeadings(content: string): string[] {
  const headings = content.match(/^#+\s.+/gm)
  if (!headings) return [content]
  const sections: string[] = []
  let start = 0
  for (const heading of headings) {
    const index = content.indexOf(heading, start)
    sections.push(content.slice(start, index))
    start = index
  }
  sections.push(content.slice(start))
  // OpenAI recommends replacing newlines with spaces for best results when generating embeddings
  return sections.map((section) => section.replace(/\n/g, ' ')).filter(Boolean)
}

export async function generateEmbeddings(
  content: string
): Promise<Embedding[]> {
  const splittedContents = splitContentByHeadings(content)

  const { embeddings } = await embedMany({
    model: openai.embedding('text-embedding-ada-002'),
    values: splittedContents,
  })
  return embeddings.flat() as unknown as Embedding[]
}
