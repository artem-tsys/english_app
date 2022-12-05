import React from 'react'
import { ExerciseMemorizationSelectedRightAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-selected-right-answer'
import { ExerciseMemorizationWrongAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-wrong-answer'
import { PopupName } from 'src/constants/popups.constans'
import { useAppSelector } from 'src/hooks/redux'
import { popupNameSelector } from 'src/redux/general/common.selectors'
import style from 'src/styles/popups.module.scss'

const popupsConfig: Record<PopupName, any> = {
  EXERCISE_MEMORIZATION_SELECTED_SUCCESS: ExerciseMemorizationSelectedRightAnswer,
  EXERCISE_MEMORIZATION_SELECTED_FAILED: ExerciseMemorizationWrongAnswer,
  EXERCISE_MEMORIZATION_FINISH_ROUND: ExerciseMemorizationWrongAnswer,
}

export const PopupManager = React.memo(() => {
  const shownPopupName = useAppSelector(popupNameSelector)
  const PopupToShow = popupsConfig[shownPopupName]
  const hasPopupToShow = shownPopupName && PopupToShow

  if (!hasPopupToShow) return null

  return (
    <div className={style.backdrop}>
      <PopupToShow />
    </div>
  )
})
