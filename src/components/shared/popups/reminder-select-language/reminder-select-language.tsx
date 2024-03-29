import { FC, useEffect } from 'react'
import style from 'src/components/shared/popups/reminder-select-language/reminder-select-language.module.scss'
import { Substrate } from 'src/components/shared/popups/substrate'
import { useAppDispatch } from 'src/hooks/redux'
import { HIDE_MODAL } from 'src/redux/general/common.slice'

export const ReminderSelectLanguage: FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch(HIDE_MODAL())
    }, 1200)
  }, [dispatch])

  return (
    <>
      <div className={style.container}>
        <div className={style.title}>select language</div>
      </div>
      <Substrate />
    </>
  )
}
