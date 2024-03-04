import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="p-6">
      <ul className="flex justify-center space-x-4">
        {[
          ['bio', '/'],
          ['proj', '/projects'],
          ['blog', '/blog'],
        ].map(([title, url]) => (
          <li key={title}>
            <Link
              className="font-medium text-neutral-200 hover:text-neutral-50 hover:underline"
              href={url}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
