import { type NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  const isVercelDeployed = request.headers.has('x-vercel-id')
  const baseUrl = isVercelDeployed
    ? 'https://jiwonchoi.dev'
    : request.nextUrl.origin

  // See https://vercel.com/docs/edge-network/headers#x-vercel-id-req
  if (isVercelDeployed) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(baseUrl, { status: 301 })
    }

    const paths = request.nextUrl.pathname.split('/')
    // if the path is not /<key>, we don't need to check the Edge Config
    if (paths.length !== 2) {
      return NextResponse.next()
    }

    console.log(paths[1])

    // ['', '<key>']
    const key = await get(paths[1])
    if (typeof key === 'string') {
      return NextResponse.redirect(`${baseUrl}/one?url=${key}`, {
        status: 307,
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/:path*'],
}
