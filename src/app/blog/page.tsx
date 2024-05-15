import type { Metadata } from 'next'
import { BlogPosts } from '@/components/mdx/posts'

const description =
  "Jiwon Choi's curation of personal thoughts, troubleshoots, and solutions to problems."

const keywords = [
  'jiwon choi',
  'software engineer',
  'tech blogs',
  'dev blogs',
  'developer blogs',
  'software engineer blogs',
]

export const metadata: Metadata = {
  title: "Jiwon Choi's Blog",
  description,
  keywords,
}

export default function Blog() {
  return (
    <main className="mb-auto">
      <BlogPosts />
    </main>
  )
}
