import dynamic from 'next/dynamic'

const Terminal = dynamic(
  async () => (await import('@/components/terminal')).Terminal,
  {
    ssr: false,
  },
)

export default function Landing() {
  return (
    <main className="mb-auto p-6">
      <Terminal />
    </main>
  )
}
