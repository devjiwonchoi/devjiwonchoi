import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/react'
import { ProfileCard } from '@/components'
import { Header, Footer, NavBar } from '@/components/layouts'
import { getDictionary } from '@/utils/i18n'

export default async function LangRootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang)
  return (
    <html lang={lang} className={`${GeistSans.variable} bg-neutral-950`}>
      <body
        className="container mx-auto flex h-screen max-w-4xl flex-col"
        suppressHydrationWarning={true}
      >
        <Header dict={dictionary} />
        <ProfileCard dict={dictionary} />
        <NavBar dict={dictionary} />
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
      type: 'website',
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
    keywords: ['Jiwon Choi', 'devjiwonchoi', 'jiwonchoi.dev'],
  }
}

export async function generateStaticParams() {
  // TODO: find way for '/' not '/en'
  return [{ lang: 'ko' }]
}
