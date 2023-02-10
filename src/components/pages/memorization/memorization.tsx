import cn from 'classnames'
import { flatten, shuffle, times } from 'lodash'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import { Round } from 'src/components/shared/exercises/round'
import { Header } from 'src/components/shared/headers/Header'
import style from 'src/components/shared/headers/headers.module.scss'
import { POPUPS } from 'src/constants/popups.constans'
import { filterElements } from 'src/helpers/filter-elements'
import { getIds } from 'src/helpers/get-ids'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { useModule } from 'src/hooks/useModule'
import {
  exercisesLearnedSelector,
  roundNumberSelector,
  roundTermsSelector,
} from 'src/redux/exercises/exercises.selectors'
import { updateTermsRound } from 'src/redux/exercises/exercises.slice'
import { SHOW_POPUP } from 'src/redux/general/common.slice'
import styleMain from 'src/styles/main.module.scss'
import { ITerm } from 'src/types/terms'
import { getObjectsById } from 'src/utils/getObjectsById'

const isFinishedModule = (terms: ITerm[], learnedTerms: string[]) => {
  if (terms.length === 0) return true
  return learnedTerms.length >= terms.length
}

const termsNumberCopies = 2

export const Memorization = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { terms } = useModule()
  const roundNumber = useAppSelector(roundNumberSelector)
  const learnedIds = useAppSelector(exercisesLearnedSelector)
  const roundTerms = useAppSelector(roundTermsSelector)

  useEffect(() => {
    if (isFinishedModule(terms, learnedIds)) {
      dispatch(SHOW_POPUP(POPUPS.EXERCISE_MEMORIZATION_FINISH_ROUND))
    }
  }, [terms, learnedIds])

  useEffect(() => {
    const learnTerms = filterElements(terms, learnedIds)
    const roundIds = getIds<ITerm>(getObjectsById<ITerm>({ collection: learnTerms }))

    const nextRoundTerms = shuffle(flatten(shuffle(times(termsNumberCopies, () => roundIds))))

    dispatch(updateTermsRound(nextRoundTerms))
  }, [roundNumber])

  const finishRoundHandler = () => {
    navigate(-1)
  }

  if (roundTerms.length === 0) return null
  return (
    <>
      <Header>
        <CloseButton handleClick={finishRoundHandler} />
        <p className={cn(style.title, styleMain.centerAbs)} data-testid="titleRound">{`round ${roundNumber}`}</p>
      </Header>
      <Round />
    </>
  )
}
