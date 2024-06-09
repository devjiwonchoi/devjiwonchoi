export const GITHUB_API_URL = 'https://api.github.com'

export async function fetcher({
  endpoint,
  method = 'GET',
  body,
}: {
  endpoint: string
  method?: string
  body?: string
}) {
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

    return await response.json()
  } catch (error) {
    throw error
  }
}
