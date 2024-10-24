import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const isVercelDeployed = request.headers.has('x-vercel-id')

  // See https://vercel.com/docs/edge-network/headers#x-vercel-id-req
  if (isVercelDeployed) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect('https://devjiwonchoi.com', { status: 308 })
    }

    const paths = request.nextUrl.pathname.split('/')
    // If the path is not /<key>, we don't need to redirect.
    if (paths.length !== 2) {
      return NextResponse.next()
    }

    // ['', '<key>']
    const key = paths[1]
    if (key in redirectMap) {
      return NextResponse.redirect(
        redirectMap[key as keyof typeof redirectMap],
        { status: 307 }
      )
    }
  }

  return NextResponse.next()
}

const redirectMap = {
  git: 'https://github.com/devjiwonchoi',
  in: 'https://linkedin.com/in/devjiwonchoi',
  x: 'https://x.com/devjiwonchoi',
} as const

export const config = {
  matcher: ['/', '/:path*'],
}
