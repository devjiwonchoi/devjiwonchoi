import type { Embedding } from 'ai'
import type { NextDoc } from './fetch-docs'
import dotenv from 'dotenv'
import pgvector from 'pgvector/pg'
import { Client } from 'pg'

dotenv.config({ path: ['.env.local', '.env.development.local'] })

if (!process.env.OPENAI_API_KEY) {
  throw new Error('process.env.OPENAI_API_KEY is not defined. Please set it.')
}

if (!process.env.POSTGRES_URL) {
  throw new Error('process.env.POSTGRES_URL is not defined. Please set it.')
}

async function seed() {
  const client = new Client({
    ssl: false,
    connectionString: 'postgres://devjiwonchoi:test@localhost:5432/test',
  })
  await client.connect()

  await client.query('CREATE EXTENSION IF NOT EXISTS vector')
  await pgvector.registerType(client)

  await client.query('DROP TABLE IF EXISTS docs')
  await client.query(
    `CREATE TABLE docs (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      sha VARCHAR(100) NOT NULL,
      prod_url VARCHAR(200),
      doc_url VARCHAR(200),
      embedding vector(1536)
    );`
  )

  const docsJson: NextDoc[] = require('public/json/nextjs-docs.json')

  await client.query(
    `INSERT INTO docs (prod_url, embedding) VALUES ${docsJson
      .map((doc) => `('${doc.prodUrl}', ARRAY${pgvector.toSql(doc.embedding)})`)
      .join(', ')}`
  )

  await client.query(
    'CREATE INDEX ON docs USING hnsw (embedding vector_l2_ops)'
  )

  await client.end()
}

seed().catch(console.error)
