import { hasActivityToday } from './has-activity-today'
import { commit } from './commit'

export async function GET(request: Request) {
  const username = process.env.GITHUB_USERNAME
  if (!username) {
    return new Response('env.GITHUB_USERNAME is not set.', { status: 403 })
  }

  // See https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized.', { status: 401 })
  }

  if (await hasActivityToday(username)) {
    return new Response('Activity found for today.', { status: 200 })
  }

  const response = await commit(username)
  return new Response(response, { status: 201 })
}
