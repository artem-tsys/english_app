import { createContext } from 'react'

interface ISliderSlickContext {
  checkSwiping: () => boolean
}

export const sliderSlickContext = createContext<ISliderSlickContext>(null)
