import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import '@/styles/global.css'

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description: "Hi! I'm Jiwon Choi, a code minimalist based in Seoul, Korea.",
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
        {children}
        <Footer />
      </body>
    </html>
  )
}
