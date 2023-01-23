import { LanguagesKeys, LanguagesTypes } from 'src/constants/languages.constants'

export enum LanguagesInitialTerm {
  term = 'term',
  translation = 'translation',
}

export type LanguagesInitial = LanguagesKeys | LanguagesInitialTerm

export type ITerm = LanguagesTypes & {
  id: string
}

export type ITermInitial = {
  [key in LanguagesInitial]: string
} & {
  id: string
}

export interface IParamsTerm {
  isLearned: boolean
  questionLanguage: LanguagesKeys
  answerLanguage: LanguagesKeys
}

export interface IMemorizationIds {
  [key: string]: LanguagesKeys[]
}

export interface IAnswer {
  id: string
  value: string
}
