import { existsSync } from 'fs'
import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'

async function main() {
  const dotConfigPath = join(process.cwd(), '.config')
  if (!existsSync(dotConfigPath)) {
    console.log('No .config directory found')
    return
  }
  const dirents = await readdir(dotConfigPath, { withFileTypes: true })
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      // TODO: recursive
      continue
    }
    if (dirent.isFile()) {
      const content = await readFile(join(dotConfigPath, dirent.name), 'utf-8')
      const location = join(process.cwd(), dirent.name)
      await writeFile(location, content, 'utf-8')
    }
  }

  console.log('Done')
}

main().catch(console.error)
