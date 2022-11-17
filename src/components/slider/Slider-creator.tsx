import { FC } from 'react'
import Slick, { Settings } from 'react-slick'
import { IModule } from '../../types/modules'
import { IPhrase } from '../../types/phrases'
import { ICreateSliderProps, ISliderProps } from '../../types/slider'
import style from './slider.module.scss'

const defaultSetting: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'modulesSlider',
  arrows: false,
}

export function CreateSlider<T extends IModule | IPhrase>({
  title,
  Card,
  config = {},
}: ICreateSliderProps<T>): FC<ISliderProps<T>> {
  return function Slider({ data, ...props }) {
    return (
      <div className={style.slider}>
        {title && <h2 className={style.title}>{title}</h2>}
        <Slick {...defaultSetting} {...config}>
          {data.map((el) => (
            <Card data={el} {...props} key={el.id} />
          ))}
        </Slick>
      </div>
    )
  }
}
