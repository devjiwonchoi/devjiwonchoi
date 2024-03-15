export type BlogPost = {
  id: string
  slug: string
  title: string
  tags: string[]
  date: string
  readTime: number
  description?: string
  content?: string
}
