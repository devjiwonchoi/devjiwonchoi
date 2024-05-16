import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx/components'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { PROD_BASE_URL } from '@/utils/constants'

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post: any) => post.slug === params.slug)
  if (!post) {
    return {}
  }

  const {
    title,
    datePublished: publishedTime,
    description,
    image,
  } = post.metadata
  const ogImage = image
    ? image
    : `${PROD_BASE_URL}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${PROD_BASE_URL}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }: { params: { slug: string } }) {
  const post = getBlogPosts().find((post: any) => post.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.datePublished,
            dateModified: post.metadata.dateModified,
            description: post.metadata.description,
            image: post.metadata.image
              ? `${PROD_BASE_URL}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${PROD_BASE_URL}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <h1 className="title text-4xl font-semibold tracking-tighter md:text-5xl">
        {post.metadata.title}
      </h1>
      <div className="mb-8 mt-2 flex items-center justify-between">
        <p className="text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.datePublished)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </>
  )
}
