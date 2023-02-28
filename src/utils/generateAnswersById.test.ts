import { settings1, settings2 } from 'src/__tests__/fixtures/answers.json'
import terms from 'src/__tests__/fixtures/terms.json'
import { ERROR_ID_IS_NOT_FOUND, ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { LanguagesKeys } from 'src/types/languages'
import { ITerm } from 'src/types/terms'
import { generateAnswersById } from 'src/utils/generateAnswersById'

const amountList = terms.length
const amountAnswersOverflowing = terms.length + 10
const wrongAnswer = terms[0]

describe('correct variants', () => {
  test('correct answer', () => {
    expect(
      generateAnswersById(terms, settings1.rightAnswerId, settings1.language as LanguagesKeys, settings1.amount),
    ).toEqual(expect.arrayContaining([settings1.rightAnswer]))

    expect(
      generateAnswersById(terms, settings2.rightAnswerId, settings2.language as LanguagesKeys, settings2.amount),
    ).toEqual(expect.arrayContaining([settings2.rightAnswer]))
  })

  test('answers more list', () => {
    expect(
      generateAnswersById(
        terms,
        settings2.rightAnswerId,
        settings2.language as LanguagesKeys,
        amountAnswersOverflowing,
      ),
    ).toEqual(expect.arrayContaining([settings2.rightAnswer]))
    expect(
      generateAnswersById(
        terms,
        settings2.rightAnswerId,
        settings2.language as LanguagesKeys,
        amountAnswersOverflowing,
      ),
    ).toHaveLength(amountList)
    expect(
      generateAnswersById(
        terms,
        settings2.rightAnswerId,
        settings2.language as LanguagesKeys,
        amountAnswersOverflowing,
      ),
    ).toEqual(expect.not.arrayContaining([wrongAnswer]))
    expect(
      generateAnswersById([], settings2.rightAnswerId, settings2.language as LanguagesKeys, amountAnswersOverflowing),
    ).toEqual(expect.arrayContaining([]))
  })
})

describe('incorrect value args', () => {
  test('incorrect list value', () => {
    expect(generateAnswersById([], settings2.rightAnswerId, settings2.language as LanguagesKeys, terms.length)).toEqual(
      [],
    )
    expect(() =>
      generateAnswersById(undefined, settings2.rightAnswerId, settings2.language as LanguagesKeys, terms.length),
    ).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() =>
      generateAnswersById(
        'undefined' as unknown as ITerm[],
        settings2.rightAnswerId,
        settings2.language as LanguagesKeys,
        terms.length,
      ),
    ).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('incorrect amount', () => {
    expect(generateAnswersById(terms, settings2.rightAnswerId, settings2.language as LanguagesKeys, 0)).toEqual([])
    expect(generateAnswersById(terms, settings2.rightAnswerId, settings2.language as LanguagesKeys, 1)).toEqual([
      settings2.rightAnswer,
    ])
    expect(() => generateAnswersById(terms, settings2.rightAnswerId, settings2.language as LanguagesKeys, -2)).toThrow(
      ERROR_INCORRECT_VALUE,
    )
    expect(() =>
      generateAnswersById(terms, settings2.rightAnswerId, settings2.language as LanguagesKeys, null),
    ).toThrow(ERROR_INCORRECT_VALUE)
  })

  test('incorrect current id', () => {
    expect(() => generateAnswersById(terms, 'wronghjgfhg', settings2.language as LanguagesKeys, terms.length)).toThrow(
      ERROR_ID_IS_NOT_FOUND,
    )
    expect(() => generateAnswersById(terms, null, settings2.language as LanguagesKeys, terms.length)).toThrow(
      ERROR_IS_NOT_CORRECT_TYPE,
    )
  })

  test('incorrect language', () => {
    expect(() => generateAnswersById(terms, settings2.rightAnswerId, 'unknown' as LanguagesKeys, terms.length)).toThrow(
      ERROR_INCORRECT_VALUE,
    )
  })
})
