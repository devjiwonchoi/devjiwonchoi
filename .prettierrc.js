const vercelStyleGuide = require('@vercel/style-guide/prettier')

module.exports = {
  ...vercelStyleGuide,

  // My own rules :)
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  plugins: ['prettier-plugin-tailwindcss'],
}
