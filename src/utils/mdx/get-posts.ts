import 'server-only'
import type { BlogPost } from '../types'

export const getPosts = async () =>
  (await import(`../../../public/_mdx-posts.json`)).default as BlogPost[]

export const getPost = async ({ id }: { id: string }) =>
  (await import(`../../../public/_mdx-post-${id}.json`)).default as BlogPost
