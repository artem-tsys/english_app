import { ERROR_IS_NOT_CORRECT_TYPE } from '../constants/errors.constants'

type Collection = <T extends { id: string }>(collection: T[]) => string[]

export const getIds: Collection = (collection) => {
  if (!Array.isArray(collection)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  return collection.map((element) => element.id)
}
