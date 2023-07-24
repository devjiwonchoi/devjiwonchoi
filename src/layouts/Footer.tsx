import Link from 'next/link'

export function Footer() {
  return (
    <footer className="p-6">
      <div>
        <Link href="mailto:devjiwonchoi@gmail.com">
          <span className="text-neutral-400 text-sm sm:text-sm">
            © 2023 devjiwonchoi
          </span>
        </Link>
      </div>
    </footer>
  )
}
