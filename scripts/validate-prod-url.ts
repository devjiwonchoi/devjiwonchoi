import { join } from 'path'

export async function isValidURL(url: string) {
  try {
    new URL(url)
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch (error) {
    console.error(error)
    return false
  }
}

const nextjsDocsJSON = join(process.cwd(), 'public', 'json', 'nextjs-docs.json')
const nextjsErrorsJSON = join(
  process.cwd(),
  'public',
  'json',
  'nextjs-errors.json'
)

async function validateProdURL(jsonPath: string) {
  const json = require(jsonPath)
  if (!Array.isArray(json)) {
    console.error(`${jsonPath} is not an array.`)
    return
  }

  const invalids: string[] = []
  const start = Date.now()
  try {
    const job = json.map(async ({ prodUrl }) => {
      const isValid = await isValidURL(prodUrl)
      if (!isValid) {
        invalids.push(prodUrl)
      }
      console.log(`${isValid ? '✅' : '❌'} ${prodUrl}`)
    })

    await Promise.all(job)
  } finally {
    console.log(`Finished in ${Date.now() - start}ms`)
    console.log(`Invalid URLs: ${JSON.stringify(invalids, null, 2)}`)
  }
}

async function main() {
  validateProdURL(nextjsErrorsJSON)
  validateProdURL(nextjsDocsJSON)
}

main().catch(console.error)
