import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="sm:mb-6">
      <div className="flex justify-between p-6">
        <Link href="/">
          <span className="text-neutral-200 text-lg font-extralight hover:text-[#fff] transition ease-in-out delay-100 sm:text-2xl">
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
              width={30}
              height={30}
              className="opacity-80 hover:opacity-100 transition ease-in-out delay-100"
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
              width={30}
              height={30}
              className="opacity-80 hover:opacity-100 transition ease-in-out delay-100 filter brightness-0 invert"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}
