import cn from 'classnames'
import style from './more-button.module.scss'

type Button = (props: { styleName?: string }) => JSX.Element

export const MoreButton: Button = ({ styleName }): JSX.Element => {
  const clickHandle = () => {
    alert('more')
  }

  return (
    <button onClick={clickHandle} className={cn(style.more, styleName)}>
      <img
        src={`${process.env.PUBLIC_URL}/more.png`}
        alt="more"
        className={style.image}
      />
    </button>
  )
}
