import cn from 'classnames'
import style from 'src/components/shared/exercises/memorization/memorization.module.scss'
import { IAnswer } from 'src/types/terms'

type IAnswers = (props: { answers: IAnswer[]; onAnswerSelected: (id: string) => any }) => JSX.Element

export const Answers: IAnswers = ({ answers, onAnswerSelected }) => (
  <ul className={cn(style.container, style.answers)}>
    {answers.map((answer) => (
      <li key={answer.id} className={style.element}>
        <button onClick={onAnswerSelected(answer.id)} className={style.button} data-value={answer.value}>
          {answer.value}
        </button>
      </li>
    ))}
  </ul>
)
