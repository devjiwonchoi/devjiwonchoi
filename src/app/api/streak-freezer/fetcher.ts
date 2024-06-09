export async function fetcher({
  endpoint,
  method = 'GET',
  body,
}: {
  endpoint: string
  method?: string
  body?: string
}) {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error('env.GITHUB_ACCESS_TOKEN is not set.')
  }

  if (!endpoint.startsWith('/')) {
    endpoint = `/${endpoint}`
  }

  const GITHUB_API_URL = 'https://api.github.com'
  const url = `${GITHUB_API_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      method,
      body,
    })

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}
