'use server'
import nodemailer, { Transporter } from 'nodemailer'

export async function sendEmailToMe(
  email: string,
  subject: string,
  message: string,
) {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
    secure: process.env.NODE_ENV === 'production',
    disableFileAccess: true,
    disableUrlAccess: true,
  })
  const mailOption = {
    from: email,
    to: 'devjiwonchoi@gmail.com',
    subject,
    text: `Sent from jiwonchoi.dev:\nemail:${email}\n\n${  message}`,
  }

  try {
    const info = await transporter.sendMail(mailOption)
    if (info.accepted.length > 0) {
      return {
        message: 'Email sent successfully!',
        response: info.response,
        status: 'ACCEPTED',
      }
    }
    if (info.pending.length > 0) {
      return {
        message: 'Email pending',
        response: info.response,
        status: 'PENDING',
      }
    }
    if (info.rejected.length > 0) {
      return {
        message: 'Email rejected',
        response: info.response,
        status: 'REJECTED',
      }
    }
  } catch (error) {
    console.error(error)
  }

  
}
