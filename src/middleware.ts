import { type NextRequest, NextResponse } from 'next/server'
import { i18n } from './dictionaries/i18n'

export function middleware({ url, nextUrl: { pathname } }: NextRequest) {
  const [curURL, curPathname] = [url, pathname]
  const { langs, defaultLang } = i18n
  const hasLang = langs.some((lang) => curPathname.startsWith(`/${lang}`))
  if (hasLang) return NextResponse.next()

  // TODO: refactor this
  // pathname: '/en' -> '/'; '/en/a' -> '/a'
  if (curPathname.startsWith(`/${defaultLang}`)) {
    const pathnameWithoutDefaultLangRegex = new RegExp(`^/${defaultLang}(/|$)`)
    const pathnameWithoutDefaultLang = curPathname.replace(
      pathnameWithoutDefaultLangRegex,
      '/',
    )
    return NextResponse.redirect(new URL(pathnameWithoutDefaultLang, curURL))
  }

  if (!hasLang) {
    return NextResponse.rewrite(
      new URL(`/${defaultLang}${curPathname}`, curURL),
    )
  }

  return NextResponse.next()
}

// TODO: find a better way to skip route from public directory
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*.ico$|.*.svg$|.*.png$|sitemap|robots).*)',
  ],
}
