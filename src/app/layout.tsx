import '@/app/globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { GeistSans } from 'geist/font/sans'
import { Header, Footer, NavBar } from '@/components/layouts'
import { PROD_BASE_URL } from '@/utils/constants'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="container mx-auto flex min-h-screen max-w-2xl flex-col p-6 antialiased">
        <Header />
        {/* <NavBar /> */}
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
  'software engineer',
  'vercel',
  'nextjs',
  'open source',
  'web',
  'frontend',
  'cloud',
  'developer',
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
