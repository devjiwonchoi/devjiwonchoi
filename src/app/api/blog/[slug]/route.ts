import { readFile } from 'fs/promises'
import { join } from 'path'
import { NextResponse } from 'next/server'
import matter from 'gray-matter'
import type { BlogPost } from '@/utils/types'

export async function GET(
  request: Request,
  { params: { slug } }: { params: { slug: string } },
) {
  const mdxFile = join(process.cwd(), 'docs', 'blog', `${slug}.mdx`)
  let post
  try {
    const { data: frontmatter, content } = matter(
      await readFile(mdxFile, 'utf-8'),
    )
    post = { ...frontmatter, content } as BlogPost
  } catch (error) {
    return new Response('Not Found', { status: 404 })
  }

  return NextResponse.json(post)
}
