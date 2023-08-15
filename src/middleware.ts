import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL('/', req.url))
}

export const config = {
  matcher: ['/blog', '/blog/:path*', '/certifications'],
}
