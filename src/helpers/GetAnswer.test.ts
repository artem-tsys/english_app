import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { getAnswer } from 'src/helpers/GetAnswer'
import { ITerm } from 'src/types/terms'

describe('test getAnswer fn', () => {
  const list = [
    { ua: 'курча', en: 'chicken', id: '1' },
    { ua: 'картопля', en: 'potatoes', id: '2' },
  ] as ITerm[]
  test('check valid value', () => {
    expect(getAnswer(list, 'курча')).not.toBe('курча')
    expect(getAnswer(list, 'курча')).toBe('chicken')
    expect(getAnswer(list, 'potatoes')).toBe('картопля')
  })

  test('unknown value', () => {
    const value = true as unknown as 'string'
    expect(getAnswer(list, 'apple')).toBeUndefined()
    expect(getAnswer([], 'apple')).toBeUndefined()
    expect(() => getAnswer(list, value)).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('unknown list', () => {
    const wrongList = true as unknown as ITerm[]
    expect(() => getAnswer(wrongList, 'apple')).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
