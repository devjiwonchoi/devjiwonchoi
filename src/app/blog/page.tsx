'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { BlogPostSkeletonLoader } from '@/components/Loader/BlogPostSkeletonLoader'
import { NOTION_BLOG_PAGE_SIZE } from '@/lib/notion'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  if (pageIndex === 0) return `/api/blog/posts`
  const nextCursor = previousPageData[1].nextCursor
  // return `/api/blog/posts?pageIndex=${pageIndex + 1}`
  return `/api/blog/posts?nextCursor=${nextCursor}`
}

const EmptyPosts = () => {
  return (
    <main className="p-6 mb-auto">
      <h2 className="mb-4 text-neutral-200 text-2xl tracking-tight font-bold sm:text-3xl">
        Blog
      </h2>
      <p className="text-neutral-400 text-lg sm:text-xl">No Posts Found.</p>
    </main>
  )
}

export default function Blog() {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateOnFocus: false, keepPreviousData: true }
  )
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.[0]?.posts?.length < NOTION_BLOG_PAGE_SIZE)

  useEffect(() => {
    const handleSetSizeByScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      if (bottom && !isLoading) {
        setSize(size + 1)
      }
    }
    window.addEventListener('scroll', handleSetSizeByScroll)
    return () => window.removeEventListener('scroll', handleSetSizeByScroll)
  }, [isLoading, size, setSize])

  if (isLoading) return <BlogPostSkeletonLoader />
  if (!data) return <EmptyPosts />
  const posts = data
    .flat()
    .flatMap((obj) => obj.posts || [])
    .filter(
      (post, index, self) => index === self.findIndex((p) => p.id === post.id)
    )

  return (
    <main className="p-6 mb-auto">
      <h2 className="mb-4 text-neutral-200 text-2xl tracking-tight font-bold sm:text-3xl">
        Blog
      </h2>
      {posts.map((post: any) => (
        <article
          key={post.id}
          className="p-6 mb-2 bg-neutral-900 hover:bg-neutral-800"
        >
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold text-neutral-300">{post.title}</h3>
            <p className="text-sm text-neutral-400">{post.updatedAt}</p>
          </Link>
          {post.categories?.map((category: any) => (
            <span
              key={category.id}
              className="inline-block px-2 py-1 mt-2 mr-2 text-xs font-medium text-neutral-100 bg-neutral-700 rounded"
            >
              {category.name}
            </span>
          ))}
        </article>
      ))}
      {isLoadingMore && (
        <div className="text-center p-4">
          <div className="inline-block h-8 w-8 animate-spin mx-auto rounded-full border-4 border-solid border-r-neutral-400 border-neutral-500 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
      )}
      {isReachingEnd && (
        <div className="p-4">
          <p className="mb-2 text-base sm:text-lg text-neutral-400 text-center tracking-wide">
            You&apos;ve reached the end of the posts! 🎉
          </p>
          <p className="text-sm sm:text-base text-neutral-400 text-center tracking-wide">
            Click here to view my blog on Medium →{' '}
            <Link
              href="https://devjiwonchoi.medium.com/"
              target="_blank"
              className="text-neutral-100 hover:text-neutral-200"
            >
              devjiwonchoi.medium.com
            </Link>
          </p>
        </div>
      )}
    </main>
  )
}
