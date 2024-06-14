'use client'
import type { CoreMessage } from 'ai'
import { useState } from 'react'
import { readStreamableValue } from 'ai/rsc'
import { continueConversation } from './actions'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([])
  const [input, setInput] = useState('')
  return (
    <div className="flex w-full max-w-md flex-col">
      {messages.map((m, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content as string}
        </div>
      ))}

      <form
        action={async () => {
          const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: 'user' },
          ]

          setMessages(newMessages)
          setInput('')

          const result = await continueConversation(newMessages)

          for await (const content of readStreamableValue(result)) {
            if (!content) {
              setMessages([
                ...newMessages,
                {
                  role: 'assistant',
                  content: 'ERROR: NO_CONTENT',
                },
              ])
              continue
            }

            setMessages([
              ...newMessages,
              {
                role: 'assistant',
                content,
              },
            ])
          }
        }}
      >
        <div className="fixed inset-x-0 bottom-0 mb-16 flex w-full justify-center">
          <textarea
            className="border p-2"
            value={input}
            placeholder="Ask anything about Next.js!"
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button className="border p-2" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
