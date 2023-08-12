import { refinePosts } from '@/lib/notion'

export default function BlogPost() {
  return (
    <main className="p-6 mb-auto">
      <h1 className="text-3xl font-bold">Blog Post</h1>
    </main>
  )
}

export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_URL}/blog`)
  const data = await response.json()
  const posts = refinePosts(data)

  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}
