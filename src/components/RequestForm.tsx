'use client'
import { SubmitButton } from './Buttons/SubmitButton'
import { sendEmailToMe } from '@/utils'

export function RequestForm({ email }: { email?: string | null }) {
  const handleSubmit = async (formData: FormData) => {
    const { email, subject, text } = Object.fromEntries(formData)
    try {
      const response = await sendEmailToMe(
        email as string,
        subject as string,
        text as string
      )
      if (response) {
        alert(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h2 className="mb-6 text-neutral-100 text-2xl tracking-tight font-bold sm:text-3xl">
        Request
      </h2>
      <form action={handleSubmit} className="space-y-8 content-center">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="appearance-none focus:outline-none shadow-sm bg-transparent border-b border-neutral-200 text-neutral-200 text-sm block w-full p-2.5"
            defaultValue={email ?? ''}
            placeholder="example@gmail.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="appearance-none focus:outline-none shadow-sm bg-transparent border-b border-neutral-200 text-neutral-200 text-sm block w-full p-2.5"
            placeholder="Let me know how I can help you"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="text"
            className="block mb-4 text-sm font-medium text-neutral-300"
          >
            Your message
          </label>
          <textarea
            id="text"
            name="text"
            rows={6}
            className="appearance-none focus:outline-none bg-transparent block p-2.5 w-full text-sm text-neutral-200 shadow-sm border border-neutral-200"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <SubmitButton />
      </form>
    </>
  )
}
