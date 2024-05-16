import Image from 'next/image'
import Link from 'next/link'
import meLogo from 'public/img/me-logo.svg'

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" title="link back home">
          <Image
            src={meLogo}
            alt="Jiwon Choi's Logo"
            className="h-8 w-8"
            priority
          />
        </Link>
      </div>
    </header>
  )
}
