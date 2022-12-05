import { useEffect } from 'react'
import { Answers } from 'src/components/exercises/memorization/Answers'
import { Question } from 'src/components/exercises/memorization/Question'
import { MEMORIZATION_COUNT_ANSWERS } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { memorizationActivePhraseIndexSelector } from 'src/redux/exercises/exercises.selectors'
import { updateActivePhraseIndex } from 'src/redux/exercises/exercises.slice'
import { HIDE_POPUP, SHOW_POPUP } from 'src/redux/general/common'
import { IPhrase } from 'src/types/phrases'
import { getAnswersListById } from 'src/utils/answerList'
import { isEqual } from 'src/utils/isEqual'
import { shuffle } from 'src/utils/shuffle'

type IRound = (props: {
  roundPhrases: IPhrase[]
  handleCompleteRound: (a: string[]) => void
  listAllPhrases: IPhrase[]
}) => JSX.Element

export const Round: IRound = ({ roundPhrases, handleCompleteRound, listAllPhrases }) => {
  // const [indexActivePhrase, setIndexActivePhrase] = useState<number>(0)
  const currentPhraseIndex = useAppSelector(memorizationActivePhraseIndexSelector)
  const memorizationIds: string[] = []
  const dispatch = useAppDispatch()
  const currentPhrase = roundPhrases[currentPhraseIndex]
  const hasRoundToShow = typeof currentPhraseIndex === 'number' && currentPhrase

  useEffect(() => {
    const maxIndexPhrases = roundPhrases.length - 1
    if (currentPhraseIndex === maxIndexPhrases) {
      handleCompleteRound(memorizationIds)
    }
  }, [currentPhraseIndex])

  useEffect(
    () => () => {
      dispatch(updateActivePhraseIndex(0))
      dispatch(HIDE_POPUP())
    },
    [],
  )

  if (!hasRoundToShow) return null

  const answers = shuffle<IPhrase>(
    getAnswersListById<IPhrase>(listAllPhrases, MEMORIZATION_COUNT_ANSWERS, currentPhrase.id),
  )

  const onAnswerSelected = (idAnswer: string) => () => {
    const nextPhraseId = currentPhraseIndex + 1
    const answer = answers.find((el) => el.id === idAnswer).ru
    // eslint-disable-next-line no-console
    console.log('answer', answer)
    if (isEqual(currentPhrase.id, idAnswer)) {
      dispatch(
        SHOW_POPUP({
          popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_SUCCESS,
          popupData: { answer, nextPhraseId },
        }),
      )
      memorizationIds.push(currentPhrase.id)
    } else {
      dispatch(
        SHOW_POPUP({
          popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_FAILED,
          popupData: { item: currentPhrase, answer, nextPhraseId },
        }),
      )
    }
    // setIndexActivePhrase(index => index + 1);
  }

  // const handleNextRound = () => {
  //   setIndexActivePhrase((index) => index + 1)
  // }

  return (
    <>
      <Question text={currentPhrase.en} />
      <Answers answers={answers} onAnswerSelected={onAnswerSelected} />
    </>
  )
}
