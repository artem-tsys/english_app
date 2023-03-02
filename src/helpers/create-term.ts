import { InitialType } from 'src/types/languages'
import { ITermInitial } from 'src/types/terms'
import { v4 as uuidv4 } from 'uuid'

type CreateTerm = (langFirst: InitialType, langSecond: InitialType) => ITermInitial
export const createTerm: CreateTerm = (langFirst, langSecond) =>
  ({
    id: uuidv4(),
    [langFirst]: '',
    [langSecond]: '',
  } as ITermInitial)
