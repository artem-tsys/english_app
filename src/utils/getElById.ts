import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

type UnionId = string | number
type GetElById = <T extends { id: UnionId }>(list: T[], id: UnionId) => T

export const getElById: GetElById = (list, id) => {
  if (!Array.isArray(list)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  if (typeof id !== 'string') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  return list.find((el) => el.id === id)
}
