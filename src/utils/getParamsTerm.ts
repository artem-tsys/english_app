import { findIndex } from 'lodash'
import { MEMORIZATION_MODULE_LANGUAGES_NUMBER } from 'src/constants/exercises.constants'
import { Languages } from 'src/types/terms'

type GetParamsProps = (
  languages: Languages[],
  learnedLanguages,
) => {
  isLearned: boolean
  questionLanguage: Languages
  answerLanguage: Languages
}

const findIndexQuestionLang = (languages, learnedTermLanguages) => {
  if (!learnedTermLanguages) {
    return Math.round(Math.random())
  }
  return findIndex(languages, (lang) => !learnedTermLanguages.include(lang))
}

export const getParamsTerm: GetParamsProps = (languages, learnedLanguages) => {
  const isLearned: boolean = learnedLanguages && learnedLanguages.length === MEMORIZATION_MODULE_LANGUAGES_NUMBER

  const questionIndex = findIndexQuestionLang(languages, learnedLanguages)
  const questionLanguage: Languages = languages[questionIndex]
  const answerLanguage: Languages = languages[questionIndex === 0 ? 1 : 0]

  return {
    isLearned,
    questionLanguage,
    answerLanguage,
  }
}
