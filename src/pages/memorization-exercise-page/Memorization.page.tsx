import cn from 'classnames'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Round } from 'src/components/exercises/memorization/Round'
import { Header } from 'src/components/headers/Header'
import style from 'src/components/headers/headers.module.scss'
import { CloseButton } from 'src/components/shared/buttons/Close.button'
import { MEMORIZATION_ROUND_COUNT } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector, usePhrases } from 'src/hooks/redux'
import { memorizationSelector } from 'src/redux/exercises/exercises.selectors'
import { updateMemorization } from 'src/redux/exercises/exercises.slice'
import { SHOW_POPUP } from 'src/redux/general/common'
import styleMain from 'src/styles/main.module.scss'
import { IPhrase } from 'src/types/phrases'
import { ObjectsFromArrayById } from 'src/utils/getRandomElementsFromArray'

export const MemorizationPage = () => {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const phrases = usePhrases(moduleId ?? '')

  const { round, learnedIds } = useAppSelector(memorizationSelector)

  const PhrasesConstructor = new ObjectsFromArrayById('random')
  const currentRoundPhrases = PhrasesConstructor.create<IPhrase>(phrases, MEMORIZATION_ROUND_COUNT, learnedIds)

  useEffect(() => {
    if (phrases.length !== 0 && learnedIds.length === phrases.length) {
      dispatch(SHOW_POPUP(POPUPS.EXERCISE_MEMORIZATION_FINISH_ROUND))
    }
  }, [phrases, learnedIds])

  const handleCompleteRound = (idsMemorization: string[]) => {
    dispatch(
      updateMemorization({
        round: round + 1,
        learnedIds: idsMemorization,
      }),
    )
  }

  const finishRoundHandler = () => {
    navigate(-1)
  }

  if (currentRoundPhrases.length === 0) return null

  return (
    <div>
      <Header>
        <CloseButton handleClick={finishRoundHandler} />
        <p className={cn(style.title, styleMain.centerAbs)}>{`round ${round}`}</p>
      </Header>
      <Round roundPhrases={currentRoundPhrases} handleCompleteRound={handleCompleteRound} listAllPhrases={phrases} />
    </div>
  )
}
