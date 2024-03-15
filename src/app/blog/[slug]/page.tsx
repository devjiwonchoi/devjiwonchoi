import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx/components'
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
  const { title, tags, date, readTime, content }: BlogPost = await import(
    `.vercel/output/post-${id}.json`
  )
  const source = content
  if (!source) {
    notFound()
  }
  return (
    <main className="mb-auto p-6">
      <h1 className="title max-w-[650px] text-2xl font-medium tracking-tighter">
        {title}
      </h1>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={source} />
      </article>
    </main>
  )
}
