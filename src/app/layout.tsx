import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/layouts'
import '@/styles/global.css'

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description:
    'Code Minimalist as DevOps Developer - Efficiency-Driven Development',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  authors: [{ name: 'Jiwon Choi', url: 'https://devjiwonchoi.codes' }],
  publisher: 'Jiwon Choi',
  metadataBase: new URL('https://devjiwonchoi.codes'),
  openGraph: {
    title: 'Jiwon Choi',
    description:
      'Code Minimalist as DevOps Developer - Efficiency-Driven Development',
    url: 'https://devjiwonchoi.codes',
    siteName: 'Jiwon Choi',
    type: 'website',
    images: [
      {
        url: 'https://devjiwonchoi.codes/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'Jiwon Choi',
      },
    ],
    locale: 'en_US',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: [
    'Jiwon',
    'Choi',
    'devjiwonchoi',
    'developer',
    'DevOps',
    'Next.js',
    'React',
    'JavaScript',
    'TypeScript',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body
        className="container flex flex-col mx-auto h-screen max-w-4xl"
        suppressHydrationWarning={true}
      >
        <Header />

        <ProfileCard />
        <NavBar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
