import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import ArrayContain from 'src/matchers/ArrayContain'
import { getRandomElement } from 'src/utils/getRandomElement'

expect.extend({
  ArrayContain,
})

describe('get random element', () => {
  const validTypes = ['type1', 'type2', { name: 'type' }, null, 5, undefined, []]

  test('valid types', () => {
    expect(getRandomElement(validTypes)).ArrayContain(validTypes)
    expect(getRandomElement(validTypes)).ArrayContain(validTypes)
    expect(getRandomElement(validTypes)).ArrayContain(validTypes)
  })

  test('empty types', () => {
    expect(getRandomElement([])).toBeUndefined()
  })

  test('is not valid types', () => {
    expect(() => getRandomElement(4)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => getRandomElement(null)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => getRandomElement('trete')).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
