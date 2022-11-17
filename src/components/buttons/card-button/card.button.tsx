import cn from 'classnames'
import style from './card.button.module.scss'

interface ICardButton {
  title: string
  description: string
  image: string
  disable: boolean
  styleName?: string
}

export const CardButton = ({
  title,
  description,
  image,
  disable,
  styleName,
}: ICardButton) => (
  <button className={cn(style.button, styleName)} disabled={disable}>
    <img src={image} alt="" />
    <h4 className={style.title}>{title}</h4>
    <p className={style.description}>{description}</p>
  </button>
)
