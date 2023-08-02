'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export function AuthForm() {
  const verifyEmail = (provider: string) => {
    signIn(provider)
  }
  return (
    <section className="flex flex-col items-center space-y-2">
      <h3 className="mb-4 text-neutral-200 text-xl tracking-tight font-medium sm:text-2xl">
        Verify Email
      </h3>
      <button
        type="button"
        className="flex justify-center w-2/3 sm:w-1/2 py-3 px-5 text-base font-medium text-center text-neutral-200 border border-neutral-200 bg-transparent hover:bg-neutral-800 transition ease-in-out duration-150"
        onClick={() => verifyEmail('github')}
      >
        <Image
          src="/github-mark-white.svg"
          alt="GitHub Logo"
          width={0}
          height={0}
          className="w-6 h-6 mr-2"
        />
        GitHub Account
      </button>
      <button
        type="button"
        className="flex justify-center w-2/3 sm:w-1/2 py-3 px-5 text-base font-medium text-center text-neutral-200 border border-neutral-200 bg-transparent hover:bg-neutral-800 transition ease-in-out duration-150"
        onClick={() => verifyEmail('google')}
      >
        <Image
          src="/gmail-2020.svg"
          alt="Gmail Logo"
          width={0}
          height={0}
          className="w-6 h-6 mr-2 filter brightness-0 invert"
        />
        Gmail Account
      </button>
    </section>
  )
}
