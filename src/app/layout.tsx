import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import '@/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} bg-neutral-950`}>
      <body
        className="container mx-auto flex h-screen max-w-4xl flex-col"
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

export const metadata: Metadata = {
  metadataBase: new URL('https://jiwonchoi.dev'),
  title: {
    default: 'Jiwon Choi',
    template: '%s | Jiwon Choi',
  },
  openGraph: {
    title: {
      default: 'Jiwon Choi',
      template: '%s | Jiwon Choi',
    },
    type: 'website',
    siteName: 'Jiwon Choi',
    // TODO: for blogs and projects, set their main image
    images: [
      {
        url: '/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'devjiwonchoi logo',
      },
    ],
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // TODO: add canonical url for i18n
  // TODO: viewport for dark mode
}
