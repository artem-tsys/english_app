import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import ArrayContain from 'src/matchers/ArrayContain'
import { LanguagesKeys } from 'src/types/languages'
import { IParamsTerm } from 'src/types/terms'
import { getParamsTerm } from 'src/utils/getParamsTerm'

const languages = ['ua', 'en'] as LanguagesKeys[]
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
    questionLanguage: 'ua',
    answerLanguage: 'en',
  },
  {
    isLearned: false,
    questionLanguage: 'en',
    answerLanguage: 'ua',
  },
]

describe('valid params', () => {
  test('learned ua languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishRU)).toEqual({
      isLearned: false,
      questionLanguage: 'en',
      answerLanguage: 'ua',
    })
  })

  test('learned en languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEN)).toEqual({
      isLearned: false,
      questionLanguage: 'ua',
      answerLanguage: 'en',
    })
  })

  test('learned all languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishALL)).toEqual({
      isLearned: true,
      questionLanguage: null,
      answerLanguage: null,
    })
  })

  test('is not learned any languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).ArrayContain(possibleResults)
  })

  test('question & answer do not have the same meaning', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).not.toEqual({
      isLearned: false,
      questionLanguage: 'ua',
      answerLanguage: 'ua',
    })
  })
})

describe('is not valid params', () => {
  const notValidLearnedTermLanguage = 'undefined' as unknown as LanguagesKeys[]
  const anotherLearnedTermLanguage = ['fr', 'dt'] as unknown as LanguagesKeys[]

  test('not valid learned term languages', () => {
    expect(() => getParamsTerm(languages, undefined)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(getParamsTerm(languages, anotherLearnedTermLanguage)).ArrayContain(possibleResults)

    expect(() => getParamsTerm(languages, notValidLearnedTermLanguage)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('not valid languages', () => {
    expect(() => getParamsTerm(undefined, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(() => getParamsTerm(null, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(() => getParamsTerm({} as LanguagesKeys[], learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
