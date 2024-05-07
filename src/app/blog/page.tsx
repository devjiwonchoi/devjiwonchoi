import { BlogPosts } from '@/components/mdx/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <main className="mb-auto p-6">
      <BlogPosts />
    </main>
  )
}
