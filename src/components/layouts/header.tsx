import Image from 'next/image'
import meLogo from 'public/images/me-logo.svg'

export function Header() {
  return (
    <header className="flex flex-col items-center pt-12 md:pt-20">
      <Image
        src={meLogo}
        alt="Jiwon Choi Logo"
        className="h-20 w-20"
        priority
      />
      <h1 className="mb-4 text-4xl font-bold text-neutral-50 sm:text-4xl">
        Jiwon Choi
      </h1>
      <h2 className="uppercase tracking-widest text-neutral-50">
        software engineer
      </h2>
    </header>
  )
}
