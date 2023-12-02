import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  const { rows } =
    await sql`SELECT id, slug, title, tags, views, read_time, created_at FROM blogs`
  return NextResponse.json({ posts: rows })
}
