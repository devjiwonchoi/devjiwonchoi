'use client'
import { useSession } from 'next-auth/react'
import { AuthForm, RequestForm } from '@/components'

export default function Request() {
  const { data: session, status } = useSession()
  const { email } = session?.user || {}
  return (
    <main className="p-6 mb-auto">
      {status === 'authenticated' && email ? (
        <RequestForm email={email} />
      ) : (
        <AuthForm />
      )}
    </main>
  )
}
