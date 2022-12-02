import cn from 'classnames'
import style from 'src/components/shared/buttons/buttons.module.scss'

type Button = (props: { styleName?: string }) => JSX.Element

export const MoreButton: Button = ({ styleName }): JSX.Element => {
  const clickHandle = () => {
    alert('more')
  }

  return (
    <button onClick={clickHandle} className={cn(style.buttonMore, styleName)}>
      <img src={`${process.env.PUBLIC_URL}/more.png`} alt="more" className={style.image} />
    </button>
  )
}
