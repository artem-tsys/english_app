import { FC } from 'react'
import style from 'src/components/shared/exercises/memorization/memorization.module.scss'

type AnswerProps = {
  answer: {
    id: string
    value: string
  }
  onSelected: (id: string) => void
}

export const Answer: FC<AnswerProps> = ({ answer, onSelected }) => (
  <li key={answer.id} className={style.element} data-testid="answer">
    <button onClick={() => onSelected(answer.id)} className={style.button} data-value={answer.value}>
      {answer.value}
    </button>
  </li>
)
