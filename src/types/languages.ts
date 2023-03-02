import { LANGUAGES } from 'src/constants/languages.constants'

export type LanguagesKeys = keyof typeof LANGUAGES
export type LanguagesTypes = {
  [key in keyof typeof LANGUAGES]: string
}

export type LanguagesInitialTerm = {
  term: 'term'
  translation: 'translation'
}

export type InitialType = LanguagesKeys | keyof LanguagesInitialTerm

export type Languages = [LanguagesKeys, LanguagesKeys]
export type LanguagesInitial = [InitialType, InitialType]
