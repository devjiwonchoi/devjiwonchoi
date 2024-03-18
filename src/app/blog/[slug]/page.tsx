import { unstable_cache as cache } from 'next/cache'
import { Suspense } from 'react'
import { CustomMDX } from '@/components/mdx/components'
import { ViewCounter } from '@/components/mdx/view-counter'
import { getDocs } from '@/utils/mdx/get-docs'
import { incrementView, getViewsCount } from '@/utils/mdx/get-views'
import { getIdFromSlug, isInvalidId } from '@/utils/mdx/utils'
import type { Blog, BlogList } from '@/utils/types'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const id = getIdFromSlug(slug)
  if (!id || isInvalidId(id)) {
    throw new Error(`Invalid ID: "${id}"`)
  }

  const { title, content, date, readTime } = (await getDocs({
    type: 'blog',
    slug,
  })) as Blog

  return (
    <main className="mb-auto flex justify-center p-6">
      <article>
        <header>
          <h1 className="title mb-2 text-2xl font-medium tracking-tighter md:text-3xl">
            {title}
          </h1>
          <section className="mb-4 flex space-x-2">
            <p className="text-sm text-neutral-400">{date}</p>
            <span className="text-sm text-neutral-400">•</span>
            <p className="text-sm text-neutral-400">{readTime} min read</p>
            <span className="text-sm text-neutral-400">•</span>
            <Suspense
              fallback={<p className="text-sm text-neutral-400">0 views</p>}
            >
              <Views id={id} />
            </Suspense>
          </section>
        </header>
        <section className="prose prose-neutral prose-quoteless dark:prose-invert">
          <CustomMDX source={content} />
        </section>
      </article>
    </main>
  )
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const id = getIdFromSlug(slug)
  if (!id || isInvalidId(id)) {
    throw new Error('Invalid ID')
  }

  const { title, description, tags } = (await getDocs({
    type: 'blog',
    slug,
  })) as Blog
  return {
    title,
    description,
    keywords: tags,
  }
}

export const generateStaticParams = async () =>
  ((await getDocs({ type: 'blog' })) as BlogList).map(({ slug }) => ({ slug }))

const incrementViews = cache(incrementView)
async function Views({ id }: { id: string }) {
  const views = await getViewsCount()
  incrementViews(id)
  return <ViewCounter allViews={views} id={id} />
}
