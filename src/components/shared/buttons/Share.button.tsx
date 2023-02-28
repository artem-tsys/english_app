import cn from 'classnames'
import { FC } from 'react'
import style from 'src/components/shared/buttons/buttons.module.scss'

type ButtonType = { styleName?: string }

export const ShareButton: FC<ButtonType> = ({ styleName }) => {
  const clickHandle = () => {
    alert('share')
  }

  return (
    <button onClick={clickHandle} className={cn(style.buttonShare, styleName)}>
      <img src={`${process.env.PUBLIC_URL}/share.png`} className={style.image} alt="share" />
    </button>
  )
}
