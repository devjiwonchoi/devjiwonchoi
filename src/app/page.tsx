'use client'
import useMediaQuery from '@/hooks/use-media-query'
import dynamic from 'next/dynamic'

const Terminal = dynamic(
  async () => (await import('@/components/terminal')).Terminal,
  {
    ssr: false,
    loading: () => (
      <div className="hidden h-[496px] rounded bg-neutral-900 p-2 md:block">
        <div
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
    ),
  },
)

export default function Landing() {
  // import terminal conditionally based on screen size
  const isMd = useMediaQuery('(min-width: 768px)')
  return <main className="mb-auto p-6">{isMd && <Terminal />}</main>
}
