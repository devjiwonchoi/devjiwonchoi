import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params: { postId } }: { params: { postId: string[] } }
) {
  return NextResponse.json({ postId })
}
