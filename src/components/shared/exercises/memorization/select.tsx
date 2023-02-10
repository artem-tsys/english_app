import cn from 'classnames'
import { shuffle } from 'lodash'
import { useMemo } from 'react'
import { Answer } from 'src/components/shared/exercises/memorization/components/answer'
import { MEMORIZATION_NUMBER_ANSWERS } from 'src/constants/exercises.constants'
import { LanguagesKeys } from 'src/constants/languages.constants'
import { POPUPS } from 'src/constants/popups.constans'
import { useAppDispatch } from 'src/hooks/redux'
import { useTerms } from 'src/hooks/useTerms'
import { SHOW_POPUP } from 'src/redux/general/common.slice'
import { IAnswer, ITerm } from 'src/types/terms'
import { generateAnswersById } from 'src/utils/generateAnswersById'
import { getElById } from 'src/utils/getElById'
import style from './memorization.module.scss'

type SelectAnswersProps = {
  term: ITerm
  questionLanguage: LanguagesKeys
  answerLanguage: LanguagesKeys
}

export const SelectAnswers = ({ term, questionLanguage, answerLanguage }: SelectAnswersProps): JSX.Element => {
  const terms = useTerms()
  const dispatch = useAppDispatch()

  const answers = useMemo(
    () => shuffle<IAnswer>(generateAnswersById<ITerm>(terms, term.id, answerLanguage, MEMORIZATION_NUMBER_ANSWERS)),
    [term, answerLanguage],
  )

  const onSelected = (idAnswer: string) => {
    const answer = getElById(answers, idAnswer)
    const config =
      term.id === idAnswer
        ? {
            popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_SUCCESS,
            popupData: {
              answer,
              questionLanguage,
              termId: term.id,
            },
          }
        : {
            popup: POPUPS.EXERCISE_MEMORIZATION_SELECTED_FAILED,
            popupData: {
              item: term,
              questionLanguage,
              answerLanguage,
              answer,
            },
          }

    dispatch(SHOW_POPUP(config))
  }

  return (
    <div className={style.exercises}>
      <div className={style.question}>
        <span className={style.questionTitle} data-testid="question">
          {term[questionLanguage]}
        </span>
      </div>
      <ul className={cn(style.container, style.answers)} data-testid="answers">
        {answers.map((answer) => (
          <Answer answer={answer} onSelected={onSelected} />
        ))}
      </ul>
    </div>
  )
}
