import { ITerm, Languages } from './terms'

export interface IModule {
  title: string
  terms: ITerm[]
  id: string
  languages: [Languages, Languages]
}

export type CardComponent<T> = ({ card }: { card: T }) => JSX.Element
