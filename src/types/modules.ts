import { IPhrase } from './phrases'

export interface IModule {
  title: string
  phrases: IPhrase[]
  id: string
}

export type CardComponent<T> = ({ data }: { data: T }) => JSX.Element
