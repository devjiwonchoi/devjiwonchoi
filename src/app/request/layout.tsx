import { AuthProvider } from '@/components'

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
