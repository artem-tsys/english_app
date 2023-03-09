import { LanguagesKeys } from 'src/types/languages'

export type ITerm = {
  id: string
  lang1: string
  lang2: string
}

export interface IParamsTerm {
  isLearned: boolean
  questionLanguageKey: string
  answerLanguageKey: string
}

export interface IMemorizationIds {
  [key: string]: LanguagesKeys[]
}

export interface IAnswer {
  id: string
  value: string
}
