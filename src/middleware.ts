import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // if mobile, redirect to /blog
  if (request.headers.get('user-agent')?.includes('Mobile')) {
    return NextResponse.redirect(new URL('/blog', request.url))
  }
}

export const config = {
  matcher: '/',
}
