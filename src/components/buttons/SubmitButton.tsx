'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton({
  defaultText,
  pendingText,
}: {
  defaultText: string
  pendingText: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      className="border border-neutral-200 bg-transparent px-5 py-3 text-center text-sm font-medium text-neutral-200 transition duration-150 ease-in-out hover:bg-neutral-800 sm:w-fit"
      disabled={pending}
      type="submit"
    >
      {pending ? pendingText : defaultText}
    </button>
  )
}
