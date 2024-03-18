import Link from 'next/link'
import { Suspense } from 'react'
import { ViewCounter } from '@/components/mdx/view-counter'
import { getDocs } from '@/utils/mdx/get-docs'
import { getViewsCount } from '@/utils/mdx/get-views'
import type { BlogList } from '@/utils/types'

export default async function Blog() {
  const posts = (await getDocs({ type: 'blog' })) as BlogList
  return (
    <main className="mb-auto p-6">
      {posts.map(({ id, date, readTime, slug, tags, title, description }) => {
        return (
          <Link key={id} href={`/blog/${slug}`}>
            <article className="mb-2 bg-neutral-900 p-6 hover:bg-neutral-800">
              <h3 className="text-lg tracking-tight text-neutral-100 md:text-xl">
                {title}
              </h3>
              <p className="text-sm text-neutral-300">{description}</p>
              <div className="flex space-x-2">
                <p className="text-sm text-neutral-400">{date}</p>
                <span className="text-sm text-neutral-400">•</span>
                <p className="text-sm text-neutral-400">{readTime} min read</p>
                <span className="text-sm text-neutral-400">•</span>
                <Suspense
                  fallback={<p className="text-sm text-neutral-400">0 views</p>}
                >
                  <Views id={id} />
                </Suspense>
              </div>

              {tags.map((tag) => (
                <span
                  className="mr-2 mt-2 inline-block rounded bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-100"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </article>
          </Link>
        )
      })}
    </main>
  )
}

const description =
  'Compilation of troubleshoots, solutions, and endeavors to structure thoughts across various topics by Jiwon Choi.'

export const metadata = {
  title: "Jiwon Choi's Blog",
  description,
}

async function Views({ id }: { id: string }) {
  const views = await getViewsCount()
  return <ViewCounter allViews={views} id={id} />
}
