import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { getDictionary } from '@/dictionaries/i18n'

export default async function Bio({
  params: { lang },
}: {
  params: { lang: string }
}) {
  // ['en-US', 'en;q=0.9'] -> 'en-US'
  const primaryLang = headers().get('Accept-Language')?.split(',')[0]
  const isPrimaryLang = primaryLang ? validateLang(primaryLang, lang) : false
  //TODO: if !isPrimaryLang, suggest to redirect to primaryLang

  const dictionary = await getDictionary(lang)
  return (
    <main className="mb-auto p-6">
      <article className="mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
          {dictionary.bio.h2}
        </h2>
        <blockquote className="mb-6 border-l-2 border-solid border-neutral-500 pl-2.5 italic text-neutral-400">
          &quot;{dictionary.bio.quote}&quot;
        </blockquote>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {dictionary.bio.h3_1}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_1}
          <strong className="text-neutral-50">{dictionary.bio.strong_1}</strong>
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_2}
          <Link
            href="https://github.com/vercel/next.js"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            {dictionary.common.nextjs}
          </Link>
          ,{' '}
          <Link
            href="https://github.com/microsoft/TypeScript"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            {dictionary.common.typescript}
          </Link>
          , {dictionary.common.and}{' '}
          <Link
            href="https://github.com/huozhi/bunchee"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            {dictionary.common.bunchee}
          </Link>
          .
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {dictionary.bio.h3_2}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_3_1}
          <strong className="text-neutral-50">{dictionary.bio.strong_2}</strong>
          {dictionary.bio.p_3_2}
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_4}
        </p>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_5_1}
          <strong className="text-neutral-50">{dictionary.bio.strong_3}</strong>
        </p>
      </article>
      <article className="mb-6">
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {dictionary.bio.h3_3}
        </h3>
        <p className="text-base text-neutral-200 sm:text-base">
          {dictionary.bio.p_6}
          <Link
            href="https://en.wikipedia.org/wiki/Brazilian_jiu-jitsu"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            {dictionary.common.bjj}
          </Link>{' '}
          {dictionary.common.and}{' '}
          <Link
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            {dictionary.common.chess}
          </Link>
          .
        </p>
      </article>
      <article>
        <h3 className="mb-4 text-xl font-bold tracking-tight text-neutral-200 sm:text-2xl">
          {dictionary.bio.h3_4}
        </h3>
        <ul className="list-inside list-disc text-neutral-200">
          <li>
            <Link
              href="https://www.credly.com/badges/acf8b0bc-2952-4ee1-ac3b-7ab91478ddbb"
              target="_blank"
              className="underline hover:text-neutral-50"
            >
              {dictionary.common.aws_cert_dev}
            </Link>
          </li>
          <li>
            <Link
              href="https://en.wikipedia.org/wiki/Commendation_Medal"
              target="_blank"
              className="underline hover:text-neutral-50"
            >
              {dictionary.common.arcom}
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
