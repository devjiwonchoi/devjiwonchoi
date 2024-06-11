import { signIn } from '@/utils/auth'

export function SignIn() {
  return (
    <main className="mb-auto">
      <form
        action={async () => {
          'use server'
          await signIn('github')
        }}
      >
        <button type="submit">Sign In with GitHub</button>
      </form>
    </main>
  )
}
