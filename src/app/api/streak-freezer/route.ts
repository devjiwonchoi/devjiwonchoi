import type { NextRequest } from 'next/server'
import { commit } from './commit'
import { hasShipped } from './has-shipped'
import { sendEmail } from './send-email'

export async function GET(request: NextRequest) {
  // See https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    const username = 'devjiwonchoi'

    if (await hasShipped(username)) {
      await sendEmail({ subject: 'Has Shipped' })
      return new Response('Already shipped today.', { status: 200 })
    }

    const response = await commit(username)
    await sendEmail({ subject: response })

    return new Response(response, { status: 201 })
  }

  const unauthorizedRequest = {
    ip: request.ip,
    country: request.geo?.country,
    city: request.geo?.city,
    region: request.geo?.region,
    latitude: request.geo?.latitude,
    longitude: request.geo?.longitude,
    userAgent: request.headers.get('user-agent'),
  }

  await sendEmail({
    subject: 'Unauthorized',
    text: `Unauthorized Request: ${JSON.stringify(unauthorizedRequest, null, 2)}`,
  })
  return new Response('Unauthorized.', { status: 401 })
}
