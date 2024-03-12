'use client'
import useMediaQuery from '@/hooks/use-media-query'
import dynamic from 'next/dynamic'

const Terminal = dynamic(
  async () => (await import('@/components/terminal')).Terminal,
  {
    ssr: false,
  },
)

export default function Landing() {
  // import terminal conditionally based on screen size
  const isMd = useMediaQuery('(min-width: 768px)')
  return <main className="mb-auto p-6">{isMd && <Terminal />}</main>
}
