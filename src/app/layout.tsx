import type { Metadata } from 'next'

import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PROD_BASE_URL } from '@/utils/constants'

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="container mx-auto flex min-h-dvh max-w-2xl flex-col p-6 antialiased">
        <Header />
        {/* <NavBar /> */}
        <main className="mb-auto">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

const description =
  "Jiwon Choi is a software engineer spending time on time-saving at Vercel, maintaining Next.js and other open source libraries.";

const keywords = [
  "jiwon choi",
  "software engineer",
  "vercel",
  "nextjs",
  "open source",
  "web",
  "frontend",
  "cloud",
  "developer",
  "experience",
];

export const metadata: Metadata = {
  title: "Jiwon Choi",
  description,
  keywords,
  metadataBase: new URL(PROD_BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jiwon Choi",
    url: PROD_BASE_URL,
    images: [
      {
        url: "/me.png",
        width: 800,
        height: 600,
        alt: "Jiwon Choi",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    creator: "@devjiwonchoi",
  },
};
