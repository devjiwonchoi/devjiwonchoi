import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx/components'
import { _mdxPrefix } from 'scripts/setup-blog-posts'
import type { BlogPost } from '@/utils/types'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const id = slug.split('-').pop()
  // id should be a number format including 0
  if (!id || isNaN(parseInt(id))) {
    notFound()
  }

  // TODO: investigate why I can't use `${outputDir}/post-${id}.json`
  // This works:
  // const post = await import(`${outputDir}/post-${id}.json`, assert: { type: 'json' })
  // This does not work:
  // const post = await import(`${outputDir}/post-${id}.json`, with: { type: 'json' })
  const { title, tags, date, readTime, content }: BlogPost = (
    await import(`../../../../${_mdxPrefix}post-${id}.json`)
  ).default
  const source = content
  if (!source) {
    notFound()
  }
  return (
    <>
      <h1 className="title text-2xl font-medium tracking-tighter">{title}</h1>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={source} />
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
  if (!id || isNaN(parseInt(id))) {
    throw new Error('Invalid Blog Post ID')
  }

  const { title, description }: BlogPost = (
    await import(`../../../../${_mdxPrefix}post-${id}.json`)
  ).default

  return {
    title,
    description,
  }
}
