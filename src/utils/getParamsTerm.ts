import { findIndex } from 'lodash'
import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { Languages, LanguagesKeys } from 'src/types/languages'
import { IParamsTerm } from 'src/types/terms'
import { arrayContaining } from 'src/utils/arrayContaining'

type GetParamsProps = (lang: Languages, learnedLanguages: LanguagesKeys[]) => IParamsTerm

const findIndexQuestionLang = (languages, learnedTermLanguages) => {
  if (!learnedTermLanguages || !learnedTermLanguages.length) {
    return Math.round(Math.random())
  }

  return findIndex(languages, (lang) => !learnedTermLanguages.includes(lang))
}

export const getParamsTerm: GetParamsProps = (lang, learnedTermLanguages = []) => {
  if (typeof lang !== 'object' || lang === null || !Array.isArray(learnedTermLanguages)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  const langKeys = Object.keys(lang)
  const langValues = Object.values(lang)
  const isLearned = arrayContaining(learnedTermLanguages, langValues)

  const questionIndex = findIndexQuestionLang(langValues, learnedTermLanguages)
  const questionLanguageKey = langKeys[questionIndex]
  const answerLanguageKey = langKeys[questionIndex === 0 ? 1 : 0]

  if (isLearned || !questionLanguageKey || !answerLanguageKey) {
    return {
      isLearned,
      questionLanguageKey: null,
      answerLanguageKey: null,
    }
  }

  return {
    isLearned,
    questionLanguageKey,
    answerLanguageKey,
  }
}
