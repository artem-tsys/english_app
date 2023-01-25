import { Settings } from 'react-slick'
import { CardComponent } from './modules'

export interface ISliderProps<C> {
  data: C[]
  onClick?: (id: string) => unknown
}

export interface ICreateSliderProps<T> {
  title?: string
  Card: CardComponent<T>
  config?: Settings
}
