type FilterElements = <T extends { id: string }>(collection: T[], ignoredIds: string[]) => T[]

export const filterElements: FilterElements = (collection, ignoredIds) => {
  if (!ignoredIds || !collection) {
    return [...collection]
  }

  if (ignoredIds.length === 0) {
    return [...collection]
  }

  return collection.filter(({ id }) => !ignoredIds.includes(id))
}
