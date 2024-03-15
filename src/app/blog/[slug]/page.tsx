import { readFile } from 'fs/promises'
import { join } from 'path'
import { notFound } from 'next/navigation'
import postsJson from 'public/_mdx-posts.json' with { type: 'json' }
import { CustomMDX } from '@/components/mdx/components'
import type { BlogPost } from '@/utils/types'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const id = slug.split('-').pop()
  const { title, content }: BlogPost = JSON.parse(
    await readFile(
      join(process.cwd(), 'public', `_mdx-post-${id}.json`),
      'utf-8',
    ),
  )

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
  const res = await fetch(`${process.env.API_URL}/blog/${slug}`)
  const { title, description }: BlogPost = await res.json()

  return {
    title,
    description,
  }
}

export const generateStaticParams = () =>
  postsJson.map(({ slug }) => ({ slug }))
