'use client'
import { GeistMono } from 'geist/font/mono'
import { Header, Footer, NavBar } from '@/components/layouts'
import '@/globals.css'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html className={`${GeistMono.className} bg-neutral-950`} lang="en">
      <body className="container mx-auto flex h-screen max-w-4xl flex-col">
        <Header />
        <NavBar />
        <main className="mb-auto p-6"></main>
        <Footer />
      </body>
    </html>
  )
}
