'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWRInfinite from 'swr/infinite'
import { BlogPostSkeletonLoader } from '@/components/Loader/BlogPostSkeletonLoader'
import { NOTION_BLOG_PAGE_SIZE, refinePosts } from '@/utils/notion'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData.length) return null // reached the end
  if (pageIndex === 0) return `/api/blog`
  const nextCursor = previousPageData[1].nextCursor
  return `/api/blog?nextCursor=${nextCursor}`
}

function EmptyPosts() {
  return (
    <main className="mb-auto p-6">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
        Blog
      </h2>
      <p className="text-lg text-neutral-400 sm:text-xl">No Posts Found.</p>
    </main>
  )
}

export default function Blog() {
  const { data, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
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
  const posts = refinePosts(data)

  return (
    <main className="mb-auto p-6">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
        Blog
      </h2>
      {posts.map((post: any) => (
        <article
          className="mb-2 bg-neutral-900 p-6 hover:bg-neutral-800"
          key={post.id}
        >
          <Link href={`/blog/${post.slug}`}>
            <h3 className="text-xl font-bold text-neutral-300">{post.title}</h3>
            <p className="text-sm text-neutral-400">{post.updatedAt}</p>
          </Link>
          {post.categories?.map((category: any) => (
            <span
              className="mr-2 mt-2 inline-block rounded bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-100"
              key={category.id}
            >
              {category.name}
            </span>
          ))}
        </article>
      ))}
      {isLoadingMore ? (
        <div className="p-4 text-center">
          <div className="mx-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-neutral-500 border-r-neutral-400 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        </div>
      ) : null}
      {isReachingEnd ? (
        <div className="p-4">
          <p className="mb-2 text-center text-base tracking-wide text-neutral-400 sm:text-lg">
            You&apos;ve reached the end of the posts! 🎉
          </p>
          <p className="text-center text-sm tracking-wide text-neutral-400 sm:text-base">
            Click here to view my blog on Medium →{' '}
            <Link
              className="text-neutral-100 hover:text-neutral-200"
              href="https://devjiwonchoi.medium.com/"
              target="_blank"
            >
              devjiwonchoi.medium.com
            </Link>
          </p>
        </div>
      ) : null}
    </main>
  )
}
