import cn from 'classnames'
import { useEffect } from 'react'
import { SmilingEmoji } from 'src/components/shared/icons/smilling-emoji'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization.module.scss'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { IncrementActiveTermIndex } from 'src/redux/exercises/exercises.slice'
import { popupDataSelector } from 'src/redux/general/common.selectors'
import stylePopup from 'src/styles/popups.module.scss'

export function ExerciseMemorizationSelectedRightAnswer() {
  const dispatch = useAppDispatch()
  const { answer } = useAppSelector(popupDataSelector)

  useEffect(() => {
    setTimeout(() => {
      dispatch(IncrementActiveTermIndex())
    }, 1300)
  }, [])

  return (
    <div className={stylePopup.popup}>
      <div className={cn(stylePopup.popupHeader, style.backgroundSuccess)}>
        <SmilingEmoji className={style.emoji} />
        <p className={style.title}>вы ответили правильно!</p>
      </div>
      <div className={stylePopup.popupContent}>
        <p>{answer.value}</p>
      </div>
    </div>
  )
}
