import { ERROR_IS_NOT_CORRECT_TYPE } from 'src/constants/errors.constants'

export const arrayContaining = (array, contain) => {
  if (!Array.isArray(array) || !Array.isArray(contain)) {
    throw new Error(ERROR_IS_NOT_CORRECT_TYPE)
  }

  return contain.every((lang) => array.includes(lang))
}
