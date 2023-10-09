import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { AuthForm, RequestForm } from '@/components'
import { authOptions } from '@/lib'

export const metadata: Metadata = {
  title: 'Request | Jiwon Choi',
  description: 'Send a work request, question, or comment to Jiwon Choi',
}

export default async function Request() {
  const session = await getServerSession(authOptions)

  return (
    <main className="mb-auto p-6">
      {session ? <RequestForm email={session.user?.email} /> : <AuthForm />}
    </main>
  )
}
