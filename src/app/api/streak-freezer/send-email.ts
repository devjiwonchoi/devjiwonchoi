import { Resend } from 'resend'

export async function sendEmail(statusText: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('env.RESEND_API_KEY is not set.')
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const response = await resend.emails.send({
    from: 'no-reply@jiwonchoi.dev',
    to: 'devjiwonchoi@gmail.com',
    subject: `Streak Freezer Status: ${statusText}`,
    text: 'Check out: https://vercel.com/jiwonchoi/jiwonchoi-dev/logs',
  })

  if (response.error) {
    throw new Error(response.error.message)
  }
}
