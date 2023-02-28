import { ERROR_IS_NOT_CORRECT_TYPE, ERROR_THE_KEY_EXISTS } from 'src/constants/errors.constants'
import { updateKeyInObjects } from 'src/utils/changeNameKeyInObjects'

type CorrectArray = Record<string, string>[]
describe('test changeNameKeyInObject', () => {
  const list: CorrectArray = [
    { id: '1', name: 'obj-1' },
    { id: '2', name: 'obj-2' },
    { id: '3', name: 'obj-3' },
  ]

  test('valid values', () => {
    const result: CorrectArray = [
      { id: '1', age: 'obj-1' },
      { id: '2', age: 'obj-2' },
      { id: '3', age: 'obj-3' },
    ]
    expect(updateKeyInObjects(list, 'name', 'age')).not.toEqual(list)
    expect(updateKeyInObjects(list, 'name', 'age')).toEqual(result)
  })

  test('wrong change key', () => {
    expect(updateKeyInObjects(list, 'role', 'age')).toEqual(list)
  })

  test('object includes next key', () => {
    expect(() => updateKeyInObjects(list, 'name', 'id')).toThrowError(ERROR_THE_KEY_EXISTS)
  })

  test('incorrect list, like object', () => {
    const value = { name: 'pasha', age: 31 } as unknown as CorrectArray
    expect(() => updateKeyInObjects(value, 'age', 'id')).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })

  test('incorrect list, like string', () => {
    const value = 'string' as unknown as string[]
    expect(() => updateKeyInObjects(value, 'age', 'id')).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
