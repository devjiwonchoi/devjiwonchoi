import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-6 mb-auto">
      <section>
        <article className="mb-6">
          <blockquote className="text-neutral-400 italic border-l-2 border-solid border-neutral-500 pl-2.5 mb-6">
            &quot;Don&apos;t let the comment speak for your code.&quot; - Jiwon
            Choi
          </blockquote>
          <h2 className="text-neutral-200 text-xl mb-4 sm:text-2xl">
            Efficiency-Driven Developer
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            My current concentration is Web Development with{' '}
            <span className="text-neutral-50">Next.js</span>, and contribution
            to the open-source community.
          </p>
          <p className="text-neutral-300 text-sm sm:text-base">
            I am immersed into the JavaScript ecosystem with a wetsuit called{' '}
            <span className="text-neutral-50">TypeScript</span>.
          </p>
          <p className="text-neutral-300 text-sm sm:text-base">
            I love to automate, document, and minimalize the development process
            to leave the essentials only.
          </p>
          <p className="text-neutral-300 text-sm sm:text-base">
            My codes are written to be understandable with less descriptive
            comments as possible.
          </p>
        </article>
        <article className="mb-6">
          <h2 className="text-neutral-200 text-xl mb-4 sm:text-2xl">
            Goal & Interests
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            My goal in development is to{' '}
            <strong>save time and effort for peer developers</strong>, as I
            believe it will ultimately help making the world a better place to
            live.
          </p>
          <p className="text-neutral-300 text-sm sm:text-base">
            Therefore I am interested in{' '}
            <span className="text-neutral-50">
              DevOps, Documentation, People Management, and developing tools
              like compilers.
            </span>
          </p>
        </article>
        <article className="mb-6">
          <h2 className="text-neutral-200 text-xl mb-4 sm:text-2xl">
            Dependencies
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base">
            Rest of the time other than coding, I am personally into{' '}
            <span className="text-neutral-50">BJJ</span>, practicing at
            &quot;John Frankl Sinsa&quot;, the first BJJ gym opened in Seoul,
            Korea where I am currently residing. Also, I am a beginner in{' '}
            <span className="text-neutral-50">chess</span>, feel free to add me
            on chess.com by{' '}
            <Link
              href="https://www.chess.com/member/devjiwonchoi"
              target="_blank"
            >
              @devjiwonchoi
            </Link>
            .
          </p>
        </article>
        <article>
          <h2 className="text-neutral-200 text-xl mb-4 sm:text-2xl">
            Contributions
          </h2>
          <ul>
            <li className="text-neutral-200 text-sm sm:text-base mb-2 sm:mb-4">
              - Next.js:{' '}
              <Link
                href="https://github.com/vercel/next.js/pull/51104"
                target="_blank"
                className="text-neutral-50"
              >
                #51104
              </Link>{' '}
              <Link
                href="https://github.com/vercel/next.js/pull/51148"
                target="_blank"
                className="text-neutral-50"
              >
                #51148
              </Link>
            </li>
            <li className="text-neutral-200 text-sm sm:text-base mb-2 sm:mb-4">
              - TypeScript:{' '}
              <Link
                href="https://github.com/microsoft/TypeScript/pull/54871"
                target="_blank"
                className="text-neutral-50"
              >
                #54871
              </Link>
            </li>
            <li className="text-neutral-200 text-sm sm:text-base mb-2 sm:mb-4">
              - Bunchee:{' '}
              <Link
                href="https://github.com/huozhi/bunchee/pull/229"
                target="_blank"
                className="text-neutral-50"
              >
                #229
              </Link>{' '}
              <Link
                href="https://github.com/huozhi/bunchee/pull/230"
                target="_blank"
                className="text-neutral-50"
              >
                #230
              </Link>{' '}
              <Link
                href="https://github.com/huozhi/bunchee/pull/232"
                target="_blank"
                className="text-neutral-50"
              >
                #232
              </Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  )
}
