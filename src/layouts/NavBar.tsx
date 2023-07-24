import Link from 'next/link'

export function NavBar() {
  return (
    <nav className="p-6">
      <ul className="flex justify-center space-x-4">
        {[
          ['Bio', '/'],
          ['Contribs', '/contributions'],
          ['Certs', '/certifications'],
          ['Req', '/request'],
        ].map(([title, url]) => (
          <li key={title}>
            <Link
              href={url}
              className={
                title === 'Certs'
                  ? 'text-neutral-500 font-medium line-through pointer-events-none'
                  : 'text-neutral-200  font-medium hover:underline hover:text-neutral-50'
              }
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
