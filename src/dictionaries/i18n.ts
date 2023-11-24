import 'server-only'

const dictionaries: {
  [key: string]: () => Promise<typeof import('./en.json')>
} = {
  en: () => import('./en.json').then((module) => module.default),
  ko: () => import('./ko.json').then((module) => module.default),
  zh: () => import('./zh.json').then((module) => module.default),
}

export const getDictionary = async (lang: string) => dictionaries[lang]()
