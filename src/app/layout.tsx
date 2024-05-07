import '@/app/globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Header, Footer, NavBar } from '@/components/layouts'

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
        GeistSans.variable,
        GeistMono.variable,
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
      </body>
    </html>
  )
}

const description =
  'Jiwon Choi is a software engineer concentrating on web, cloud, and experience, an active contributor to Next.js, Vercel, and other open-source software.'

const keywords = [
  'Jiwon Choi',
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
  metadataBase: new URL('https://www.jiwonchoi.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.jiwonchoi.dev',
    images: [
      {
        url: '/images/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'Jiwon Choi Logo',
      },
    ],
    siteName: 'Jiwon Choi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
}
