import { getServerSession } from 'next-auth/next'
import { AuthForm, RequestForm } from '@/components'
import { authOptions } from '@/lib'

export default async function Request() {
  const session = await getServerSession(authOptions)

  return (
    <main className="mb-auto p-6">
      {session ? <RequestForm email={session.user?.email} /> : <AuthForm />}
    </main>
  )
}
