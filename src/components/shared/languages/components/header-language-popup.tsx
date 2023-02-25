import { ComebackButton } from 'src/components/shared/buttons/Comeback.button'
import style from 'src/components/shared/languages/languages.module.scss'
import { useAppDispatch } from 'src/hooks/redux'
import { HIDE_MODAL } from 'src/redux/general/common.slice'

export const HeaderLanguagePopup = ({ children }): JSX.Element => {
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(HIDE_MODAL())
  }

  return (
    <header className={style.header}>
      <div className={style.btnBack}>
        <ComebackButton onClick={onClick} />
      </div>
      {children}
    </header>
  )
}
