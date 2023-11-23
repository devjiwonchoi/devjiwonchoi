import type { Metadata } from 'next'
import Link from 'next/link'
import { contribs } from '@/utils/contribs'

export const metadata: Metadata = {
  title: 'Contributions | Jiwon Choi',
  description: "Jiwon Choi's contributions to open source projects",
}

export default function Contribs() {
  return (
    <main className="mb-auto p-6">
      <article className="space-y-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
          Contributions (Pulls)
        </h2>
        {contribs.map(({ projectName, projectHref, pulls }) => (
          <ul key={projectName}>
            <li className="mb-2 text-lg text-neutral-200 sm:text-xl">
              <Link href={projectHref} target="_blank">
                {projectName}
              </Link>
            </li>
            <ul>
              <li className="space-x-2 text-base text-neutral-300">
                {pulls.map(({ pullNum, pullHref }) => (
                  <Link
                    key={pullNum}
                    href={pullHref}
                    className="hover:text-neutral-50"
                    target="_blank"
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
