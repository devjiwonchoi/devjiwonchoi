function BlogPostSkeleton() {
  return (
    <div className="mb-2 border border-neutral-800 p-6">
      <div className="animate-pulse space-y-2">
        <div className="h-6 rounded bg-neutral-800" />
        <div className="h-4 w-1/6 rounded bg-neutral-800" />
        <div className="flex space-x-2">
          <div className="h-5 w-10 rounded bg-neutral-800" />
          <div className="h-5 w-10 rounded bg-neutral-800" />
          <div className="h-5 w-10 rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  )
}

export function BlogPostSkeletonLoader() {
  return (
    <main className="mb-auto">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-200 sm:text-3xl">
        Blog
      </h2>
      {Array.from({ length: 10 }, (_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </main>
  )
}
