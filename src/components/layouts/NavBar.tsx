import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="p-6">
      <ul className="flex justify-center space-x-4">
        {[
          ['Bio', '/'],
          ['Blog', '/blog'],
          // ['Proj', '/projects'],
          ['Req', '/request'],
        ].map(([title, url]) => (
          <li key={title}>
            <Link
              href={url}
              className="font-medium text-neutral-200 hover:text-neutral-50 hover:underline"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
