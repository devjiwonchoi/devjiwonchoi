import { commit } from './commit'
import { hasShipped } from './has-shipped'
import { sendEmail } from './send-email'

export async function GET(request: Request) {
  const username = process.env.GITHUB_USERNAME
  if (!username) {
    await sendEmail('env.GITHUB_USERNAME is not set.')
    return new Response('env.GITHUB_USERNAME is not set.', { status: 403 })
  }

  // See https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) {
    if (await hasShipped(username)) {
      await sendEmail('Has Shipped')
      return new Response('Already shipped today.', { status: 200 })
    }

    const response = await commit(username)
    await sendEmail(response)

    return new Response(response, { status: 201 })
  }

  await sendEmail('Unauthorized')
  return new Response('Unauthorized.', { status: 401 })
}
