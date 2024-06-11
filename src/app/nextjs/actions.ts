'use server'
import type { CoreMessage } from 'ai'
import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    messages,
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}
