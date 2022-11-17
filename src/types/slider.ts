import { Settings } from 'react-slick'
import { CardComponent } from './modules'

export interface ISliderProps<C> {
  data: C[]
  handleClick?: (id: string) => () => void
}

export interface ICreateSliderProps<T> {
  title?: string
  Card: CardComponent<T>
  config?: Settings
}
