import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { Header, Footer, NavBar } from '@/components/layouts'
import type { Metadata } from 'next'
import '@/globals.css'

const description =
  'Jiwon Choi is a software engineer concentrating on web, cloud, and experience, an active contributor to Next.js, Vercel, and other open-source software.'

const keywords = [
  'Jiwon Choi',
  'software',
  'engineer',
  'vercel',
  'next.js',
  'open-source',
  'web',
  'frontend',
  'cloud',
  'experience',
]

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description,
  keywords,
  metadataBase: new URL('https://www.jiwonchoi.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jiwonchoi.dev',
    images: [
      {
        url: '/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'Jiwon Choi Logo',
      },
    ],
    siteName: 'Jiwon Choi',
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isHTTPS = headers().get('x-forwarded-proto') === 'https'
  return (
    <html className={`${GeistMono.className} bg-neutral-950`} lang="en">
      <body className="container mx-auto flex h-screen max-w-4xl flex-col">
        <Header />
        <NavBar />
        {children}
        <Footer />
        {isHTTPS && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
