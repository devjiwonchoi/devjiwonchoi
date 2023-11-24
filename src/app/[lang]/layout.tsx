import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import { getDictionary, i18n } from '@/dictionaries/i18n'

export default function LangRootLayout({
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

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const { metadata } = await getDictionary(lang)

  return {
    title: {
      default: metadata.title.default,
      template: metadata.title.template,
    },
    openGraph: {
      locale: metadata.locale,
      siteName: metadata.openGraph.siteName,
      images: [
        {
          url: '/me-logo800x600.png',
          width: 800,
          height: 600,
          alt: metadata.openGraph.images[0].alt,
        },
      ],
    },
  }
}
