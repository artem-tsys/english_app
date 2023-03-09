import { Languages } from 'src/types/languages'
import { ITerm } from 'src/types/terms'
import { v4 as uuidv4 } from 'uuid'

type CreateTerm = (languages: Languages) => ITerm
export const createTerm: CreateTerm = (languages) =>
  ({
    id: uuidv4(),
    lang1: languages.lang1 ?? '',
    lang2: languages.lang2 ?? '',
  } as ITerm)
