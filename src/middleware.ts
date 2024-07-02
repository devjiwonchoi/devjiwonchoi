import type { NextRequest } from 'next/server'
import { get, has } from '@vercel/edge-config'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    if (request.nextUrl.hostname === 'jiw.one') {
      return NextResponse.redirect('https://jiwonchoi.dev', 301)
    }

    return NextResponse.next()
  }

  const paths = request.nextUrl.pathname.split('/')
  const possibleKey = paths[1]!

  if (await has(possibleKey)) {
    return NextResponse.redirect((await get(possibleKey)) as string)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
