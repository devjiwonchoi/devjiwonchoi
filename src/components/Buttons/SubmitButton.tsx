'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="border border-neutral-200 bg-transparent px-5 py-3 text-center text-sm font-medium text-neutral-200 transition duration-150 ease-in-out hover:bg-neutral-800 sm:w-fit"
      disabled={pending}
    >
      {pending ? 'Sending Message...' : 'Send Message'}
    </button>
  )
}
