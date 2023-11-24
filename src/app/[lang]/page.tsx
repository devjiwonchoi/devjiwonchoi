import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'

export default function Bio({
  params: { lang },
}: {
  params: { lang: string }
}) {
  // ['en-US', 'en;q=0.9'] -> 'en-US'
  const primaryLang = headers().get('Accept-Language')?.split(',')[0]
  const isPrimaryLang = primaryLang ? validateLang(primaryLang, lang) : false
  //TODO: if !isPrimaryLang, suggest to redirect to primaryLang
  return (
    <main className="mb-auto p-6">
      <article className="mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          Biography
        </h2>
        <blockquote className="mb-6 border-l-2 border-solid border-neutral-500 pl-2.5 italic text-neutral-400">
          &quot;Don&apos;t let the comment speak for your code.&quot; - Jiwon
          Choi
        </blockquote>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          DevLife
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          I am a software developer who loves to{' '}
          <strong className="text-neutral-50">
            automate, simplify, and troubleshoot.
          </strong>
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          My current concentration is contributing to open-source projects such
          as{' '}
          <Link
            href="https://github.com/vercel/next.js"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            Next.js
          </Link>
          ,{' '}
          <Link
            href="https://github.com/microsoft/TypeScript"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            TypeScript
          </Link>
          , and{' '}
          <Link
            href="https://github.com/huozhi/bunchee"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            Bunchee
          </Link>
          .
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          Ambition
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          I believe that{' '}
          <strong className="text-neutral-50">
            saving time for developers and end users
          </strong>{' '}
          is the key to the success of the product.
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          In the near future, I will become a software engineer who feels
          confident in writing time-saving codes.
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          I will be one of the leading engineers who can{' '}
          <strong className="text-neutral-50">
            inspire people and positively influence
          </strong>{' '}
          others.
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          Dependencies
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          Apart from coding, I enjoy playing{' '}
          <Link
            href="https://en.wikipedia.org/wiki/Brazilian_jiu-jitsu"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            BJJ
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            Chess
          </Link>
          .
        </p>
      </article>
      <article>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          Certifications & Awards
        </h3>
        <ul className="list-inside list-disc text-neutral-200">
          <li>
            <Link
              href="https://www.credly.com/badges/acf8b0bc-2952-4ee1-ac3b-7ab91478ddbb"
              target="_blank"
              className="underline hover:text-neutral-50"
            >
              AWS Certified Developer - Associate
            </Link>
          </li>
          <li>
            <Link
              href="https://en.wikipedia.org/wiki/Commendation_Medal"
              target="_blank"
              className="underline hover:text-neutral-50"
            >
              US Army Commendation Medal
            </Link>{' '}
            x 2
          </li>
        </ul>
      </article>
    </main>
  )
}

function validateLang(primaryLang: string, lang: string) {
  if (primaryLang.includes('-')) {
    // ko-KR -> ko; zh-CN -> zh
    primaryLang = primaryLang.split('-')[0]
  }

  return primaryLang === lang
}

export const metadata: Metadata = {
  description:
    'Code Minimalist as a DevOps Developer. Focusing on Efficiency Driven Development',
  openGraph: {
    url: '/',
  },
  keywords: [
    'Jiwon Choi',
    'Jiwon',
    'Choi',
    'devjiwonchoi',
    'jiwonchoi.dev',
    'DevOps',
    'Developer',
  ],
}
