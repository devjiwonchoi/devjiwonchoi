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
  const post: BlogPost = await import(`.vercel/output/post-${id}.json`)
  const source = post.content
  if (!source) {
    notFound()
  }
  return (
    <main className="mb-auto p-6">
      <CustomMDX source={source} />
    </main>
  )
}
