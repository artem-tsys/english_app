export enum Languages {
  ru = 'ru',
  en = 'en',
}

export type ITerm = {
  [key in Languages]: string
} & {
  id: string
}

export interface IParamsTerm {
  isLearned: boolean
  questionLanguage: Languages
  answerLanguage: Languages
}

export interface IMemorizationIds {
  [key: string]: Languages[]
}

export interface IAnswer {
  id: string
  value: string
}
