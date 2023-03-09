import { LanguagesKeys } from 'src/types/languages'
import { ITerm } from './terms'

export interface IModule {
  title: string
  terms: ITerm[]
  id: string
  languages: {
    lang1: LanguagesKeys
    lang2: LanguagesKeys
  }
  exercises: {
    memorization: {
      round: number
      isLearned: boolean
      learnedIds: string[]
    }
  }
}

export interface IModuleInitial {
  title?: string
  terms: ITerm[]
  languages: {
    lang1: LanguagesKeys
    lang2: LanguagesKeys
  }
}
