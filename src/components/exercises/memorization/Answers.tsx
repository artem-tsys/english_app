import style from 'src/components/exercises/memorization/memorization.module.scss'
import { IPhrase } from 'src/types/phrases'

type IAnswers = (props: { answers: IPhrase[]; onAnswerSelected: (id: string) => any }) => JSX.Element

export const Answers: IAnswers = ({ answers, onAnswerSelected }) => (
  <ul className={style.container}>
    {answers.map((answer) => (
      <li key={answer.id} className={style.element}>
        <button onClick={onAnswerSelected(answer.id)} className={style.button} data-value={answer.ru}>
          {answer.ru}
        </button>
      </li>
    ))}
  </ul>
)
