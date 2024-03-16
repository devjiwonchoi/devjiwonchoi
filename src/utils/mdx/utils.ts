export const isInvalidId = (id: string) =>
  isNaN(parseInt(id)) || parseInt(id) < 0

export const getIdFromSlug = (slug: string) => slug.split('-').pop()
