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
