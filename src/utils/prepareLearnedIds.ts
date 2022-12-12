import { IMemorizationIds } from 'src/types/terms'

export const prepareLearnedIds = (idsMemorization: IMemorizationIds) =>
  Object.entries(idsMemorization).filter(([, memo]) => memo.length === 2)
