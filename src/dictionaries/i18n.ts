import 'server-only'

const dictionaries: {
  [key: string]: () => Promise<typeof import('./en.json')>
} = {
  en: () => import('./en.json').then((module) => module.default),
  ko: () => import('./en.json').then((module) => module.default),
  zh: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (lang: string) => dictionaries[lang]()

export const i18n = {
  defaultLang: 'en',
  langs: ['ko', 'zh'],
}