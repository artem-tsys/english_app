import { isEqual } from 'lodash'
import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { IParamsTerm, Languages } from 'src/types/terms'
import { getParamsTerm } from 'src/utils/getParamsTerm'

const languages = ['ru', 'en'] as Languages[]
const learnedTermEnglishRU = ['ru'] as Languages[]
const learnedTermEnglishEN = ['en'] as Languages[]
const learnedTermEnglishALL = ['ru', 'en'] as Languages[]
const learnedTermEnglishEmpty = [] as Languages[]

expect.extend({
  toBeInTheList(received, possibleResults) {
    const pass = possibleResults.some((result) => isEqual(result, received))

    const message = pass
      ? () => `expected ${JSON.stringify(received)} not to be in the list ${JSON.stringify(possibleResults)}`
      : () => `expected ${JSON.stringify(received)} to be in the list ${JSON.stringify(possibleResults)}`

    return {
      message,
      pass,
    }
  },
})

const possibleResults: IParamsTerm[] = [
  {
    isLearned: false,
    questionLanguage: Languages.ru,
    answerLanguage: Languages.en,
  },
  {
    isLearned: false,
    questionLanguage: Languages.en,
    answerLanguage: Languages.ru,
  },
]

describe('valid params', () => {
  test('learned ru languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishRU)).toEqual({
      isLearned: false,
      questionLanguage: 'en',
      answerLanguage: 'ru',
    })
  })

  test('learned en languages', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEN)).toEqual({
      isLearned: false,
      questionLanguage: 'ru',
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
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).toBeInTheList(possibleResults)
  })

  test('question & answer do not have the same meaning', () => {
    expect(getParamsTerm(languages, learnedTermEnglishEmpty)).not.toEqual({
      isLearned: false,
      questionLanguage: 'ru',
      answerLanguage: 'ru',
    })
  })
})

describe('is not valid params', () => {
  const notValidLearnedTermLanguage = 'undefined' as unknown as Languages[]
  const anotherLearnedTermLanguage = ['fr', 'dt'] as unknown as Languages[]

  test('not valid learned term languages', () => {
    expect(() => getParamsTerm(languages, undefined)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(getParamsTerm(languages, anotherLearnedTermLanguage)).toBeInTheList(possibleResults)

    expect(() => getParamsTerm(languages, notValidLearnedTermLanguage)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('not valid languages', () => {
    expect(() => getParamsTerm(undefined, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(() => getParamsTerm(null, learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)

    expect(() => getParamsTerm({} as Languages[], learnedTermEnglishALL)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
