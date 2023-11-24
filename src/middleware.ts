import { type NextRequest, NextResponse } from 'next/server'

export function middleware({ url, nextUrl: { pathname } }: NextRequest) {
  if (pathname === '/') return NextResponse.rewrite(new URL(`/en`, url))
  if (pathname === '/en') return NextResponse.redirect(new URL(`/`, url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/en'],
}
