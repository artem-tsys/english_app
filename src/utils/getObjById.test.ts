import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { getObjById } from 'src/utils/getObjById'
import { getRandomElement } from 'src/utils/getRandomElement'
import terms from '../__tests__/fixtures/terms.json'

describe('valid types arguments', () => {
  const term1 = terms[0]
  const term2 = getRandomElement(terms)
  const invalidId = 'sfgsdfs'

  test('valid all arguments', () => {
    expect(getObjById(terms, term1.id)).toBe(term1)
    expect(getObjById(terms, term2.id)).toBe(term2)
    expect(getObjById(terms, term2.id)).not.toBe(undefined)
  })

  test('invalid id', () => {
    expect(getObjById(terms, invalidId)).toBe(undefined)
  })
  test('empty list', () => {
    expect(getObjById([], term1.id)).toEqual(undefined)
  })
})

describe('invalid types arguments', () => {
  const term = terms[0]
  const booleanAsId = true as unknown as string

  test('id type null', () => {
    expect(() => getObjById(terms, null)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('id type boolean', () => {
    expect(() => getObjById(terms, booleanAsId)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('list type null', () => {
    expect(() => getObjById(null, term.id)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
  test('list type undefined', () => {
    expect(() => getObjById(undefined, term.id)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
