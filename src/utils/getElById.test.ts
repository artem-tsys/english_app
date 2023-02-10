import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { getElById } from 'src/utils/getElById'
import { getRandomElement } from 'src/utils/getRandomElement'
import terms from '../__tests__/fixtures/terms.json'

describe('valid types arguments', () => {
  const term1 = terms[0]
  const term2 = getRandomElement(terms)
  const invalidId = 'sfgsdfs'

  test('valid all arguments', () => {
    expect(getElById(terms, term1.id)).toBe(term1)
    expect(getElById(terms, term2.id)).toBe(term2)
    expect(getElById(terms, term2.id)).not.toBe(undefined)
  })

  test('invalid id', () => {
    expect(getElById(terms, invalidId)).toBe(undefined)
  })
  test('empty list', () => {
    expect(getElById([], term1.id)).toEqual(undefined)
  })
})

describe('invalid types arguments', () => {
  const term = terms[0]
  const booleanAsId = true as unknown as string

  test('id type null', () => {
    expect(() => getElById(terms, null)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('id type boolean', () => {
    expect(() => getElById(terms, booleanAsId)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('list type null', () => {
    expect(() => getElById(null, term.id)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
  test('list type undefined', () => {
    expect(() => getElById(undefined, term.id)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
