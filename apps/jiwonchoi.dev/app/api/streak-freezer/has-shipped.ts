import { fetchGitHubAPI } from '@/utils/fetch-github-api'

export async function hasShipped(username: string) {
  const userEvents = await fetchGitHubAPI({
    endpoint: `/users/${username}/events`,
  })

  const today = new Date().toISOString().split('T')[0]! // YYYY-MM-DD

  return userEvents.some(
    (event: { public: boolean; created_at: string; type: string }) =>
      // is public
      event.public &&
      // is today
      event.created_at.startsWith(today) &&
      // is push
      event.type === 'PushEvent'
  ) as boolean
}
