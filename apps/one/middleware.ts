import { type NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'
import { PROD_BASE_URL } from '@/utils/constants'

export async function middleware(request: NextRequest) {
  const isVercelDeployed = request.headers.has('x-vercel-id')

  // See https://vercel.com/docs/edge-network/headers#x-vercel-id-req
  if (isVercelDeployed) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(PROD_BASE_URL, { status: 301 })
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
      return NextResponse.redirect(key, { status: 307 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/:path*'],
}
