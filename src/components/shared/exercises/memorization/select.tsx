import { Answers } from 'src/components/shared/exercises/memorization/components/answers'
import { Question } from 'src/components/shared/exercises/memorization/components/question'
import { MEMORIZATION_NUMBER_ANSWERS } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useTerms } from 'src/hooks/redux'
import { SHOW_POPUP } from 'src/redux/general/common'
import { ITerm, Languages } from 'src/types/terms'
import { generateAnswersById } from 'src/utils/generateAnswersById'
import { isEqual } from 'src/utils/isEqual'
import { shuffle } from 'src/utils/shuffle'

export const Select = ({ term, questionLanguage, answerLanguage, setMemorizationIds }): JSX.Element => {
  const terms = useTerms()
  const dispatch = useAppDispatch()

  const answers = shuffle<ITerm>(
    generateAnswersById<ITerm>(terms, MEMORIZATION_NUMBER_ANSWERS, term.id, answerLanguage),
  )

  const onAnswerSelected = (idAnswer: string) => () => {
    const answer = answers.find((el) => el.id === idAnswer)

    if (isEqual(term.id, idAnswer)) {
      dispatch(
        SHOW_POPUP({
          popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_SUCCESS,
          popupData: { answer },
        }),
      )

      setMemorizationIds((state) => ({
        ...state,
        [term.id]: [...(state[term.id] ?? []), Languages[answerLanguage]],
      }))
    } else {
      dispatch(
        SHOW_POPUP({
          popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_FAILED,
          popupData: {
            item: term,
            questionLanguage,
            answerLanguage,
            answer,
          },
        }),
      )
    }
  }

  return (
    <>
      <Question title={term[questionLanguage]} />
      <Answers answers={answers} onAnswerSelected={onAnswerSelected} />
    </>
  )
}
