import 'server-only'

const dictionaries: {
  [key: string]: () => Promise<typeof import('../dictionaries/en.json')>
} = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ko: () => import('../dictionaries/ko.json').then((module) => module.default),
  zh: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (lang: string) => dictionaries[lang]()

export const i18n = {
  defaultLang: 'en',
  langs: ['ko', 'zh'],
}
