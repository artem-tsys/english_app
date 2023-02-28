import { LanguagesInitial, LanguagesKeys } from 'src/types/languages'
import { ITerm, ITermInitial } from './terms'

export interface IModule {
  title: string
  terms: ITerm[]
  id: string
  languages: [LanguagesKeys, LanguagesKeys]
  exercises: {
    memorization: {
      round: number
      isLearned: boolean
      learnedIds: string[]
    }
  }
}

export interface IModuleInitial {
  title: string
  terms: ITermInitial[]
  languages: LanguagesInitial
}
