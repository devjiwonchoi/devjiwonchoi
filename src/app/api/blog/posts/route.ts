import { NextResponse, type NextRequest } from "next/server"
import { getPostsInfo, notionClient } from "@/lib"

export async function GET(request: NextRequest) {
  const searchParams = await request.nextUrl.searchParams
  const nextCursor = await searchParams.get('nextCursor') ?? undefined

  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID as string, filter: {
      property: 'Status',
      select: {
        equals: 'ready'
      }
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending'
      }
    ],
    page_size: 7,
    start_cursor: nextCursor,
    // page_size: 5 * parseInt(pageIndex)
  })
  const { results } = await response
  const posts = await getPostsInfo(results)
  return await NextResponse.json(posts)
}