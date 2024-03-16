import Image from 'next/image'

export function Header() {
  return (
    <header className="flex flex-col items-center pt-12 md:pt-20">
      <Image
        src="/images/me-logo.svg"
        alt="Jiwon Choi Logo"
        className="h-20 w-20"
        height={80}
        width={80}
        priority
      />
      <h1 className="mb-4 text-4xl font-bold text-neutral-50 sm:text-4xl">
        Jiwon Choi
      </h1>
      <p className="uppercase tracking-widest text-neutral-50">
        software engineer
      </p>
    </header>
  )
}
