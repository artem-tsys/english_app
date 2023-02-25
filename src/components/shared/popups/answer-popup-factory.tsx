import React, { FC, useMemo, useRef } from 'react'
import { Transition } from 'react-transition-group'
import { ExerciseMemorizationFinishRound } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-finish-round/exercise-memorization-finish-round'
import { SelectedRightAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-selected-right-answer/exercise-memorization-selected-right-answer'
import { SelectedWrongAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-wrong-answer/exercise-memorization-wrong-answer'
import { ReminderSelectLanguage } from 'src/components/shared/popups/reminder-select-language/reminder-select-language'
import { SelectingLanguage } from 'src/components/shared/popups/selecting-language/selecting-language'
import { PopupName } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import {
  modalAnimationSelector,
  modalNameSelector,
  modalStateAnimateSelector,
} from 'src/redux/general/common.selectors'
import { HIDE_MODAL } from 'src/redux/general/common.slice'
import style from 'src/styles/popups.module.scss'

const popupsConfig: Record<PopupName, FC> = {
  EXERCISE_MEMORIZATION_SELECTED_SUCCESS: SelectedRightAnswer,
  EXERCISE_MEMORIZATION_SELECTED_FAILED: SelectedWrongAnswer,
  EXERCISE_MEMORIZATION_FINISH_ROUND: ExerciseMemorizationFinishRound,
  EXERCISE_MEMORIZATION_FINISH_MODULE: ExerciseMemorizationFinishRound,
  REMINDER_SELECT_LANGUAGE: ReminderSelectLanguage,
  SELECTING_LANGUAGE: SelectingLanguage,
}

const direction = 700
const transitionStyles = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(100%)' },
  exited: { transform: 'translateX(100%)' },
}

export const ModalManager = () => {
  const modalName = useAppSelector(modalNameSelector)
  const modalAnimate = useAppSelector(modalStateAnimateSelector)
  const isAnimation = useAppSelector(modalAnimationSelector)

  const ModalToShow = popupsConfig[modalName]
  const hasModalToShow = modalName && ModalToShow && !isAnimation
  const ref = useRef()
  const dispatch = useAppDispatch()

  const timeout = useMemo(() => (modalAnimate ? direction : 0), [modalAnimate])
  const defaultStyle = {
    transitionProperty: 'transform',
    transitionDuration: `${timeout}ms`,
    transitionTimingFunction: 'ease-out',
    transform: 'translateX(100%)',
  }

  const onExited = () => {
    if (isAnimation) {
      dispatch(HIDE_MODAL())
    }
  }

  return (
    <Transition nodeRef={ref} in={hasModalToShow} timeout={timeout} onExited={onExited}>
      {(state) => (
        <div
          className={style.backdrop}
          ref={ref}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {ModalToShow && <ModalToShow />}
        </div>
      )}
    </Transition>
  )
}
