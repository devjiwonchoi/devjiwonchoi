import { SignIn } from '@/components/sign-in'
import { auth } from '@/utils/auth'
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) return <SignIn />
  return <main className="mb-auto">{children}</main>
}
