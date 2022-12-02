import style from './memorization.module.scss'

export const Question = ({ text }: { text: string }): JSX.Element => (
  <div className={style.question}>
    <span className={style.questionTitle}>{text}</span>
  </div>
)
