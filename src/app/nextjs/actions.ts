'use server'
import type { CoreMessage } from 'ai'
import pgvector from 'pgvector/pg'
import { openai } from '@ai-sdk/openai'
import { sql } from '@vercel/postgres'
import { embed, streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export async function continueConversation(messages: CoreMessage[]) {
  const lastMessage = messages[messages.length - 1]?.content as string

  const embedding = await generateEmbedding(lastMessage)
  const vectorQuery = `${pgvector.toSql(embedding)}`

  const { rows } = await sql`
    SELECT * FROM docs
    ORDER BY embedding <-> ${vectorQuery}
    LIMIT 8
  `

  const relevantDocs = rows.map((row) => row.content).join(' ')
  const references = rows.map((row) => row.prod_url).join(' ')
  const prompt = `
    As an enthusiastic Next.js expert keen to assist,
    respond to questions referencing the given Next.js
    sections.

    If unable to help based on documentation, respond
    with: "Sorry, I don't know how to help with that."
    
    Conversation History: """
    ${messages.map((msg) => `${msg.role}: ${msg.content}`).join(' ')}
    """
    
    Related Documents: """
    ${relevantDocs}
    """

    Possible References: """
    ${references}
    """

    If the possible references are related to the question,
    list all references at the end of your response as follows: """
    References:
    - [Possible Reference Title 1](url1)
    - [Possible Reference Title 2](url2)
    """

    Question: """
    ${lastMessage}
    """

    Continue the conversation in a coherent and contextually relevant manner:
  `.replaceAll('\n', ' ')

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: [{ role: 'system', content: prompt }],
  })

  // Create a streamable value from the result
  const stream = createStreamableValue(result.textStream)

  // Return the streamable value
  return stream.value
}

async function generateEmbedding(raw: string) {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = raw.replaceAll('\n', ' ')
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-ada-002'),
    value: input,
  })
  return embedding
}
