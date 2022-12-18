import { isEqual } from 'lodash'
import { Answers } from 'src/components/shared/exercises/memorization/components/answers'
import { Question } from 'src/components/shared/exercises/memorization/components/question'
import { MEMORIZATION_NUMBER_ANSWERS } from 'src/constants/exercises.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch, useTerms } from 'src/hooks/redux'
import { SHOW_POPUP } from 'src/redux/general/common.slice'
import { IAnswer, ITerm, Languages } from 'src/types/terms'
import { generateAnswersById } from 'src/utils/generateAnswersById'
import { shuffle } from 'src/utils/shuffle'
import style from './memorization.module.scss'

export const SelectAnswers = ({ term, questionLanguage, answerLanguage, setMemorizationIds }): JSX.Element => {
  const terms = useTerms()
  const dispatch = useAppDispatch()

  const answers = shuffle<IAnswer>(
    generateAnswersById<ITerm>(terms, term.id, answerLanguage, MEMORIZATION_NUMBER_ANSWERS),
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
    <div className={style.exercises}>
      <Question title={term[questionLanguage]} />
      <Answers answers={answers} onAnswerSelected={onAnswerSelected} />
    </div>
  )
}
