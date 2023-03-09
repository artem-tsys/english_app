import { Languages } from 'src/types/languages'

export const MEMORIZATION_NUMBER_ANSWERS = 4
export const NUMBER_TERMS_IN_ROUND = 2
export const INITIAL_LANGUAGES: Languages = {
  lang1: null,
  lang2: null,
}

export const EXERCISES_DEFAULT_PARAMS = {
  exercises: {
    memorization: {
      round: 1,
      learnedIds: [],
    },
  },
}
