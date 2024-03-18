import matter from 'gray-matter'
import type { BlogPost, BlogListItem } from '../types'

export const isInvalidId = (id: string) =>
  isNaN(parseInt(id)) || parseInt(id) < 0

export const getIdFromSlug = (slug: string) => slug.split('-').pop()

// ref: https://github.com/leerob/leerob.io
export function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

export async function parseMDXToJSON({
  source,
  frontmatterOnly,
}: {
  source: string
  frontmatterOnly?: boolean
}): Promise<BlogPost | BlogListItem> {
  const { data: frontmatter, content } = matter(source)

  const id: string = frontmatter.id.toString()
  if (isInvalidId(id)) throw new Error(`Invalid ID: "${id}"`)

  const slug = `${slugify(frontmatter.title)}-${id}`
  const date = new Date(frontmatter.date)?.toISOString()?.split('T')?.[0]

  if (frontmatterOnly) {
    return { ...frontmatter, id, slug, date } as BlogListItem
  }
  return { ...frontmatter, id, slug, date, content } as BlogPost
}
