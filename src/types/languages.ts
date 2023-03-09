import { LANGUAGES } from 'src/constants/languages.constants'

export type LanguagesKeys = keyof typeof LANGUAGES
export type LanguagesTypes = {
  [key in keyof typeof LANGUAGES]: string
}

export type Languages = {
  lang1: LanguagesKeys
  lang2: LanguagesKeys
}
