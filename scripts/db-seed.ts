import type { Embedding } from 'ai'
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

async function seedDocs() {
  console.log('Started Seeding Docs')

  const client = createClient()
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

  const docs: NextDoc[] = require('public/json/nextjs-docs.json')
  const chunkSize = 100

  const errorJobs = []
  for (let i = 0; i < docs.length; i += chunkSize) {
    const chunk = docs.slice(i, i + chunkSize)
    const values = chunk
      .map(
        (doc) =>
          `('${doc.sha}', '${doc.prodUrl}', '${doc.docUrl}', ARRAY${pgvector.toSql(doc.embedding)})`
      )
      .join(', ')
    errorJobs.push(
      client.query(
        `INSERT INTO docs (sha, prod_url, doc_url, embedding) VALUES ${values}`
      )
    )
  }

  await Promise.all(errorJobs)

  await client.query(
    'CREATE INDEX ON docs USING hnsw (embedding vector_l2_ops)'
  )

  console.log('Ended Seeding Docs')

  await client.end()
}

async function seedErrors() {
  console.log('Started Seeding Errors')

  const client = createClient()
  await client.connect()

  await client.query('CREATE EXTENSION IF NOT EXISTS vector')
  await pgvector.registerType(client)

  await client.query('DROP TABLE IF EXISTS errors')
  await client.query(
    `CREATE TABLE errors (
      id BIGSERIAL NOT NULL PRIMARY KEY,
      sha VARCHAR(100) NOT NULL,
      prod_url VARCHAR(200),
      doc_url VARCHAR(200),
      embedding vector(1536)
    );`
  )

  const errors: NextDoc[] = require('public/json/nextjs-errors.json')
  const chunkSize = 100

  const errorJobs = []
  for (let i = 0; i < errors.length; i += chunkSize) {
    const chunk = errors.slice(i, i + chunkSize)
    const values = chunk
      .map(
        (doc) =>
          `('${doc.sha}', '${doc.prodUrl}', '${doc.docUrl}', ARRAY${pgvector.toSql(doc.embedding)})`
      )
      .join(', ')
    errorJobs.push(
      client.query(
        `INSERT INTO errors (sha, prod_url, doc_url, embedding) VALUES ${values}`
      )
    )
  }

  await Promise.all(errorJobs)

  await client.query(
    'CREATE INDEX ON docs USING hnsw (embedding vector_l2_ops)'
  )

  console.log('Ended Seeding Errors')

  await client.end()
}

async function seedEmbeddings() {
  await seedDocs()
  await seedErrors()
}

seedEmbeddings()
