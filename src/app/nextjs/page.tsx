import { SignIn } from '@/components/sign-in'
import { auth } from '@/utils/auth'
import { Chat } from './chat'

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = 'force-dynamic'
export const maxDuration = 30

export default async function Nextjs() {
  const session = await auth()
  if (!session || (session as any).message) return <SignIn />
  return <Chat />
}
