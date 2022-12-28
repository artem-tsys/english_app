import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import style from 'src/components/shared/buttons/buttons.module.scss'

type Button = (props: { styleName?: string }) => JSX.Element

export const ComebackButton: Button = ({ styleName }) => {
  const navigate = useNavigate()
  const clickHandler = () => navigate(-1)

  return (
    <button onClick={clickHandler} className={cn(style.buttonBack, styleName)} data-testid="btn-back">
      <img src={`${process.env.PUBLIC_URL}/left-arrow.png`} className={style.image} alt="back" />
    </button>
  )
}
