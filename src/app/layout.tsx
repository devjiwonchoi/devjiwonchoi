import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { Header, Footer, NavBar } from '@/components/layouts'
import '@/globals.css'
import type { Metadata } from 'next'

const description =
  'Jiwon Choi is a software engineer concentrating on web, cloud, and developer experience. Active contributor of Next.js, Vercel, and other open-source projects.'

const keywords = [
  'Jiwon Choi',
  'Vercel',
  'Next.js',
  'Software Engineer',
  'Open Source',
  'Web',
  'Frontend',
  'Cloud',
  'Developer Experience',
  'DevOps',
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${GeistMono.className} bg-neutral-950`}>
      <body
        className="container mx-auto flex h-screen max-w-4xl flex-col"
        suppressHydrationWarning
      >
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
