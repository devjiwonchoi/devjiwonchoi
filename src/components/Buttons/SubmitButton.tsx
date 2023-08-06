'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="py-3 px-5 text-sm font-medium text-center text-neutral-200 border border-neutral-200 bg-transparent sm:w-fit hover:bg-neutral-800 transition ease-in-out duration-150"
      disabled={pending}
    >
      {pending ? 'Sending Message...' : 'Send Message'}
    </button>
  )
}
