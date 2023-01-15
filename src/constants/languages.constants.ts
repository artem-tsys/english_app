export const LANGUAGES = {
  ua: 'украинский',
  en: 'англайский',
  fr: 'французкий',
}

export type LanguagesKeys = keyof typeof LANGUAGES
export type LanguagesTypes = {
  [key in keyof typeof LANGUAGES]: string
}
