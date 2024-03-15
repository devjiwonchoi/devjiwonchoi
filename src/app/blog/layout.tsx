import { GeistSans } from 'geist/font/sans'
import '@/globals.css'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={`${GeistSans.className} mb-auto p-6`}>{children}</main>
  )
}
