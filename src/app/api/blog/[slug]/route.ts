import { NextResponse, type NextRequest } from 'next/server'
import { notionClient } from '@/lib'

export async function GET(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  const blockId = slug.split('-').pop() || ''
  const response = await notionClient.blocks.children.list({
    block_id: blockId,
  })

  return NextResponse.json({ ...response })
}
