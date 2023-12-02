import { sendEmailToMe } from '@/utils'
import { SubmitButton } from './buttons/SubmitButton'

export function RequestForm({
  email,
  dictionary: { req },
}: {
  dictionary: typeof import('@/dictionaries/en.json')
  email?: string | null
}) {
  const handleSubmit = async (formData: FormData) => {
    'use server'
    const { email, subject, text } = Object.fromEntries(formData)
    try {
      const response = await sendEmailToMe(
        email as string,
        subject as string,
        text as string,
      )
      return response
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.name} ${error.message}`)
      }
    }
  }

  return (
    <>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-neutral-100 sm:text-3xl">
        {req.reqForm.h2}
      </h2>
      <form action={handleSubmit} className="content-center space-y-8">
        <div>
          <label
            className="mb-2 block text-sm font-medium text-neutral-300"
            htmlFor="email"
          >
            {req.reqForm.label_1}
          </label>
          <input
            className="block w-full appearance-none border-b border-neutral-200 bg-transparent p-2.5 text-sm text-neutral-200 shadow-sm focus:outline-none"
            defaultValue={email ?? ''}
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
            type="email"
          />
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-medium text-neutral-300"
            htmlFor="subject"
          >
            {req.reqForm.label_2}
          </label>
          <input
            className="block w-full appearance-none border-b border-neutral-200 bg-transparent p-2.5 text-sm text-neutral-200 shadow-sm focus:outline-none"
            id="subject"
            name="subject"
            placeholder={req.reqForm.input_1}
            required
            type="text"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            className="mb-4 block text-sm font-medium text-neutral-300"
            htmlFor="text"
          >
            {req.reqForm.label_3}
          </label>
          <textarea
            className="block w-full appearance-none border border-neutral-200 bg-transparent p-2.5 text-sm text-neutral-200 shadow-sm focus:outline-none"
            id="text"
            name="text"
            placeholder={req.reqForm.input_2}
            rows={6}
          />
        </div>
        <SubmitButton
          defaultText={req.reqForm.button_default}
          pendingText={req.reqForm.button_pending}
        />
      </form>
    </>
  )
}
