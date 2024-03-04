import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import '@/globals.css'

export default async function LangRootLayout({
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
