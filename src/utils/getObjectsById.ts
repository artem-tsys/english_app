import { cloneDeep, shuffle, slice } from 'lodash'
import { ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'
import { NUMBER_TERMS_IN_ROUND } from 'src/constants/exercises.constants'

export interface IGetObjectsByIdProps<T> {
  collection: T[]
  amount?: number
  isRandomOrder?: boolean
}

type GetObjectsById = <T extends { id: string }>({ collection, amount, isRandomOrder }: IGetObjectsByIdProps<T>) => T[]

export const getObjectsById: GetObjectsById = ({
  collection,
  amount = NUMBER_TERMS_IN_ROUND,
  isRandomOrder = false,
}) => {
  if (!Array.isArray(collection) || typeof amount !== 'number') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (amount < 0) {
    throw new Error(ERROR_INCORRECT_VALUE)
  }

  if (collection.length === 0 || amount === 0) return []
  if (collection.length < amount) return cloneDeep(collection)

  if (isRandomOrder) {
    return slice(shuffle(collection), 0, amount)
  }

  return collection.slice(0, amount)
}
