import { join } from 'path'
import { writeFile } from 'fs/promises'

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

async function validateProdURL({
  jsonPath,
  docType,
}: {
  jsonPath: string
  docType: string
}) {
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

    if (invalids.length > 0) {
      await writeFile(
        join(
          process.cwd(),
          'public',
          'json',
          docType === 'errors'
            ? 'nextjs-errors-invalid-urls.json'
            : 'nextjs-docs-invalid-urls.json'
        ),
        JSON.stringify(invalids, null, 2)
      )
    }
  }
}

async function main() {
  validateProdURL({
    jsonPath: join(process.cwd(), 'public', 'json', 'nextjs-docs.json'),
    docType: 'docs',
  })

  validateProdURL({
    jsonPath: join(process.cwd(), 'public', 'json', 'nextjs-errors.json'),
    docType: 'errors',
  })
}

main().catch(console.error)
