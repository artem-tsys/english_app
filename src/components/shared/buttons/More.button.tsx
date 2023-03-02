import cn from 'classnames'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import style from 'src/components/shared/buttons/buttons.module.scss'

type ButtonProp = { styleName?: string }

export const MoreButton: FC<ButtonProp> = ({ styleName }) => {
  const navigate = useNavigate()

  const clickHandle = () => {
    // :todo change handler to call popup
    navigate('edit-module')
  }

  return (
    <button onClick={clickHandle} className={cn(style.buttonMore, styleName)}>
      <img src={`${process.env.PUBLIC_URL}/more.png`} alt="more" className={style.image} />
    </button>
  )
}
