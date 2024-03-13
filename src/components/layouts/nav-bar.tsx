'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

export function NavBar() {
  const pathname = usePathname()
  return (
    <nav className="p-6">
      <ul className="flex justify-center space-x-6">
        {[
          ['::1', '/'],
          ['bio', '/biography'],
          ['proj', '/projects'],
          ['blog', '/blog'],
        ].map(([title, url]) => (
          <li key={title}>
            <Link
              className={clsx(
                // by default, highlight and underline on hover
                'font-medium hover:text-neutral-50 hover:underline',
                {
                  // for `::1`, tight font spacing
                  'tracking-tighter': url === '/',
                  // highlight and underline the current page
                  'text-neutral-200': pathname !== url,
                  'text-neutral-50': pathname === url,
                  underline: pathname === url,
                },
              )}
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
