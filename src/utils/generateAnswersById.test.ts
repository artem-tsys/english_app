import { settings1, settings2 } from 'src/__tests__/fixtures/answers.json'
import terms from 'src/__tests__/fixtures/terms.json'
import { ITerm, Languages } from 'src/types/terms'
import { generateAnswersById } from 'src/utils/generateAnswersById'

const amountList = terms.length
const amountAnswersOverflowing = terms.length + 10
const wrongAnswer = terms[0]

test('correct answer', () => {
  expect(generateAnswersById(terms, settings1.rightAnswerId, Languages[settings1.language], settings1.amount)).toEqual(
    expect.arrayContaining([settings1.rightAnswer]),
  )

  expect(generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], settings2.amount)).toEqual(
    expect.arrayContaining([settings2.rightAnswer]),
  )
})

test('answers more list', () => {
  expect(
    generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], amountAnswersOverflowing),
  ).toEqual(expect.arrayContaining([settings2.rightAnswer]))
  expect(
    generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], amountAnswersOverflowing),
  ).toHaveLength(amountList)
  expect(
    generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], amountAnswersOverflowing),
  ).toEqual(expect.not.arrayContaining([wrongAnswer]))
  expect(
    generateAnswersById([], settings2.rightAnswerId, Languages[settings2.language], amountAnswersOverflowing),
  ).toEqual(expect.arrayContaining([]))
})

describe('incorrect value args', () => {
  test('incorrect list value', () => {
    expect(generateAnswersById([], settings2.rightAnswerId, Languages[settings2.language], terms.length)).toEqual([])
    expect(
      generateAnswersById(undefined, settings2.rightAnswerId, Languages[settings2.language], terms.length),
    ).toThrowError('id is not correct')
    expect(
      generateAnswersById(
        'undefined' as unknown as ITerm[],
        settings2.rightAnswerId,
        Languages[settings2.language],
        terms.length,
      ),
    ).toThrowError('id is not correct')
  })

  test('incorrect amount', () => {
    expect(generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], 0)).toEqual([])
    expect(generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], -2)).toEqual([])
    expect(generateAnswersById(terms, settings2.rightAnswerId, Languages[settings2.language], null)).toEqual([])
  })

  test('incorrect current id', () => {
    expect(generateAnswersById(terms, 'wrong', Languages[settings2.language], terms.length)).toThrowError(
      'id is not found',
    )
    expect(generateAnswersById(terms, null, Languages[settings2.language], terms.length)).toThrowError(
      'id is not correct',
    )
  })

  test('incorrect language', () => {
    expect(generateAnswersById(terms, settings2.rightAnswerId, 'unknown' as Languages, terms.length)).toThrowError(
      'language is not found',
    )
  })
})
