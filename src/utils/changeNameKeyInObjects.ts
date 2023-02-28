import { ERROR_IS_NOT_CORRECT_TYPE, ERROR_THE_KEY_EXISTS } from 'src/constants/errors.constants'

type UpdateKeyInObjects = <T>(list: T[], prevKey: string, nextKey: string) => T[]

export const updateKeyInObjects: UpdateKeyInObjects = (list, prevKey, nextKey) => {
  if (!Array.isArray(list)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (list.length === 0) {
    return []
  }
  if (list[0][nextKey]) {
    throw new Error(ERROR_THE_KEY_EXISTS)
  }

  return list.map((el) => {
    const newEl = {
      ...el,
      [nextKey]: el[prevKey],
    }
    delete newEl[prevKey]
    return newEl
  })
}
