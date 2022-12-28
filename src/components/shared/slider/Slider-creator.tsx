import { FC } from 'react'
import Slider, { Settings } from 'react-slick'
import style from 'src/components/shared/slider/slider.module.scss'
import { IModule } from 'src/types/modules'
import { ICreateSliderProps, ISliderProps } from 'src/types/slider'
import { ITerm } from 'src/types/terms'

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
  return function Slick({ data, ...props }) {
    if (!data.length) {
      return null
    }

    return (
      <div className={style.slider}>
        {title && (
          <h2 className={style.title} data-testid={`slider-title-${title}`}>
            {title}
          </h2>
        )}
        <Slider {...defaultSetting} {...config}>
          {data.map((el) => (
            <Card card={el} {...props} key={el.id} />
          ))}
        </Slider>
      </div>
    )
  }
}
