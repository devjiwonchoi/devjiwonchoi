import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { Header, Footer } from '@/components'
import { PROD_BASE_URL } from '@/utils/constants'
import './globals.css'

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
      </body>
    </html>
  )
}

const description =
  'Jiwon Choi is a software engineer at Vercel, maintaining Next.js and other open source libraries.'

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
