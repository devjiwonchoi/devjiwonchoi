import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/robots') {
    return NextResponse.redirect(new URL('/robots.txt', request.url))
  }

  if (request.nextUrl.pathname === '/sitemap') {
    return NextResponse.redirect(new URL('/sitemap.xml', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/robots', '/sitemap'],
}
