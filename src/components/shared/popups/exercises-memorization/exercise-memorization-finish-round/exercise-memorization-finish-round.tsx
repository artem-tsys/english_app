import { FC } from 'react'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import { ButtonFullWidth } from 'src/components/shared/popups/exercises-memorization/components/button-full-width/button-full-width'
import ConditionExercise from 'src/components/shared/popups/exercises-memorization/components/condition-exercise'
import { ListRoundTerms } from 'src/components/shared/popups/exercises-memorization/components/list-round-terms/list-round-terms'
import style from 'src/components/shared/popups/exercises-memorization/exercise-memorization-finish-round/exercise-memorization-finish-round.module.scss'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { roundNumberSelector } from 'src/redux/exercises/exercises.selectors'
import { roundForward } from 'src/redux/exercises/exercises.slice'
import { HIDE_MODAL } from 'src/redux/general/common.slice'

export const ExerciseMemorizationFinishRound: FC = () => {
  const round = useAppSelector(roundNumberSelector)
  const dispatch = useAppDispatch()

  const nextRound = () => {
    dispatch(roundForward())
  }

  const hidePopup = () => {
    dispatch(HIDE_MODAL())
  }

  return (
    <div className={style.container}>
      <CloseButton handleClick={hidePopup} className={style.closeButton} />
      <div className={style.gradient}>
        <div className={style.content}>
          <h2 className={style.title}>Превосходно, ви делаете успехи!</h2>
          <ConditionExercise round={round} />
          <ListRoundTerms />
        </div>
      </div>
      <ButtonFullWidth onClick={nextRound}>перейти к раунду {round}</ButtonFullWidth>
    </div>
  )
}
