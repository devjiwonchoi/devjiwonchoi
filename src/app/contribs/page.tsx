import Link from 'next/link'
import { contribs } from '@/lib/contribs'

export default function Contribs() {
  return (
    <main className="p-6 mb-auto">
      <article className="space-y-8">
        <h2 className="text-neutral-100 text-xl mb-4 sm:text-2xl">
          Contributions (Pulls)
        </h2>
        {contribs.map(({ projectName, projectHref, pulls }) => (
          <ul key={projectName}>
            <li className="text-neutral-200 text-lg mb-2 sm:text-xl">
              <Link href={projectHref} target="_blank">
                {projectName}
              </Link>
            </li>
            <ul>
              <li className="text-neutral-300 text-base space-x-2">
                {pulls.map(({ pullNum, pullHref }) => (
                  <Link
                    key={pullNum}
                    href={pullHref}
                    className="hover:text-neutral-50"
                  >
                    #{pullNum}
                  </Link>
                ))}
              </li>
            </ul>
          </ul>
        ))}
      </article>
    </main>
  )
}
