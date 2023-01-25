import { useMemo } from 'react'
import Slider from 'react-slick'
import { sliderSlickContext } from 'src/context'

export const SliderSlickProvider = ({ children, defaultSetting, config }): JSX.Element => {
  let isSwiping = false

  const onSwipe = () => {
    isSwiping = true
    setTimeout(() => {
      isSwiping = false
    }, defaultSetting.speed ?? 500)
  }

  const value = useMemo(
    () => ({
      checkSwiping: () => isSwiping,
    }),
    [],
  )

  return (
    <sliderSlickContext.Provider value={value}>
      <Slider {...defaultSetting} {...config} onSwipe={onSwipe}>
        {children}
      </Slider>
    </sliderSlickContext.Provider>
  )
}
