'use client'

import { useChat } from '@ai-sdk/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'api/nextjs',
  })
  return (
    <div className="stretch mx-auto mb-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}
