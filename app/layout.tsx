import type { Metadata } from 'next'

const PROD_BASE_URL = 'https://devjiwonchoi.com'

const description =
  'Jiwon Choi is a software engineer spending time on time-saving at Vercel, maintaining Next.js and other open source libraries.'

const keywords = [
  'jiwon choi',
  'software engineer',
  'vercel',
  'nextjs',
  'open source',
  'web',
  'frontend',
  'cloud',
  'developer',
  'experience',
]

export const metadata: Metadata = {
  title: 'Jiwon Choi',
  description,
  keywords,
  metadataBase: new URL(PROD_BASE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Jiwon Choi',
    url: PROD_BASE_URL,
    images: [
      {
        url: '/me.png',
        width: 800,
        height: 600,
        alt: 'Jiwon Choi',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    creator: '@devjiwonchoi',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
