import { type NextRequest, NextResponse } from 'next/server'
import { i18n } from './dictionaries/i18n'

export function middleware({ url, nextUrl: { pathname } }: NextRequest) {
  const { langs, defaultLang } = i18n
  const hasLang = langs.some((lang) => pathname.startsWith(`/${lang}`))
  if (hasLang) return NextResponse.next()

  if (pathname.startsWith(`/${defaultLang}`)) {
    return NextResponse.redirect(
      new URL(pathname.replace(new RegExp(`^\\/${defaultLang}`), '/'), url),
    )
  }

  if (!hasLang) {
    return NextResponse.rewrite(new URL(`/${defaultLang}${pathname}`, url))
  }

  return NextResponse.next()
}

// TODO: find a better way to skip route from public directory
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*.ico$|.*.svg$|.*.png$).*)'],
}
