import { getServerSession } from 'next-auth/next'
import { AuthForm, RequestForm } from '@/components'
import { authOptions } from '@/lib'

export default async function Request() {
  const session = await getServerSession(authOptions)

  return (
    <main className="p-6 mb-auto">
      {session ? <RequestForm email={session.user?.email} /> : <AuthForm />}
    </main>
  )
}
