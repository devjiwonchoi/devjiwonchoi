'use client'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

export function AuthForm({
  dictionary: { req },
}: {
  dictionary: typeof import('@/dictionaries/en.json')
}) {
  const verifyEmail = (provider: string) => {
    signIn(provider)
  }
  return (
    <section className="flex flex-col items-center space-y-2">
      <h3 className="mb-4 text-xl font-medium tracking-tight text-neutral-200 sm:text-2xl">
        {req.auth_form.h3}
      </h3>
      <button
        type="button"
        className="flex w-2/3 justify-center border border-neutral-200 bg-transparent px-5 py-3 text-center text-base font-medium text-neutral-200 transition duration-150 ease-in-out hover:bg-neutral-800 sm:w-1/2"
        onClick={() => verifyEmail('github')}
      >
        <Image
          src="/github-mark-white.svg"
          alt="GitHub Logo"
          width={0}
          height={0}
          className="mr-2 h-6 w-6"
        />
        {req.auth_form.button_1}
      </button>
      <button
        type="button"
        className="flex w-2/3 justify-center border border-neutral-200 bg-transparent px-5 py-3 text-center text-base font-medium text-neutral-200 transition duration-150 ease-in-out hover:bg-neutral-800 sm:w-1/2"
        onClick={() => verifyEmail('google')}
      >
        <Image
          src="/gmail-2020.svg"
          alt="Gmail Logo"
          width={0}
          height={0}
          className="mr-2 h-6 w-6 brightness-0 invert filter"
        />
        {req.auth_form.button_2}
      </button>
    </section>
  )
}
