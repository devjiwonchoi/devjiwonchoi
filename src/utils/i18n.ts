import 'server-only'

const dictionaries: {
  [key: string]: () => Promise<typeof import('../dictionaries/en.json')>
} = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ko: () => import('../dictionaries/ko.json').then((module) => module.default),
  zh: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (lang: string) =>
  i18n.langs.includes(lang)
    ? dictionaries[lang]()
    : dictionaries[i18n.defaultLang]()

export const i18n = {
  defaultLang: 'en',
  langs: ['en', 'ko', 'zh'],
}
