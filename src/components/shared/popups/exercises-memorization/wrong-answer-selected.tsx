import { AnswerPopup } from 'src/components/shared/popups/exercises-memorization/popup.types'

export const WrongAnswerSelected = ({ onClose, question, answer }: AnswerPopup) => (
  <div>
    <p>right answer {question.ru}</p>
    <p>your answer {answer.text}</p>
    <button onClick={onClose}>button</button>
  </div>
)
