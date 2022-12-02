import React from 'react'
import { AnswerPopup, IModalType } from 'src/components/shared/popups/exercises-memorization/popup.types'
import { RightAnswerSelected } from 'src/components/shared/popups/exercises-memorization/right-answer-selected'
import { WrongAnswerSelected } from 'src/components/shared/popups/exercises-memorization/wrong-answer-selected'

interface ITypeFactory {
  type: IModalType
}

type IFactory = ITypeFactory & AnswerPopup

export const AnswerPopupFactory = React.memo(({ type, onClose, question, answer }: IFactory): JSX.Element | null => {
  switch (type) {
    case 'success':
      return <RightAnswerSelected onClose={onClose} answer={answer} />
    case 'failed':
      return <WrongAnswerSelected onClose={onClose} question={question} answer={answer} />
    default:
      return null
  }
})
