module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm build && pnpm start',
      url: ['http://localhost:3000'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.97 }],
        'categories:accessibility': ['error', { minScore: 0.97 }],
        'categories:best-practices': ['error', { minScore: 0.97 }],
        'categories:seo': ['error', { minScore: 0.97 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      // server options here
    },
    wizard: {
      // wizard options here
    },
  },
}
