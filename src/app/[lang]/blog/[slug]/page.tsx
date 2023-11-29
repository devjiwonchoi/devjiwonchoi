import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'

export default async function BlogPost({
  params: { slug },
}: {
  params: { slug: string }
}) {
  return <main className="mb-auto p-6"></main>
}

// TODO: canonical url
export async function generateStaticParams() {}

export async function generateMetadata() {}
