import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const source = await fetch('http://localhost:3000/api/blog')
  const { posts } = await source.json()
  return (
    <main className="mb-auto p-6">
      {<MDXRemote source={posts[0].content} />}
    </main>
  )
}

// export async function generateStaticParams() {}

export async function generateMetadata() {
  const res = await fetch('http://localhost:3000/api/blog')
  const { posts } = await res.json()
  const source = posts[0].content
  const { frontmatter, content } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
  })
  console.log(frontmatter)
}
