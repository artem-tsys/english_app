import { FC } from 'react'
import { Link } from 'react-router-dom'
import style from 'src/components/pages/modules/modules.module.scss'
import { CardButton, ICardButton } from 'src/components/shared/buttons/Card.button'

type ExerciseLinkProps = {
  card: ICardButton
  createPath: (id: string | number) => string
  moduleId: string
}
export const ExerciseLink: FC<ExerciseLinkProps> = ({ card, createPath, moduleId }) => (
  <Link to={createPath(moduleId)} className={style.linkExercise} key={card.title}>
    <CardButton {...card} />
  </Link>
)
