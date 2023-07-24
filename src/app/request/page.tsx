'use client'
import { useSession } from 'next-auth/react'
import { AuthForm, RequestForm } from '@/components'
export default function Request() {
  const { data: session, status } = useSession()
  return (
    <main className="p-6 mb-auto">
      {status === 'authenticated' && session.user?.email ? (
        <RequestForm email={session.user?.email} />
      ) : (
        <AuthForm />
      )}
    </main>
  )
}
