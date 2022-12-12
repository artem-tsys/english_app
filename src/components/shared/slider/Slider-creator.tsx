import { FC } from 'react'
import Slick, { Settings } from 'react-slick'
import { ITerm } from 'src/types/terms'
import { IModule } from 'src/types/modules'
import { ICreateSliderProps, ISliderProps } from 'src/types/slider'
import style from 'src/components/shared/slider/slider.module.scss'

const defaultSetting: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'modulesSlider',
  arrows: false,
}

export function CreateSlider<T extends IModule | ITerm>({
  title,
  Card,
  config = {},
}: ICreateSliderProps<T>): FC<ISliderProps<T>> {
  return function Slider({ data, ...props }) {
    if (!data.length) {
      return null
    }

    return (
      <div className={style.slider}>
        {title && <h2 className={style.title}>{title}</h2>}
        <Slick {...defaultSetting} {...config}>
          {data.map((el) => (
            <Card card={el} {...props} key={el.id} />
          ))}
        </Slick>
      </div>
    )
  }
}
