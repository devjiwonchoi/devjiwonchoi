import { type NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect('https://jiwonchoi.dev', { status: 301 })
  }

  const paths = request.nextUrl.pathname.split('/')
  // if the path is not /<key>, we don't need to check the Edge Config
  if (paths.length !== 2) {
    return NextResponse.next()
  }

  // ['', '<key>']
  const key = await get(paths[1])
  if (typeof key === 'string') {
    return NextResponse.redirect(key, { status: 307 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/:path*'],
}
