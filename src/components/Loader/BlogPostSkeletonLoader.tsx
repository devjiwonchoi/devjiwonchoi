import { NOTION_BLOG_PAGE_SIZE } from '@/lib/notion'

const BlogPostSkeleton = () => {
  return (
    <div className="border border-neutral-800 p-6 mb-2">
      <div className="animate-pulse space-y-2">
        <div className="h-6 bg-neutral-800 rounded"></div>
        <div className="h-4 w-1/6 bg-neutral-800 rounded"></div>
        <div className="flex space-x-2">
          <div className="h-5 w-10 bg-neutral-800 rounded"></div>
          <div className="h-5 w-10 bg-neutral-800 rounded"></div>
          <div className="h-5 w-10 bg-neutral-800 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function BlogPostSkeletonLoader() {
  return (
    <main className="p-6 mb-auto">
      <h2 className="mb-4 text-neutral-200 text-2xl tracking-tight font-bold sm:text-3xl">
        Blog
      </h2>
      {Array.from({ length: NOTION_BLOG_PAGE_SIZE }, (_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </main>
  )
}
