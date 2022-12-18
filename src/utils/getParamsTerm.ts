import { findIndex } from 'lodash'
import { IParamsTerm, Languages } from 'src/types/terms'
import { arrayContaining } from 'src/utils/arrayContaining'

type GetParamsProps = (languages: Languages[], learnedLanguages: Languages[]) => IParamsTerm

const findIndexQuestionLang = (languages, learnedTermLanguages) => {
  if (!learnedTermLanguages) {
    return Math.round(Math.random())
  }

  return findIndex(languages, (lang) => !learnedTermLanguages.includes(lang))
}

export const getParamsTerm: GetParamsProps = (languages, learnedTermLanguages) => {
  const isLearned = arrayContaining(learnedTermLanguages, languages)
  const questionIndex = findIndexQuestionLang(languages, learnedTermLanguages)
  const questionLanguage: Languages = languages[questionIndex] ?? null
  const answerLanguage: Languages = languages[questionIndex === 0 ? 1 : 0] ?? null

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
