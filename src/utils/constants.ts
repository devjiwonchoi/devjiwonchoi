export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const PROD_BASE_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? 'www.jiwonchoi.dev'}`