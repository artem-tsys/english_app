import cn from 'classnames'
import style from 'src/components/shared/buttons/buttons.module.scss'

type Button = (props: { styleName?: string }) => JSX.Element

export const ShareButton: Button = ({ styleName }) => {
  const clickHandle = () => {
    // eslint-disable-next-line no-alert
    alert('share')
  }

  return (
    <button onClick={clickHandle} className={cn(style.buttonShare, styleName)}>
      <img src={`${process.env.PUBLIC_URL}/share.png`} className={style.image} alt="share" />
    </button>
  )
}
