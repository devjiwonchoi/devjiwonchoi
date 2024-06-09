/**
 * Fetches data from the GitHub API.
 *
 * @param {object} options - The options for the API request.
 * @param {string} options.endpoint - The API endpoint to fetch data from.
 * @param {string} [options.method='GET'] - The HTTP method for the request.
 * @param {string} [options.body] - The request body.
 * @returns {Promise<any>} - The response data from the API.
 * @throws {Error} - If the GITHUB_ACCESS_TOKEN environment variable is not set or if there is an error during the API request.
 */
export async function fetchGitHubAPI({
  endpoint,
  url,
  method = 'GET',
  body,
}: {
  endpoint?: string
  url?: string
  method?: string
  body?: string
}) {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error('env.GITHUB_ACCESS_TOKEN is not set.')
  }

  const GITHUB_API_URL = 'https://api.github.com'
  url ??= `${GITHUB_API_URL}${endpoint}`

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
