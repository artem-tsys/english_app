import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

type UnionId = string | number

export const getObjById = <T extends { id: UnionId }>(list: T[], id: UnionId) => {
  if (!Array.isArray(list)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  if (typeof id !== 'string') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  return list.find((el) => el.id === id)
}
