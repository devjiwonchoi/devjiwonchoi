import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  const thisYear = new Date().getUTCFullYear()
  return (
    <footer className="flex justify-between p-6">
      <div className="text-sm tracking-tight text-neutral-400 sm:text-sm">
        © {thisYear} devjiwonchoi
      </div>
      <div className="flex items-center space-x-5">
        {/* GitHub */}
        <Link
          href="https://github.com/devjiwonchoi"
          target="_blank"
          aria-label="Jiwon Choi's GitHub Profile"
          className="inline-block"
        >
          <Image
            src="/images/github-mark-white.svg"
            alt="GitHub Logo"
            width={28}
            height={28}
            className="h-7 w-7 opacity-80 transition delay-150 ease-in-out hover:opacity-100"
          />
        </Link>
        {/* Gmail */}
        <Link
          href="mailto:devjiwonchoi@gmail.com"
          aria-label="Jiwon Choi's Gmail Address"
          className="inline-block"
        >
          <Image
            src="/images/gmail-2020.svg"
            alt="Gmail Logo"
            width={28}
            height={28}
            className="h-7 w-7 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100"
          />
        </Link>
        {/* Twitter */}
        <Link
          href="https://twitter.com/devjiwonchoi"
          target="_blank"
          aria-label="Jiwon Choi's Twitter Profile"
          className="inline-block"
        >
          <Image
            src="/images/x-logo.svg"
            alt="Twitter Logo"
            width={28}
            height={28}
            className="h-6 w-6 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100"
          />
        </Link>
        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/in/devjiwonchoi"
          target="_blank"
          aria-label="Jiwon Choi's LinkedIn Profile"
          className="inline-block"
        >
          <Image
            src="/images/linkedin-logo.svg"
            alt="LinkedIn Logo"
            width={28}
            height={28}
            className="h-6 w-6 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100"
          />
        </Link>
      </div>
    </footer>
  )
}
