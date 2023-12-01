import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: NextRequest) {
  const { rows } = await sql`SELECT * FROM blogs`
  return NextResponse.json({ posts: rows })
}
