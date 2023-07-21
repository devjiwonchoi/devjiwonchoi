import { RequestForm } from '@/components'
export default function Request() {
  const handleSubmit = async () => {
    'use server'
  }

  return (
    <main className="p-6 mb-auto">
      <h2 className="mb-6 text-neutral-100 text-2xl tracking-tight font-bold sm:text-3xl">
        Request
      </h2>
      <RequestForm handleSubmit={handleSubmit} />
    </main>
  )
}
