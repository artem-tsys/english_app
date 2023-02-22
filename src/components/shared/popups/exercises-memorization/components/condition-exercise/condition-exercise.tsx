import style from 'src/components/shared/popups/exercises-memorization/components/condition-exercise/condition-exercise.module.scss'
import { useAppSelector } from 'src/hooks/redux'
import { memorizationLearnedSelector } from 'src/redux/exercises/exercises.selectors'
import { moduleIdSelector } from 'src/redux/general/common.selectors'
import { termsLengthSelector } from 'src/redux/modules/modules.selectors'

type IProps = ({ round }: { round: number }) => JSX.Element

export const ConditionExercise: IProps = ({ round }) => {
  const moduleId = useAppSelector(moduleIdSelector)
  const termsLength = useAppSelector(termsLengthSelector(moduleId))
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
