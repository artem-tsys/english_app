import cn from 'classnames'
import style from 'src/components/shared/buttons/buttons.module.scss'

interface ICardButton {
  title: string
  description: string
  image: string
  disable: boolean
  styleName?: string
}

export const CardButton = ({ title, description, image, disable, styleName }: ICardButton) => (
  <button className={cn(style.buttonCard, styleName)} disabled={disable} data-testid="button-card">
    <img src={image} alt="icon" className={style.icon} />
    <h4 className={style.title}>{title}</h4>
    <p className={style.description}>{description}</p>
  </button>
)
