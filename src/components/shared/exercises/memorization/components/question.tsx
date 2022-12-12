import style from 'src/components/shared/exercises/memorization/memorization.module.scss'

export const Question = ({ title }: { title: string }): JSX.Element => (
  <div className={style.question}>
    <span className={style.questionTitle}>{title}</span>
  </div>
)
