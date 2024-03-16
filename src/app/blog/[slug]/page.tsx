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

  const { title, content }: BlogPost = await getPost({ id, slug })

  if (!content) {
    notFound()
  }

  return (
    <>
      <h1 className="title text-2xl font-medium tracking-tighter">{title}</h1>
      <Suspense fallback={<p className="h-5" />}>
        <Views id={id} />
      </Suspense>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={content} />
      </article>
    </>
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

  const { title, description }: BlogPost = await getPost({ id, slug })
  return {
    title,
    description,
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