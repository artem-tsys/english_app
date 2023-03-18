import { FC } from 'react'
import style from 'src/components/shared/popups/exercises-memorization/components/condition-exercise/condition-exercise.module.scss'
import { useAppSelector } from 'src/hooks/redux'
import { memorizationLearnedSelector } from 'src/redux/exercises/exercises.selectors'
import { termsLengthSelector } from 'src/redux/modules/modules.selectors'

type IProps = { round: number }

export const ConditionExercise: FC<IProps> = ({ round }) => {
  const termsLength = useAppSelector(termsLengthSelector)
  const learnedTerms = useAppSelector(memorizationLearnedSelector)

  return (
    <div className={style.container}>
      <p className={style.title}>Рaунд {round} пройден</p>
      <div className={style.condition}>
        <p className={style.condition__title}>
          {learnedTerms.length}/{termsLength} терминов
        </p>
        <meter className={style.condition__meter} min={0} max={termsLength} value={learnedTerms.length} />
      </div>
    </div>
  )
}
