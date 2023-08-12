import { refinePosts } from '@/lib/notion'
import NotionPage from '@/notion-jsx/NotionPage'

async function getPost(slug: string) {
  const response = await fetch(`${process.env.API_URL}/blog/${slug}`)
  const data = await response.json()
  return data
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  return (
    <main className="p-6 mb-auto">
      <NotionPage pageData={post} />
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
