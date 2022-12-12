import cn from 'classnames'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import { Round } from 'src/components/shared/exercises/round'
import { Header } from 'src/components/shared/headers/Header'
import style from 'src/components/shared/headers/headers.module.scss'
import { MEMORIZATION_ROUND_NUMBER } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector, useModule } from 'src/hooks/redux'
import { memorizationSelector } from 'src/redux/exercises/exercises.selectors'
import { SHOW_POPUP } from 'src/redux/general/common'
import styleMain from 'src/styles/main.module.scss'
import { IMemorizationIds, ITerm } from 'src/types/terms'
import { getObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'
import { shuffle } from 'src/utils/shuffle'

const isFinishedModule = (terms: ITerm[], learnedTerms: IMemorizationIds) => {
  if (terms.length === 0) return true

  const learned = Object.values(learnedTerms)
  const isAllTermLearned = learned.every((learn) => learn.length === 2)

  if (learned.length < terms.length || !isAllTermLearned) {
    return false
  }

  return true
}

export const Memorization = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { languages, terms } = useModule()
  const { roundNumber, learnedIds } = useAppSelector(memorizationSelector)

  useEffect(() => {
    if (isFinishedModule(terms, learnedIds)) {
      dispatch(SHOW_POPUP(POPUPS.EXERCISE_MEMORIZATION_FINISH_ROUND))
    }
  }, [terms, learnedIds])

  const currentRoundTerms = useMemo(
    () =>
      shuffle(
        getObjectsFromArrayById<ITerm>({
          collection: terms,
          amount: MEMORIZATION_ROUND_NUMBER,
          ignoredIds: Object.keys(learnedIds),
          isRandomOrder: true,
        }),
      ),
    [roundNumber, terms],
  )

  const finishRoundHandler = () => {
    navigate(-1)
  }

  if (currentRoundTerms.length === 0) return null

  return (
    <>
      <Header>
        <CloseButton handleClick={finishRoundHandler} />
        <p className={cn(style.title, styleMain.centerAbs)}>{`round ${roundNumber}`}</p>
      </Header>
      <Round roundTerms={currentRoundTerms} languages={languages} />
    </>
  )
}
