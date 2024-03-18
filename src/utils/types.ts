export type Blog = {
  id: string
  slug: string
  title: string
  tags: string[]
  date: string
  readTime: number
  description: string
  content: string
}

export type BlogList = Omit<Blog, 'content'>[]
