import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/layouts'
import '@/styles/global.css'

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description:
    'Code Minimalist as a DevOps Developer. Focusing on Efficiency Driven Development',
  metadataBase: new URL('https://devjiwonchoi.codes'),
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
    'devjiwonchoi.codes',
    'DevOps',
    'Developer',
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
