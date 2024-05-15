import Image from 'next/image'
import Link from 'next/link'
import githubLogo from 'public/img/github-mark-white.svg'
import gmailLogo from 'public/img/gmail-2020.svg'
import twitterLogo from 'public/img/x-logo.svg'
import linkedinLogo from 'public/img/linkedin-logo.svg'

export function Footer() {
  const thisYear = new Date().getUTCFullYear()
  return (
    <footer className="flex items-center justify-between">
      <div className="text-sm tracking-tight text-neutral-400">
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
            src={githubLogo}
            alt="GitHub Logo"
            className="h-6 w-6 opacity-80 transition delay-150 ease-in-out hover:opacity-100 md:h-7 md:w-7"
          />
        </Link>
        {/* Gmail */}
        <Link
          href="mailto:devjiwonchoi@gmail.com"
          aria-label="Jiwon Choi's Gmail Address"
          className="inline-block"
        >
          <Image
            src={gmailLogo}
            alt="Gmail Logo"
            className="h-6 w-6 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100 md:h-7 md:w-7"
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
            src={twitterLogo}
            alt="Twitter Logo"
            className="h-5 w-5 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100 md:h-6 md:w-6"
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
            src={linkedinLogo}
            alt="LinkedIn Logo"
            className="h-5 w-5 opacity-80 brightness-0 invert filter transition delay-150 ease-in-out hover:opacity-100 md:h-6 md:w-6"
          />
        </Link>
      </div>
    </footer>
  )
}
