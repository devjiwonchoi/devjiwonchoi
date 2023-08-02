import { NextResponse } from "next/server"
import { sendEmail } from '@/utils/sendEmail'

export async function POST(request: Request) {
  const { from, to, subject, text } = await request.json()
  try {
    sendEmail({ from, to, subject, text })
    return NextResponse.json({ message: "Email sent successfully!", success: true })
  } catch (error) {
    return NextResponse.json({ message: "Error sending email", error: error, success: false })
  }
}
