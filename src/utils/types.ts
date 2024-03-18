export type MDXDocBase = {
  id: string
  slug: string
  title: string
  tags: string[]
  date: string
  description: string
  content: string
}
export type BlogPost = MDXDocBase & {
  readTime: number
}
export type BlogListItem = Omit<BlogPost, 'content'>
export type BlogList = BlogListItem[]
