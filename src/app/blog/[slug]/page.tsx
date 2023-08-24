import { NotionAPI } from 'notion-client'
import NotionPage from '@/components/NotionPage'
import { refinePosts } from '@/lib/notion'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const notion = new NotionAPI()
  const blockId = params.slug.split('-').pop() ?? ''
  const recordMap = await notion.getPage(blockId)

  return (
    <main className="p-6 mb-auto">
      <NotionPage recordMap={recordMap} />
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
