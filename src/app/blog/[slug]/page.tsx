import { readFile } from 'fs/promises'
import { join } from 'path'
import { notFound } from 'next/navigation'
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
  const id = slug.split('-').pop()
  const { title, description }: BlogPost = JSON.parse(
    await readFile(
      join(process.cwd(), 'public', `_mdx-post-${id}.json`),
      'utf-8',
    ),
  )

  return {
    title,
    description,
  }
}

export const generateStaticParams = async () =>
  (
    (await JSON.parse(
      await readFile(join(process.cwd(), 'public', '_mdx-posts.json'), 'utf-8'),
    )) as BlogPost[]
  ).map(({ slug }) => ({ slug }))
