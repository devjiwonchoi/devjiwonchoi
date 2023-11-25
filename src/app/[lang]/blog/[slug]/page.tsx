import { NotionAPI } from 'notion-client'
import NotionPage from '@/components/NotionPage'
import { refinePosts } from '@/utils/notion'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const notion = new NotionAPI()
  const blockId = slug.split('-').pop() ?? ''
  const recordMap = await notion.getPage(blockId)

  return (
    <main className="mb-auto p-6">
      <NotionPage recordMap={recordMap} />
    </main>
  )
}

// TODO: canonical url
export async function generateStaticParams() {
  const response = await fetch(`${process.env.API_URL}/blog`)
  const data = await response.json()
  const posts = refinePosts(data)
  return posts.map((post: any) => ({
    slug: post.slug,
  }))
}
