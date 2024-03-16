import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // if mobile, rewrite as /bio
  if (request.headers.get('user-agent')?.includes('Mobile')) {
    return NextResponse.redirect(new URL('/bio', request.url))
  }
}

export const config = {
  matcher: '/',
}
