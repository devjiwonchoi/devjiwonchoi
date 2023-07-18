import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-6 mb-auto">
      <article className="mb-8">
        <h1 className="text-neutral-200 text-2xl mb-4 sm:text-3xl sm:mb-6">
          Me, Myself, and I
        </h1>
        <blockquote className="text-neutral-400 italic border-l-2 border-solid border-neutral-500 pl-2.5 mb-6">
          &quot;Don&apos;t let the comment speak for your code.&quot; - Jiwon
          Choi
        </blockquote>
        <p className="text-neutral-300 text-sm sm:text-base">
          <span className="text-neutral-50">
            Efficiency-Driven Developer, Refactoring Factory, and an Open
            Sourcerer.
          </span>{' '}
          My current concentration is Web Development with{' '}
          <span className="text-neutral-50">Next.js.</span> I am immersed into
          the JavaScript ecosystem with a wetsuit named{' '}
          <span className="text-neutral-50">TypeScript.</span>
        </p>
      </article>
      <article className="mb-8">
        <h1 className="text-neutral-200 text-2xl mb-4 sm:text-3xl sm:mb-6">
          Goal & Interests
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base">
          My goal in development is to{' '}
          <span className="text-neutral-50">
            <strong>save time and effort for peer developers</strong>
          </span>
          , as I believe it will ultimately help making the world a better place
          to live. Therefore I am also interested in{' '}
          <span className="text-neutral-50">
            DevOps, Documentation, People Management, and developing tools like
            compilers.
          </span>
        </p>
      </article>
      <article className="mb-8">
        <h1 className="text-neutral-200 text-2xl mb-4 sm:text-3xl sm:mb-6">
          Dependencies
        </h1>
        <p className="text-neutral-300 text-sm sm:text-base">
          I&apos;m personally into <span className="text-neutral-50">BJJ</span>,
          practicing in a gym called &quot;John Frankl Sinsa&quot;, the first
          BJJ gym opened in Korea where I am currently residing. Also, a
          beginner in <span className="text-neutral-50">chess</span>, feel free
          to add me on chess.com by{' '}
          <Link
            href="https://www.chess.com/member/devjiwonchoi"
            target="_blank"
          >
            @devjiwonchoi
          </Link>
          .
        </p>
      </article>
    </main>
  )
}
