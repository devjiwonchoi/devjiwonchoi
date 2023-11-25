import Link from 'next/link'

export function NavBar({
  dict: {
    nav,
    metadata: { locale },
  },
}: {
  dict: typeof import('@/dictionaries/en.json')
}) {
  const lang = locale === 'en-US' ? '/' : `/${locale.split('-')[0]}/`

  return (
    <nav className="p-6">
      <ul className="flex justify-center space-x-4">
        {[
          [nav.bio, `${lang}`],
          [nav.blog, `${lang}blog`],
          // nav.proj, `${lang}projects`],
          [nav.req, `${lang}request`],
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
