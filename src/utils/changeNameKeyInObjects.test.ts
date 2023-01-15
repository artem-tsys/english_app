import { ERROR_IS_NOT_CORRECT_TYPE, ERROR_THE_KEY_EXISTS } from 'src/constants/errors.constants'
import { updateKeyInObjects } from 'src/utils/changeNameKeyInObjects'

describe('test changeNameKeyInObject', () => {
  const list = [
    { id: '1', name: 'obj-1' },
    { id: '2', name: 'obj-2' },
    { id: '3', name: 'obj-3' },
  ]

  test('valid values', () => {
    const result = [
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
    expect(() => updateKeyInObjects({ name: 'pasha', age: 31 }, 'age', 'id')).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })
  test('incorrect list, like string', () => {
    expect(() => updateKeyInObjects('string', 'age', 'id')).toThrowError(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
