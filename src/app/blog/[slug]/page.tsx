import { notFound } from 'next/navigation'
import { unstable_cache as cache } from 'next/cache'
import { Suspense } from 'react'
import { CustomMDX } from '@/components/mdx/components'
import { ViewCounter } from '@/components/mdx/view-counter'
import { getPost, getPosts } from '@/utils/mdx/get-posts'
import { incrementView, getViewsCount } from '@/utils/mdx/get-views'
import { getIdFromSlug, isInvalidId } from '@/utils/mdx/utils'
import type { BlogPost } from '@/utils/types'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const id = getIdFromSlug(slug)
  if (!id || isInvalidId(id)) {
    throw new Error('Invalid ID')
  }

  const { title, content, date, readTime }: BlogPost = await getPost({
    id,
    slug,
  })

  if (!content) {
    notFound()
  }

  return (
    <article>
      <header>
        <h1 className="title mb-2 text-2xl font-medium tracking-tighter">
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

  const { title, description, tags }: BlogPost = await getPost({ id, slug })
  return {
    title,
    description,
    keywords: tags,
  }
}

export const generateStaticParams = async () =>
  (await getPosts()).map(({ slug }) => ({ slug }))

const incrementViews = cache(incrementView)
async function Views({ id }: { id: string }) {
  const views = await getViewsCount()
  incrementViews(id)
  return <ViewCounter allViews={views} id={id} />
}
