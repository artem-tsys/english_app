import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import ArrayContain from 'src/matchers/ArrayContain'
import { Languages, LanguagesKeys } from 'src/types/languages'
import { IParamsTerm } from 'src/types/terms'
import { getParamsTerm } from 'src/utils/getParamsTerm'

const languages = { lang1: 'ua', lang2: 'en' } as Languages
const learnedTermEnglishRU = ['ua'] as LanguagesKeys[]
const learnedTermEnglishEN = ['en'] as LanguagesKeys[]
const learnedTermEnglishALL = ['ua', 'en'] as LanguagesKeys[]
const learnedTermEnglishEmpty = [] as LanguagesKeys[]

expect.extend({
  ArrayContain,
})

const possibleResults: IParamsTerm[] = [
  {
    isLearned: false,
    questionLanguageKey: 'lang1',
    answerLanguageKey: 'lang2',
  },
  {
    isLearned: false,
    questionLanguageKey: 'lang2',
    answerLanguageKey: 'lang1',
  },
]

describe('valid params', () => {
  test('learned ua languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishRU)).toEqual({
      isLearned: false,
      questionLanguageKey: 'lang2',
      answerLanguageKey: 'lang1',
    })
  })

  test('learned en languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEN)).toEqual({
      isLearned: false,
      questionLanguageKey: 'lang1',
      answerLanguageKey: 'lang2',
    })
  })

  test('learned all languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishALL)).toEqual({
      isLearned: true,
      questionLanguageKey: null,
      answerLanguageKey: null,
    })
  })

  test('is not learned any languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).ArrayContain(possibleResults)
  })

  test('question & answer do not have the same meaning', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).not.toEqual({
      isLearned: false,
      questionLanguageKey: 'lang1',
      answerLanguageKey: 'lang1',
    })
  })
})

describe('is not valid params', () => {
  const notValidLearnedTermLanguage = 'undefined' as unknown as LanguagesKeys[]
  const anotherLearnedTermLanguage = ['fr', 'dt'] as unknown as LanguagesKeys[]

  test('not valid learned term languages', () => {
    expect(getParamsTerm(languages, undefined)).ArrayContain(possibleResults)

    expect(getParamsTerm(languages, anotherLearnedTermLanguage)).ArrayContain(possibleResults)

    expect(() => getParamsTerm(languages, notValidLearnedTermLanguage)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('not valid languages', () => {
    expect(() => getParamsTerm(undefined, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(() => getParamsTerm(null, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
