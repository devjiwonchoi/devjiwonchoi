import { fetcher } from './fetcher'

export async function hasActivityToday(username: string) {
  const userEvents: Record<string, string | number | boolean>[] = await fetcher(
    {
      endpoint: `/users/${username}/events`,
    }
  )

  const today = new Date().toISOString().split('T')[0]
  if (!today) {
    throw new Error('Failed to get today.')
  }
  const hasActivity: boolean = userEvents.some(
    (event) => event.public && (event.created_at as string).includes(today)
  )

  return hasActivity
}
