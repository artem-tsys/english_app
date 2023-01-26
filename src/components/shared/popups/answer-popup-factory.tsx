import React, { FC, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { ExerciseMemorizationSelectedRightAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-selected-right-answer'
import { ExerciseMemorizationWrongAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-wrong-answer'
import { ReminderSelectLanguage } from 'src/components/shared/popups/reminder-select-language/reminder-select-language'
import { SelectingLanguage } from 'src/components/shared/popups/selecting-language/selecting-language'
import { PopupName } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { popupAnimationSelector, popupNameSelector } from 'src/redux/general/common.selectors'
import { HIDE_POPUP } from 'src/redux/general/common.slice'
import style from 'src/styles/popups.module.scss'

const popupsConfig: Record<PopupName, FC> = {
  EXERCISE_MEMORIZATION_SELECTED_SUCCESS: ExerciseMemorizationSelectedRightAnswer,
  EXERCISE_MEMORIZATION_SELECTED_FAILED: ExerciseMemorizationWrongAnswer,
  EXERCISE_MEMORIZATION_FINISH_ROUND: ExerciseMemorizationWrongAnswer,
  REMINDER_SELECT_LANGUAGE: ReminderSelectLanguage,
  SELECTING_LANGUAGE: SelectingLanguage,
}

export const PopupManager = React.memo(() => {
  const shownPopupName = useAppSelector(popupNameSelector)
  const popupAnimateDestroy = useAppSelector(popupAnimationSelector)
  const PopupToShow = popupsConfig[shownPopupName]
  const dispatch = useAppDispatch()

  const hasPopupToShow = shownPopupName && PopupToShow && !popupAnimateDestroy
  const ref = useRef()

  const direction = 700
  const defaultStyle = {
    transition: `transform ${direction}ms ease-out`,
    transform: 'translateX(100%)',
  }

  const transitionStyles = {
    entering: { transform: 'translateX(0)' },
    entered: { transform: 'translateX(0)' },
    exiting: { transform: 'translateX(100%)' },
    exited: { transform: 'translateX(100%)' },
  }

  const onExited = () => {
    if (popupAnimateDestroy) {
      dispatch(HIDE_POPUP())
    }
  }

  return (
    <Transition nodeRef={ref} in={hasPopupToShow} timeout={direction} onExited={onExited} unmountOnExit>
      {(state) => (
        <div
          className={style.backdrop}
          ref={ref}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {shownPopupName ? <PopupToShow /> : null}
        </div>
      )}
    </Transition>
  )
})
