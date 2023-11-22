import Link from 'next/link'

export default function Bio() {
  return (
    <main className="jwc-main">
      <article className="jwc-article">
        <h2 className="jwc-h2">Biography</h2>
        <blockquote className="jwc-blockquote">
          &quot;Don&apos;t let the comment speak for your code.&quot; - Jiwon
          Choi
        </blockquote>
        <h3 className="jwc-h3">DevLife</h3>
        <p className="jwc-p">
          I enjoy to{' '}
          <strong className="jwc-strong">
            automate, document, and minimalize
          </strong>{' '}
          the development process, focusing on the essentials.
        </p>
        <p className="jwc-p">
          I write my code to be{' '}
          <strong className="jwc-strong">self-explanatory and precise</strong>,
          minimizing the need for extensive comments.
        </p>
      </article>
      <article className="jwc-article">
        <h3 className="jwc-h3">Goal & Interests</h3>
        <p className="jwc-p">
          I believe that{' '}
          <strong className="jwc-strong">
            saving time and effort for developers
          </strong>{' '}
          will eventually make the world a bit better place to live.
        </p>
        <p className="jwc-p">
          This is why I chose DevOps, and for the same reason I am interested in
          compilers.
        </p>
      </article>
      <article className="jwc-article">
        <h3 className="jwc-h3">Dependencies</h3>
        <p className="jwc-p">
          I am an{' '}
          <Link
            href="https://www.credly.com/badges/acf8b0bc-2952-4ee1-ac3b-7ab91478ddbb"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            AWS Certified Developer - Associate
          </Link>
          .
        </p>
        <p className="jwc-p">
          Apart from coding, I actively contribute to Next.js -{' '}
          <Link
            href="https://github.com/vercel/next.js/discussions"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            Discussions
          </Link>
          , and I also enjoy BJJ and{' '}
          <Link
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
            className="underline hover:text-neutral-50"
          >
            chess
          </Link>
          .
        </p>
      </article>
    </main>
  )
}
