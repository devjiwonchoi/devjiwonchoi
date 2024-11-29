import { fetchGitHubAPI } from '@/utils/fetch-github-api'

async function validateUsername(username: string) {
  const user = await fetchGitHubAPI({
    endpoint: `/users/${username}`,
  })

  return user.login === username
}

async function getSha(username: string) {
  const repo = await fetchGitHubAPI({
    endpoint: `/repos/${username}/${username}-legacy/contents/github-streak-freezer.md`,
  })

  return repo.sha
}

const content = `
### What is this?

See https://github.com/devjiwonchoi/devjiwonchoi

The latest streak freezed was: ${new Date().toISOString()}
`

async function createOrUpdateFile(username: string) {
  const sha = await getSha(username)
  const response = await fetchGitHubAPI({
    endpoint: `/repos/${username}/${username}-legacy/contents/github-streak-freezer.md`,
    method: 'PUT',
    body: JSON.stringify({
      message: 'chore: github streak freezed!',
      content: Buffer.from(content).toString('base64'),
      sha,
    }),
  })

  return response
}

export async function commit(username: string) {
  if (!username || !(await validateUsername(username))) {
    throw new Error(`Invalid username: "${username}".`)
  }

  const response = await createOrUpdateFile(username)
  if (response.content.name) {
    return 'Success'
  }

  return 'Failed'
}
