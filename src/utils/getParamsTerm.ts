import { findIndex } from 'lodash'
import { LanguagesKeys } from 'src/constants/languages.constants'
import { IParamsTerm } from 'src/types/terms'
import { arrayContaining } from 'src/utils/arrayContaining'

type GetParamsProps = (languages: LanguagesKeys[], learnedLanguages: LanguagesKeys[]) => IParamsTerm

const findIndexQuestionLang = (languages, learnedTermLanguages) => {
  if (!learnedTermLanguages || !learnedTermLanguages.length) {
    return Math.round(Math.random())
  }

  return findIndex(languages, (lang) => !learnedTermLanguages.includes(lang))
}

export const getParamsTerm: GetParamsProps = (languages, learnedTermLanguages) => {
  const isLearned = arrayContaining(learnedTermLanguages, languages)
  const questionIndex = findIndexQuestionLang(languages, learnedTermLanguages)
  const questionLanguage = languages[questionIndex] ?? null
  const answerLanguage = languages[questionIndex === 0 ? 1 : 0] ?? null

  if (isLearned || !questionLanguage || !answerLanguage) {
    return {
      isLearned,
      questionLanguage: null,
      answerLanguage: null,
    }
  }

  return {
    isLearned,
    questionLanguage,
    answerLanguage,
  }
}
