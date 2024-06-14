import { SignInButton, SignedOut } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { Chat } from './chat'

export const maxDuration = 30

export default async function Nextjs() {
  const { userId }: { userId: string | null } = auth()
  if (!userId)
    return (
      <main className="mb-auto">
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </main>
    )

  return (
    <main className="mb-auto">
      <Chat />
    </main>
  )
}
