import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

export async function sendEmail({
  from = 'no-reply@devjiwonchoi.com',
  to = 'devjiwonchoi@gmail.com',
  subject,
  text = 'Check out: https://vercel.com/jiwonchoi/one/logs',
}: {
  from?: string
  to?: string
  subject: string
  text?: string
}) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const response = await resend.emails.send({
    from,
    to,
    subject,
    text,
  })

  if (response.error) {
    return new Response(response.error.message, { status: 500 })
  }
}
