import Link from 'next/link'

export function Footer() {
  return (
    <footer className="p-6">
      <div>
        <Link href="mailto:devjiwonchoi@gmail.com">
          <span className="text-sm text-neutral-400 sm:text-sm">
            © 2023 devjiwonchoi
          </span>
        </Link>
      </div>
    </footer>
  )
}
