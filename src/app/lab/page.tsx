'use client'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@/utils/hooks/use-media-query'

const Terminal = dynamic(
  async () => (await import('@/components/terminal')).Terminal,
  {
    ssr: false,
    loading: () => <LoadingTerminal />,
  }
)

export default function Landing() {
  // import terminal conditionally based on screen size
  const isMd = useMediaQuery('(min-width: 768px)')
  return <main className="mb-auto">{isMd && <Terminal />}</main>
}

// TODO: Is this really unable to be in a separate file?
const LoadingTerminal = () => (
  <div className="hidden h-[496px] rounded bg-neutral-900 p-2 md:block">
    <div
      id="loading-terminal"
      style={{
        width: '674px',
        height: '24px',
        lineHeight: '24px',
        overflow: 'hidden',
        color: '#fafafa',
        fontSize: '14px',
        fontFamily: 'Geist Mono, monospace',
      }}
    >
      <span>Initiating Terminal...</span>
    </div>
  </div>
)
