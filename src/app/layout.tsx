import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import '@/globals.css'

export default async function LangRootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html className={`${GeistSans.variable} bg-neutral-950`} lang={lang}>
      <body
        className="container mx-auto flex h-screen max-w-4xl flex-col"
        suppressHydrationWarning
      >
        <Header />
        <ProfileCard />
        <NavBar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
