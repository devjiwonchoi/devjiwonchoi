import { BlogPosts } from '@/components/mdx/posts'

export default function Page() {
  return (
    <main className="mb-auto">
      <p className="mb-4">Stay tuned.</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </main>
  )
}
