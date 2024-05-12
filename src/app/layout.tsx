import '@/app/globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistMono } from 'geist/font/mono'
import { Header, Footer, NavBar } from '@/components/layouts'
import { PROD_BASE_URL } from '@/utils/constants'

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cx(
        'bg-white text-black dark:bg-black dark:text-white',
        GeistMono.className
      )}
      lang="en"
    >
      <body className="container mx-auto flex h-screen max-w-4xl flex-col">
        <Header />
        <NavBar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-LN6X9NBPXX" />
      </body>
    </html>
  )
}

const description =
  'Jiwon Choi is a software engineer concentrating on web, cloud, and experience, an active contributor to Next.js, Vercel, and other open-source software.'

const keywords = [
  'jiwon choi',
  'software',
  'engineer',
  'vercel',
  'nextjs',
  'open source',
  'web',
  'frontend',
  'cloud',
  'experience',
]

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description,
  keywords,
  metadataBase: new URL(PROD_BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Jiwon Choi',
    url: PROD_BASE_URL,
    images: [
      {
        url: '/img/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'devjiwonchoi logo',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
}
