import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx/components'
import { getPost, getPosts } from '@/utils/mdx/get-posts'
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

  const { title, content }: BlogPost = await getPost({ id })

  if (!content) {
    notFound()
  }

  return (
    <>
      <h1 className="title text-2xl font-medium tracking-tighter">{title}</h1>
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

  const { title, description }: BlogPost = await getPost({ id })
  return {
    title,
    description,
  }
}

export const generateStaticParams = async () =>
  (await getPosts()).map(({ slug }) => ({ slug }))
