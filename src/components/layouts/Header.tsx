import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex justify-between p-6">
      <Link href="/">
        <Image
          alt="devjiwonchoi Logo"
          className="w-8 opacity-80 transition delay-150 ease-in-out hover:opacity-100"
          src="/me-logo.svg"
          width={0}
          height={0}
          priority
        />
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          aria-label="devjiwonchoi's GitHub Profile"
          className="inline-block"
          href="https://github.com/devjiwonchoi"
          target="_blank"
        >
          <Image
            alt="GitHub Logo"
            className="h-7 w-7 opacity-80 transition delay-150 ease-in-out hover:opacity-100"
            height={0}
            src="/github-mark-white.svg"
            width={0}
          />
        </Link>
        <Link
          aria-label="devjiwonchoi's Gmail Address"
          className="inline-block"
          href="mailto:devjiwonchoi@gmail.com"
        >
          <Image
            alt="Gmail Logo"
            className="h-7 w-7 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100"
            height={0}
            src="/gmail-2020.svg"
            width={0}
          />
        </Link>
      </div>
    </header>
  )
}
