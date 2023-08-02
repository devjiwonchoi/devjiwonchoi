'use server'

export async function handleRequestForm(
  email: string,
  subject: string,
  message: string
) {
  const data = {
    from: email,
    to: 'devjiwonchoi@gmail.com',
    subject: subject,
    text: 'Sent from devjiwonchoi.codes:\n\n' + message,
  }

  try {
    const response = await fetch(`${process.env.SEND_EMAIL_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return true
    }
  } catch (error) {
    console.error(error)
  }
}
