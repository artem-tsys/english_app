import cn from 'classnames'
import { useEffect } from 'react'
import { SmilingEmoji } from 'src/components/shared/icons/smilling-emoji'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization.module.scss'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { updateActivePhraseIndex } from 'src/redux/exercises/exercises.slice'
import { HIDE_POPUP } from 'src/redux/general/common'
import { popupDataSelector } from 'src/redux/general/common.selectors'
import stylePopup from 'src/styles/popups.module.scss'

export function ExerciseMemorizationSelectedRightAnswer() {
  const dispatch = useAppDispatch()
  const { answer, nextPhraseId } = useAppSelector(popupDataSelector)

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateActivePhraseIndex(nextPhraseId))
      dispatch(HIDE_POPUP())
    }, 2000)
  }, [])

  return (
    <div className={stylePopup.popup}>
      <div className={cn(stylePopup.popupHeader, style.backgroundSuccess)}>
        <SmilingEmoji className={style.emoji} />
        <p className={style.title}>вы ответили правильно!</p>
      </div>
      <div className={stylePopup.popupContent}>
        <p>{answer}</p>
      </div>
    </div>
  )
}
