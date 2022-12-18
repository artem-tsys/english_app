import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { arrayContaining } from 'src/utils/arrayContaining'

describe('valid arguments', () => {
  const list = [{ name: 'a' }, { name: 'b' }, { name: '4' }, 'test']

  test('contain object', () => {
    expect(arrayContaining(list, [{ name: 'a' }])).toBeTruthy()
    expect(arrayContaining(list, ["{name: 'a'}"])).toBeFalsy()
    expect(arrayContaining(list, ['test'])).toBeTruthy()
    expect(arrayContaining(list, [{ name: 'a' }, { name: '4' }])).toBeTruthy()
    expect(arrayContaining(list, [{ name: 'a' }, 'no valid'])).toBeFalsy()
  })

  test('contain empty array', () => {
    expect(arrayContaining(list, [])).toBeTruthy()
    expect(arrayContaining([], ['test'])).toBeFalsy()
  })
})

describe('invalid arguments', () => {
  const list = [{ name: 'a' }, { name: 'b' }, { name: '4' }]
  const contain = [{ name: 'a' }, { title: 'b' }, { name: 4 }]

  test('no valid list', () => {
    expect(() => arrayContaining(null, contain)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => arrayContaining(undefined, contain)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => arrayContaining('435634', contain)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
  test('no valid contain', () => {
    expect(() => arrayContaining(list, null)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => arrayContaining(list, undefined)).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
    expect(() => arrayContaining(list, '435634')).toThrow(ERROR_IS_NOT_CORRECT_TYPE)
  })
})
