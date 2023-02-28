import cn from 'classnames'
import { FC, useEffect } from 'react'
import { SmilingEmoji } from 'src/components/shared/icons/smilling-emoji'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization-selected-right-answer/exercise-memorization-selected-right-answer.module.scss'
import { Substrate } from 'src/components/shared/popups/substrate'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { activeTermForward } from 'src/redux/exercises/exercises.slice'
import { modalDataSelector } from 'src/redux/general/common.selectors'
import stylePopup from 'src/styles/popups.module.scss'

export const SelectedRightAnswer: FC = () => {
  const dispatch = useAppDispatch()
  const { answer, questionLanguage, termId } = useAppSelector(modalDataSelector)

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(activeTermForward({ id: termId, value: questionLanguage }))
    }, 1300)
  }, [])

  return (
    <>
      <div className={stylePopup.popup}>
        <div className={cn(stylePopup.popupHeader, style.backgroundSuccess)}>
          <SmilingEmoji className={style.emoji} />
          <p className={style.title}>вы ответили правильно!</p>
        </div>
        <div className={stylePopup.popupContent}>
          <p>{answer.value}</p>
        </div>
      </div>
      <Substrate />
    </>
  )
}
