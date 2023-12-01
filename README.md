# 🚧 jiwonchoi.dev

My portfolio built with all you can expect from Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdevjiwonchoi%2Fjiwonchoi.dev)

## Vercel Products

### Open-Source

- [x] **Framework**: [Next.js](https://nextjs.org)
- [x] **Fetch Data**: [SWR](https://swr.vercel.app)
- [x] **Authentication**: [NextAuth.js](https://next-auth.js.org)
- [ ] **AI**: [Vercel AI](https://vercel.com/ai)
- [ ] **V0**: [Vercel V0](https://v0.dev)
- [ ] **DevEx**: [Turbopack](https://turbo.build/pack/docs)
- [ ] **Documentation**: [MDX](https://mdxjs.com)
- [x] **Font**: [Geist](https://vercel.com/font)

### Dashboard

- [x] **Development**: [Vercel CLI](https://vercel.com/cli)
- [x] **Deployment**: [Vercel](https://vercel.com)
- [ ] **Database**: [Vercel Postgres](https://vercel.com/storage/postgres)
- [ ] **Blob Storage**: [Vercel Blob](https://vercel.com/storage/blob)
- [ ] **Edge Config**: [Vercel Edge Config](https://vercel.com/storage/edge-config)
- [x] **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- [x] **Domain**: [Vercel Domains](https://vercel.com/domains)

## and more...

- [ ] **ORM**: [Prisma](https://prisma.io)
- [ ] **Email**: [Nodemailer](https://nodemailer.com)
- [x] **Testing**: [Playwright](https://playwright.dev)
- [ ] **CI**: [GitHub Actions](https://github.com/features/actions)
- [x] **Styling**: [Tailwind CSS](https://tailwindcss.com)
- [x] **Lint**: [ESLint](https://eslint.org)
- [x] **Format**: [Prettier](https://prettier.io)

## Queries

```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  tags TEXT[] NOT NULL,
  content TEXT NOT NULL,
  views INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)
```
