import { type NextRequest, NextResponse } from 'next/server'

export function GET(_: NextRequest, context: { params: { url: string } }) {
  const { url } = context.params
  if (!URL.canParse(url)) {
    return NextResponse.redirect('/')
  }

  return NextResponse.redirect(url, { status: 307 })
}
