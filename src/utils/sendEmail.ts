'use server'
import nodemailer, { Transporter } from 'nodemailer'

export type MailOptions = {
  from: string
  to: string
  subject: string
  text: string
}

export async function sendEmail({
  from,
  to,
  subject,
  text,
}: MailOptions): Promise<void> {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({ from, to, subject, text })
    console.log('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
