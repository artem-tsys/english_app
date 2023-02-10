import { Link } from 'react-router-dom'
import style from 'src/components/pages/modules/modules.module.scss'
import { CardButton } from 'src/components/shared/buttons/Card.button'

export const ExerciseLink = ({ card, createPath, moduleId }) => (
  <Link to={createPath(moduleId)} className={style.linkExercise} key={card.title}>
    <CardButton {...card} />
  </Link>
)
