import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const source = await readFile(resolve(`src/docs/hello.mdx`), 'utf8')
  return NextResponse.json({ source })
}
