import { isEqual } from 'lodash'
import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

type ArrayContaining = <T>(array: T[], contain: T[]) => boolean

export const arrayContaining: ArrayContaining = (array, contain) => {
  if (!Array.isArray(array) || !Array.isArray(contain)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  return contain.every((lang) => array.some((arr) => isEqual(arr, lang)))
}
