import { type NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !URL.canParse(url)) {
    return NextResponse.redirect('/')
  }

  return NextResponse.redirect(url, { status: 307 })
}
