import { isPlainObject } from 'lodash'

export const filterElements = <T extends { id: string }>(collection: T[], ignoredIds) => {
  if (!ignoredIds || !collection) {
    return [...collection]
  }

  const ignored = isPlainObject(ignoredIds) ? Object.keys(ignoredIds) : ignoredIds

  if (ignored.length === 0) {
    return [...collection]
  }

  return collection.filter(({ id }) => !ignored.includes(id))
}
