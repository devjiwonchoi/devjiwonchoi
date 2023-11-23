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
      <body className="jwc-body" suppressHydrationWarning={true}>
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
  title: 'Jiwon Choi',
  description:
    'Code Minimalist as a DevOps Developer. Focusing on Efficiency Driven Development',
  metadataBase: new URL('https://jiwonchoi.dev'),
  openGraph: {
    title: 'Jiwon Choi',
    description:
      'Code Minimalist as a DevOps Developer. Focusing on Efficiency Driven Development',
    url: '/',
    siteName: 'Jiwon Choi',
    type: 'website',
    images: [
      {
        url: '/me-logo800x600.png',
        width: 800,
        height: 600,
        alt: 'devjiwonchoi logo',
      },
    ],
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  keywords: [
    'Jiwon Choi',
    'Jiwon',
    'Choi',
    'devjiwonchoi',
    'jiwonchoi.dev',
    'DevOps',
    'Developer',
  ],
}
