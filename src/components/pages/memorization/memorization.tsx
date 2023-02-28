import cn from 'classnames'
import { flatten, shuffle, times } from 'lodash'
import { FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
  memorizationLearnedSelector,
  roundNumberSelector,
  roundTermsIdsSelector,
} from 'src/redux/exercises/exercises.selectors'
import { updateTermsRound } from 'src/redux/exercises/exercises.slice'
import { moduleIdSelector } from 'src/redux/general/common.selectors'
import { SHOW_MODAL, UPDATE_MODULE_ID } from 'src/redux/general/common.slice'
import styleMain from 'src/styles/main.module.scss'
import { ITerm } from 'src/types/terms'
import { getObjectsById } from 'src/utils/getObjectsById'

const isFinishedModule = (terms: ITerm[], learnedTerms: string[]): boolean => {
  if (terms.length === 0) return true
  return learnedTerms.length >= terms.length
}

const termsNumberCopies = 2

export const Memorization: FC = () => {
  const query = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { terms } = useModule()
  const roundNumber = useAppSelector(roundNumberSelector)
  const learnedIds = useAppSelector(memorizationLearnedSelector)
  const roundTerms = useAppSelector(roundTermsIdsSelector)
  const moduleId = useAppSelector(moduleIdSelector)

  useEffect(() => {
    if (!moduleId) {
      dispatch(UPDATE_MODULE_ID(query.moduleId))
    }
  }, [])

  useEffect(() => {
    if (isFinishedModule(terms, learnedIds)) {
      dispatch(SHOW_MODAL({ name: POPUPS.EXERCISE_MEMORIZATION_FINISH_MODULE }))
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
      <Header className={styleMain.headerBackground}>
        <CloseButton handleClick={finishRoundHandler} />
        <p className={cn(style.title, styleMain.centerAbs)} data-testid="titleRound">{`round ${roundNumber}`}</p>
      </Header>
      <Round />
    </>
  )
}
