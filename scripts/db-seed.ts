import type { NextDoc } from './fetch-docs'
import dotenv from 'dotenv'
import pgvector from 'pgvector/pg'
import { createClient } from '@vercel/postgres'

dotenv.config({ path: ['.env.local', '.env.development.local'] })

if (!process.env.OPENAI_API_KEY) {
  throw new Error('process.env.OPENAI_API_KEY is not defined. Please set it.')
}

if (!process.env.POSTGRES_URL) {
  throw new Error('process.env.POSTGRES_URL is not defined. Please set it.')
}

async function seed(docType: 'docs' | 'errors') {
  console.log(`Started Seeding ${docType}`)

  const client = createClient()
  await client.connect()

  await client.query('CREATE EXTENSION IF NOT EXISTS vector')
  await pgvector.registerType(client)

  await client.query(`DROP TABLE IF EXISTS ${docType}`)
  await client.query(
    `CREATE TABLE ${docType} (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      sha VARCHAR(100) NOT NULL,
      prod_url VARCHAR(200),
      content TEXT,
      embedding vector(1536)
    );`
  )

  // TODO: chunk by 100, find a way to escape `'` in content
  const json: NextDoc[] = require(`public/json/nextjs-${docType}.json`)
  const jobs = json.map((data) => {
    client.query(
      `INSERT INTO ${docType} (sha, prod_url, content, embedding) VALUES ($1, $2, $3, $4)`,
      [data.sha, data.prodUrl, data.content, pgvector.toSql(data.embedding)]
    )
  })

  await Promise.all(jobs)

  await client.query(
    `CREATE INDEX ON ${docType} USING hnsw (embedding vector_l2_ops)`
  )

  console.log(`Ended Seeding ${docType}`)

  await client.end()
}

async function main() {
  await seed('docs')
  await seed('errors')
}

main().catch(console.error)
