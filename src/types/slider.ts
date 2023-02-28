import { FC } from 'react'
import { Settings } from 'react-slick'

export interface ISliderProps<C> {
  data: C[]
  onClick?: (id: string) => unknown
}

export type ISliderCardComponentProps<T> = {
  card: T
  onClick?: (id: string) => void
}

export interface ICreateSliderProps<T> {
  title?: string
  Card: FC<ISliderCardComponentProps<T>>
  config?: Settings
}
