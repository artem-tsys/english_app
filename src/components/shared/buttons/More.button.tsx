import cn from 'classnames'
import { FC } from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

type ButtonProp = { styleName?: string }

export const MoreButton: FC<ButtonProp> = ({ styleName }) => {
  const clickHandle = () => {
    alert('more')
  }

  return (
    <button onClick={clickHandle} className={cn(style.buttonMore, styleName)}>
      <img src={`${process.env.PUBLIC_URL}/more.png`} alt="more" className={style.image} />
    </button>
  )
}
