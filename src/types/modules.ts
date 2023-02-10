import { LanguagesKeys } from 'src/constants/languages.constants'
import { IMemorizationIds, ITerm, ITermInitial, LanguagesInitial } from './terms'

export interface IModule {
  title: string
  terms: ITerm[]
  id: string
  languages: [LanguagesKeys, LanguagesKeys]
  exercises: {
    memorization: {
      isLearned: boolean
      round: number
      learnedIds: IMemorizationIds
    }
  }
}

export interface IModuleInitial {
  title: string
  terms: ITermInitial[]
  languages: [LanguagesInitial, LanguagesInitial]
}

export type CardComponent<T> = ({ card, onClick }: { card: T; onClick?: (id: string) => void }) => JSX.Element
