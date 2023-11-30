import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const source = await fetch('http://localhost:3000/api/blog')
  const { docs } = await source.json()

  return (
    <main className="mb-auto p-6">
      <MDXRemote source={docs} />
    </main>
  )
}

// export async function generateStaticParams() {}

export async function generateMetadata() {
  const res = await fetch('http://localhost:3000/api/blog')
  const { source } = await res.json()
  const { frontmatter } = await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true },
  })
  console.log(frontmatter)
}
