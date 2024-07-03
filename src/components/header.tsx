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
          href="https://jiw.one/git"
          target="_blank"
          aria-label="Jiwon Choi's GitHub Profile"
          className="inline-block"
        >
          <Image
            src="/github-mark-white.svg"
            width={24}
            height={24}
            alt="GitHub Logo"
            className=""
          />
        </Link>
        {/* X */}
        <Link
          href="https://jiw.one/x"
          target="_blank"
          aria-label="Jiwon Choi's X Profile"
          className="inline-block"
        >
          <Image
            src="/x-logo.svg"
            width={20}
            height={20}
            alt="X Logo"
            className="invert"
          />
        </Link>
      </div>
    </header>
  )
}
