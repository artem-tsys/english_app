import { LanguagesInitial, LanguagesKeys, LanguagesTypes } from 'src/types/languages'

export type ITerm = LanguagesTypes & {
  id: string
}

export type ITermInitial = {
  [key in keyof LanguagesInitial]: string
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
