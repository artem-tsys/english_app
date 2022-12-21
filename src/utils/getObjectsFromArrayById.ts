import { cloneDeep, isEqual, random } from 'lodash'
import { ERROR_INCORRECT_VALUE, ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

type IgnoredIds = string | string[] | Record<string, unknown> | undefined
export interface IGetObjectsFromArrayByIdProps<T> {
  collection: T[]
  amount: number
  ignoredIds?: IgnoredIds
  isRandomOrder?: boolean
}

function hasIgnoreId(ignore: IgnoredIds, id: string) {
  if (Array.isArray(ignore)) {
    return ignore.includes(id)
  }
  if (typeof ignore === 'string') {
    return isEqual(ignore, id)
  }
  if (typeof ignore === 'object' && ignore !== null) {
    const keys = Object.keys(ignore)
    return keys.includes(id)
  }
  throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
}

function getNextIndex(prevIndex, indexLastElement: number, count: number, isRandom: boolean) {
  if (prevIndex === undefined || prevIndex === null) return 0

  const nextIndex = prevIndex + 1

  if (indexLastElement >= count * 2) {
    return isRandom ? random(0, indexLastElement) : nextIndex
  }
  return prevIndex > indexLastElement ? 0 : nextIndex
}

export const getObjectsFromArrayById = <T extends { id: string }>({
  collection,
  amount,
  ignoredIds = [],
  isRandomOrder = false,
}: IGetObjectsFromArrayByIdProps<T>) => {
  if (!Array.isArray(collection) || typeof amount !== 'number') {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }
  if (amount < 0) {
    throw new Error(ERROR_INCORRECT_VALUE)
  }
  if (collection.length < amount) return cloneDeep(collection)
  if (collection.length === 0) return []

  const indexLastElement = collection.length - 1
  const result: T[] = []
  let index

  while (result.length < amount) {
    index = getNextIndex(index, indexLastElement, amount, isRandomOrder)
    const element = collection[index]

    if (!hasIgnoreId(ignoredIds, element.id)) {
      result.push(element)
    }
  }
  return result
}
