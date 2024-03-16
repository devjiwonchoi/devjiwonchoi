import Link from 'next/link'
import { readFile } from 'fs/promises'
import { join } from 'path'
// import postsJson from 'public/_mdx-posts.json' with { type: 'json' }
import { getPosts } from 'scripts/setup-mdx'
import type { BlogPost } from '@/utils/types'

export default async function Blog() {
  const isDev = process.env.NODE_ENV === 'development'
  // const posts: BlogPost[] = isDev ? await getPosts() : postsJson
  const posts: BlogPost[] = await JSON.parse(
    await readFile(join(process.cwd(), 'public', '_mdx-posts.json'), 'utf-8'),
  )
  return (
    <>
      {posts.map(({ id, date, readTime, slug, tags, title }) => {
        return (
          <article
            className="mb-2 bg-neutral-900 p-6 hover:bg-neutral-800"
            key={id}
          >
            {/* add id at the end to quick-find the post */}
            <Link href={`/blog/${slug}`}>
              <h3 className="text-xl font-bold tracking-tighter text-neutral-300">
                {title}
              </h3>
              <p className="text-sm text-neutral-400">{date}</p>
              <p className="text-sm text-neutral-400">
                {/* {views} views • {readTime} min read */}
                {readTime} min read
              </p>
            </Link>
            {tags.map((tag) => (
              <span
                className="mr-2 mt-2 inline-block rounded bg-neutral-700 px-2 py-1 text-xs font-medium text-neutral-100"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </article>
        )
      })}
    </>
  )
}

const description =
  'Compilation of troubleshoots, solutions, and endeavors to structure thoughts across various topics by Jiwon Choi.'

export const metadata = {
  title: 'Jiwon Choi | Blog',
  description,
}
