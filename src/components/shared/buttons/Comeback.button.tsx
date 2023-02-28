import cn from 'classnames'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import style from 'src/components/shared/buttons/buttons.module.scss'

type ButtonProps = { styleName?: string; onClick? }

export const ComebackButton: FC<ButtonProps> = ({ styleName, onClick }: ButtonProps) => {
  const navigate = useNavigate()
  const clickHandler = onClick || (() => navigate(-1))

  return (
    <button onClick={clickHandler} className={cn(style.buttonBack, styleName)} data-testid="btn-back">
      <img src={`${process.env.PUBLIC_URL}/left-arrow.png`} className={style.image} alt="back" />
    </button>
  )
}
