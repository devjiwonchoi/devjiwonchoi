import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

export async function getViewsCount(): Promise<
  { id: string; count: number }[]
> {
  if (!process.env.POSTGRES_URL) {
    return []
  }

  noStore()
  const { rows } = await sql`
    SELECT id, count
    FROM views
  `

  return rows as { id: string; count: number }[]
}

export async function incrementView(id: string) {
  noStore()
  await sql`
    INSERT INTO views (id, count)
    VALUES (${id}, 1)
    ON CONFLICT (id)
    DO UPDATE SET count = views.count + 1
  `
}
