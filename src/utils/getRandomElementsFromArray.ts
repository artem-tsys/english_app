import { isEqual } from 'src/utils/isEqual'
import { randomIntFromInterval } from 'src/utils/RandomNumber'

function hasIgnoreId(ignore: string | string[] | undefined, id: string) {
  if (ignore === undefined) {
    return false
  }
  if (Array.isArray(ignore)) {
    return ignore.includes(id)
  }
  return isEqual(ignore, id)
}

function getNextIndex(index, indexLastElement: number, count: number, isRandom: boolean) {
  if (indexLastElement >= count * 2) {
    return index > indexLastElement ? 0 : index + 1
  }
  return isRandom ? randomIntFromInterval(0, indexLastElement) : ++this.index
}

interface IGetObjectsFromArrayByIdProps<T> {
  collection: T[]
  amount: number
  ignoredIds?: string | string[]
  isRandomOrder: boolean
}

export const getObjectsFromArrayById = <T extends { id: string }>({
  collection,
  amount,
  ignoredIds = [],
  isRandomOrder = false,
}: IGetObjectsFromArrayByIdProps<T>) => {
  const result: T[] = []
  let index = 0

  if (!Array.isArray(collection)) return result
  if (collection.length < amount) return collection

  while (result.length < amount) {
    const indexLastElement = collection.length - 1
    index = getNextIndex(index, indexLastElement, amount, isRandomOrder)
    const element = collection[index]

    if (!hasIgnoreId(ignoredIds, element.id) && !result.includes(element)) {
      result.push(element)
    }
  }
  return result
}
