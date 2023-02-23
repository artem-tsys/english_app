import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { ExerciseMemorizationFinishRound } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-finish-round/exercise-memorization-finish-round'
import { SelectedRightAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-selected-right-answer/exercise-memorization-selected-right-answer'
import { SelectedWrongAnswer } from 'src/components/shared/popups/exercises-memorization/exercise-memorization-wrong-answer/exercise-memorization-wrong-answer'
import { ReminderSelectLanguage } from 'src/components/shared/popups/reminder-select-language/reminder-select-language'
import { SelectingLanguage } from 'src/components/shared/popups/selecting-language/selecting-language'
import { PopupName } from 'src/constants/popups.constans'
import { useAppSelector } from 'src/hooks/redux'
import { modalAnimationSelector, modalNameSelector } from 'src/redux/general/common.selectors'
import style from 'src/styles/popups.module.scss'

const popupsConfig: Record<PopupName, FC> = {
  EXERCISE_MEMORIZATION_SELECTED_SUCCESS: SelectedRightAnswer,
  EXERCISE_MEMORIZATION_SELECTED_FAILED: SelectedWrongAnswer,
  EXERCISE_MEMORIZATION_FINISH_ROUND: ExerciseMemorizationFinishRound,
  EXERCISE_MEMORIZATION_FINISH_MODULE: ExerciseMemorizationFinishRound,
  REMINDER_SELECT_LANGUAGE: ReminderSelectLanguage,
  SELECTING_LANGUAGE: SelectingLanguage,
}

const direction = 0.7

const transitionStyles = {
  entering: { transform: 'translateX(0)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(100%)' },
  exited: { transform: 'translateX(100%)' },
}

const Modal = ({ isOpen, modalName, isAnimate, changeModalName }) => {
  const PopupToShow = popupsConfig[modalName]
  const timeout = isAnimate ? direction : 0
  const ref = useRef()

  const defaultStyle = {
    transition: `transform ${timeout}s ease-out`,
    transform: 'translateX(100%)',
  }

  const onExited = useCallback(() => {
    if (isAnimate) {
      changeModalName()
    }
  }, [isAnimate])

  return (
    <Transition nodeRef={ref} in={isOpen} timeout={timeout} onExited={onExited} unmountOnExit>
      {(state) => (
        <div
          className={style.backdrop}
          ref={ref}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          {PopupToShow && <PopupToShow />}
        </div>
      )}
    </Transition>
  )
}

export const ModalManager = () => {
  const shownPopupName = useAppSelector(modalNameSelector)
  const modalAnimate = useAppSelector(modalAnimationSelector)
  const [modalName, setModalName] = useState(shownPopupName)

  const changeModalName = () => {
    setModalName(shownPopupName)
  }

  useEffect(() => {
    if (shownPopupName !== null) {
      setModalName(shownPopupName)
    }
  }, [shownPopupName])

  return <Modal isOpen={!!modalName} modalName={modalName} isAnimate={modalAnimate} changeModalName={changeModalName} />
}
