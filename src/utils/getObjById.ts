type UnionId = string | number

export const getObjById = <T extends { id: UnionId }>(list: T[], id: UnionId) => list.find((el) => el.id === id)
