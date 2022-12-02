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

export class ObjectsFromArrayById {
  private isRandom: boolean

  private index = 0

  result: unknown[] | undefined

  constructor(type?: string) {
    this.isRandom = type === 'random'
  }

  getNextIndex<T>(collection: T[], count: number) {
    const indexLastElement = collection.length - 1
    if (collection.length > count * 2) {
      return this.index > indexLastElement ? 0 : ++this.index
    }
    return this.isRandom ? randomIntFromInterval(0, indexLastElement) : ++this.index
  }

  create<T extends { id: string }>(collection: T[], countElements: number, ignoreElementId?: string | string[]) {
    this.result = []
    if (collection.length < countElements) {
      return collection
    }

    while (this.result.length < countElements) {
      this.index = this.getNextIndex<T>(collection, countElements)
      const element = collection[this.index]

      if (!hasIgnoreId(ignoreElementId, element.id) && !this.result.includes(element)) {
        this.result.push(element)
      }
    }
    return this.result as T[]
  }
}
