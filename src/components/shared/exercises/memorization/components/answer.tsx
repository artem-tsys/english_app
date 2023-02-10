import style from 'src/components/shared/exercises/memorization/memorization.module.scss'

export const Answer = ({ answer, onSelected }) => (
  <li key={answer.id} className={style.element} data-testid="answer">
    <button onClick={() => onSelected(answer.id)} className={style.button} data-value={answer.value}>
      {answer.value}
    </button>
  </li>
)
