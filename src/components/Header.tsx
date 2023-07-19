import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-4 sm:mb-8">
      <div className="flex justify-between p-6">
        <Link href="/">
          <span className="text-neutral-200 text-lg font-extralight hover:text-[#fff] transition ease-in-out delay-150 sm:text-2xl">
            @devjiwonchoi
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/devjiwonchoi"
            target="_blank"
            aria-label="devjiwonchoi's GitHub Profile"
            className="inline-block"
          >
            <Image
              src="/github-mark-white.svg"
              alt="GitHub Logo"
              width={0}
              height={0}
              className="w-7 h-7 opacity-80 hover:opacity-100 transition ease-in-out delay-150"
            />
          </Link>
          <Link
            href="mailto:devjeanmarlon@gmail.com"
            aria-label="devjiwonchoi's Gmail Address"
            className="inline-block"
          >
            <Image
              src="/gmail-2020.svg"
              alt="Gmail Logo"
              width={0}
              height={0}
              className="w-7 h-7 opacity-80 hover:opacity-100 transition ease-in-out delay-150 filter brightness-0 invert"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
