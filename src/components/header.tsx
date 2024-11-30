import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="my-4 flex justify-between">
      <div className="flex w-fit flex-col">
        <Link href="/" title="home">
          <span className="text-2xl font-bold">Jiwon Choi</span>
        </Link>
        <Link href="https://vercel.com/home" title="▲ Vercel">
          <span className="text-neutral-200">Engineer ▲ Vercel</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* GitHub */}
        <Link
          href="https://github.com/devjiwonchoi"
          target="_blank"
          aria-label="Jiwon Choi's GitHub Profile"
          className="inline-block"
        >
          <Image
            src="/github.svg"
            width={24}
            height={24}
            alt="GitHub Logo"
            className=""
          />
        </Link>
        {/* Vercel Community */}
        <Link
          href="https://vercel.community/u/devjiwonchoi/summary"
          target="_blank"
          aria-label="Jiwon Choi's Vercel Community Profile"
          className="inline-block"
        >
          <Image
            src="/vercel.svg"
            width={25}
            height={25}
            alt="Vercel Logo"
            className="invert"
          />
        </Link>
      </div>
    </header>
  )
}
