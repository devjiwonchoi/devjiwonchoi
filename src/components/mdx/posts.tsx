import Link from 'next/link'
import { formatDate, getBlogPosts } from '@/app/blog/utils'

export function BlogPosts() {
  const blogPosts = getBlogPosts()
  return (
    <div>
      {blogPosts
        .sort((a, b) => {
          if (
            new Date(a.metadata.datePublished) >
            new Date(b.metadata.datePublished)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/blog/${post.slug}`}
          >
            <div className="flex w-full flex-col space-x-0 md:flex-row md:space-x-2">
              <div className="">
                <p className="font-semibold tracking-tighter text-neutral-900 md:text-xl dark:text-neutral-100">
                  {post.metadata.title}
                </p>
                <p className="text-sm tracking-tighter text-neutral-600 dark:text-neutral-400">
                  {formatDate(post.metadata.datePublished, false)}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
