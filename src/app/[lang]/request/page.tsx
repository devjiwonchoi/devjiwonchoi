import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { AuthForm, RequestForm } from '@/components'
import { getDictionary } from '@/dictionaries/i18n'
import { authOptions } from '@/utils'

export const metadata: Metadata = {
  title: 'Request',
  description: 'Send a work request, question, or comment to Jiwon Choi',
}

export default async function Request({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const session = await getServerSession(authOptions)
  const dictionary = await getDictionary(lang)

  return (
    <main className="mb-auto p-6">
      {session ? (
        <RequestForm email={session.user?.email} dictionary={dictionary} />
      ) : (
        <AuthForm dictionary={dictionary} />
      )}
    </main>
  )
}
