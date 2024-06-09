import { fetcher } from './fetcher'

async function validateUsername(username: string) {
  const response = await fetcher({
    endpoint: `/users/${username}`,
  })

  return response.login === username
}

async function getSha(username: string) {
  const response = await fetcher({
    endpoint: `/repos/${username}/${username}/contents/github-streak-freezer.md`,
  })

  return response.sha
}

const content = `
### What is this?

See https://github.com/devjiwonchoi/vercel-cron-github-streak-freezer

The latest streak freezed was: ${new Date().toISOString()}
`

async function createOrUpdateFile(username: string) {
  const response = await fetcher({
    endpoint: `/repos/${username}/${username}/contents/github-streak-freezer.md`,
    method: 'PUT',
    body: JSON.stringify({
      message: `chore: github streak freezed!`,
      content: Buffer.from(content).toString('base64'),
      sha: await getSha(username),
    }),
  })

  return response
}

export async function commit(username: string) {
  if (!(await validateUsername(username))) {
    throw new Error(`Invalid username: "${username}".`)
  }

  const response = await createOrUpdateFile(username)
  if (!response.content.name) {
    throw new Error('Failed to commit.')
  }

  return 'Successfully committed!'
}
