import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(
  request: NextRequest,
  {
    params: { slug },
  }: {
    params: { slug: string }
  },
) {
  const { rows } =
    await sql`SELECT source, tags FROM blogs WHERE slug = ${slug}`
  return NextResponse.json({ post: rows[0] })
}
