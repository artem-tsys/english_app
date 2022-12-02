import { useEffect } from 'react'
import { SadEmoji } from 'src/components/shared/icons/sad.emoji'
import { HeaderPopup } from 'src/components/shared/popups/exercises-memorization/components/Head'
import style from 'src/components/shared/popups/exercises-memorization/components/index.module.scss'
import { AnswerPopup } from 'src/components/shared/popups/exercises-memorization/popup.types'

type IRightAnswerSelectedProps = Omit<AnswerPopup, 'question'>

export function RightAnswerSelected({ onClose, answer }: IRightAnswerSelectedProps) {
  useEffect(() => {
    setTimeout(() => onClose(), 2000)
  }, [])
  const typeModal: 'success' = 'success'
  return (
    <div>
      <HeaderPopup background={typeModal}>
        <SadEmoji />
        <div className={style.title}>вы ответили правильно!</div>
      </HeaderPopup>
      <p>{answer.text}</p>
    </div>
  )
}
